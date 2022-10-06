const {app} = require("../app");
const request = require("supertest");
const db = require("../database/models");
const babel = require("../babel.config");
const jwt = require('../helpers/generateJWT');
const bcrypt = require("bcrypt");
const { sequelize } = require('../database/models')

beforeAll(async () => {
    let password = "123456";
    const salt = await bcrypt.genSalt(10); 
    password = await bcrypt.hash(password, salt);
    const userGod = {email: "god@gmail.com", username: "god", password: password, firstname: "god", lastname: "god", profilepic: "aaa", role: "god"};
    const userAdmin = {email: "admin@gmail.com", username: "admin", password: password, firstname: "admin", lastname: "admin", profilepic: "aaa", role: "admin"};
    const userGuest = {email: "guest@gmail.com", username: "guest", password: password, firstname: "guest", lastname: "guest", profilepic: "aaa", role: "guest"};
    await db.User.bulkCreate([userGod, userAdmin, userGuest]);
});

describe("Login user", () => {
    
    test("Login de usuario" , async() => {
        const user = {username:"god", password: "123456"};
        const{statusCode, body} = await request(app).post('/api/v2/users/login').send(user);

        expect(statusCode).toBe(200);
        expect.objectContaining({
            success: true,
            message: 'Authorized',
            user: expect.objectContaining({id: expect.any(Number), username: expect.any(String)}),
            token: expect.any(String)
        });
    });

    test("Login de usuario error contrasena", async() => {
        const user = {username:"god", password: "1"};
        const{statusCode} = await request(app).post('/api/v2/users/login').send(user);

        expect(statusCode).toBe(400);
        expect.objectContaining({
            error: expect.any(String)
        })
    });

    test("Login de usuario error username", async() => {
        const user = {username:"godd", password: "123456"};
        const{statusCode} = await request(app).post('/api/v2/users/login').send(user);

        expect(statusCode).toBe(400);
        expect.objectContaining({
            error: expect.any(String)
        })
    });

});

describe("Listado de users", () => {

    test("Listar usuarios con login de tipo Guest" , async() => {
        const token = await jwt({ role: 'guest' });
        const {statusCode} = await request(app).get('/api/v2/users').auth(token, { type: 'bearer' });
        expect(statusCode).toBe(401);
        expect.objectContaining({
            mensaje: expect.stringContaining('No tienes permisos')
        })
    });

    test("Listar usuarios con login de tipo Admin", async() => {
        const token = await jwt({ role: 'admin' });
        const {statusCode, body} = await request(app).get('/api/v2/users').auth(token, { type: 'bearer' });

        if(body.Usuarios.length){
            expect(statusCode).toBe(200);
            expect(body).toEqual(expect.objectContaining({
                Usuarios: expect.arrayContaining([
                        expect.objectContaining({
                            id_user: expect.any(Number),
                            email: expect.any(String),
                            username: expect.any(String),
                            firstname: expect.any(String),
                            lastname: expect.any(String),
                            role: expect.any(String),
                            profilepic: expect.any(String),
                            carts: expect.any(Object)
                        })
                ])
            }))
        }
        else{
            expect(statusCode).toBe(400);
            expect.objectContaining({
                error: expect.any(String)
            })
        }
        
    });

    test("Listar usuarios con login de tipo God", async() => {
        const token = await jwt({ role: 'god' });
        const {statusCode, body} = await request(app).get('/api/v2/users').auth(token, { type: 'bearer' });
        
        if(body.Usuarios.length){
            expect(statusCode).toBe(200);
            expect(body).toEqual(expect.objectContaining({
                Usuarios: expect.arrayContaining([
                        expect.objectContaining({
                            id_user: expect.any(Number),
                            email: expect.any(String),
                            username: expect.any(String),
                            firstname: expect.any(String),
                            lastname: expect.any(String),
                            role: expect.any(String),
                            profilepic: expect.any(String),
                            carts: expect.any(Object)
                        })
                ])
            }))
        }
        else{
            expect(statusCode).toBe(400);
            expect.objectContaining({
                error: expect.any(String)
            })
        }
        
    });

});

describe("Listar usuario por ID", () => {

    test("Listar usuario por ID, rol Guest e ID de si mismo", async () => {
        let user = await db.User.findOne({where: {username: 'guest'}});
        const id = user.id_user; //en bd existe usuario tipo guest, con id 3.
        const token = await jwt({ role: 'guest', id_user: id});
        const {statusCode, body} = await request(app).get('/api/v2/users/'+id).auth(token, { type: 'bearer' });

        expect(statusCode).toBe(200);
        expect.objectContaining({
            id_user: expect.any(Number),
            email: expect.any(String),
            username: expect.any(String),
            firstname: expect.any(String),
            lastname: expect.any(String),
            role: expect.any(String),
            profilepic: expect.any(String),
            carts: expect.arrayContaining(expect.objectContaining(expect.any(Object)))
        })
    });

    test("Listar usuario por ID, rol guest y cualquier ID", async () => {
        let user = await db.User.findOne({where: {username: 'guest'}});
        const idUser = user.dataValues.id_user; //en bd existe usuario tipo guest, con id 3.
        const idUrl = "2";
        const token = await jwt({ role: 'guest', id_user: idUser}); //en bd existe usuario tipo guest, con id 3.
        const {statusCode, body} = await request(app).get('/api/v2/users/'+idUrl).auth(token, { type: 'bearer' });

        expect(statusCode).toBe(401);
        expect.objectContaining({
            Mensaje: expect.stringContaining('No tienes permisos')
        });
            
    });

    test("Listar usuario por ID, rol Admin y cualquier ID", async () => {
        let user = await db.User.findOne({where: {username: 'admin'}});
        const idUser = user.dataValues.id_user; //en bd existe usuario tipo guest, con id 3.
        let userLook = await db.User.findOne({where: {username: 'guest'}});
        const idUrl = userLook.dataValues.id_user; //en bd existe usuario tipo guest, con id 3.
        const token = await jwt({ role: 'admin', id_user: idUser});
        const {statusCode, body} = await request(app).get(`/api/v2/users/${idUrl}`).auth(token, { type: 'bearer' });

        expect(statusCode).toBe(200);
        expect.objectContaining({
            id_user: expect.any(Number),
            email: expect.any(String),
            username: expect.any(String),
            firstname: expect.any(String),
            lastname: expect.any(String),
            role: expect.any(String),
            profilepic: expect.any(String),
            carts: expect.arrayContaining(expect.objectContaining(expect.any(Object)))
        })
    });

    test("Listar usuario por ID, rol GOD y cualquier ID", async () => {
        let userLook = await db.User.findOne({where: {username: 'guest'}});
        const idUrl = userLook.dataValues.id_user; //en bd existe usuario tipo guest, con id 3.
        const token = await jwt({ role: 'god', id_user: idUrl});
        const {statusCode, body} = await request(app).get('/api/v2/users/'+idUrl).auth(token, { type: 'bearer' });

        expect(statusCode).toBe(200);
        expect.objectContaining({
            id_user: expect.any(Number),
            email: expect.any(String),
            username: expect.any(String),
            firstname: expect.any(String),
            lastname: expect.any(String),
            role: expect.any(String),
            profilepic: expect.any(String),
            carts: expect.arrayContaining(expect.objectContaining(expect.any(Object)))
        })
    });

})

describe("Crear nuevos usuarios", () => {

    test("Crear nuevo usuario", async () => {
        let random = parseInt(Math.random() * (1000000 - 0) + 0)
        const user = {
            email: "usuario"+random+"@gmail.com",
            username: "usuario"+random,
            password: "password"+random,
            firstname: "primernombre"+random,
            lastname: "segundonombre"+random,
            role: "god",
            profilepic: "nopic"
        }
        const {statusCode, body} = await request(app).post('/api/v2/users').send(user);

        expect(statusCode).toBe(200);
        expect(body).toEqual(expect.objectContaining(
            {usuario: expect.objectContaining({id_user: expect.any(Number),
                                                email: expect.any(String),
                                                username: expect.any(String),
                                                firstname: expect.any(String),
                                                lastname: expect.any(String),
                                                role: expect.any(String),
                                                profilepic: expect.any(String)
                                            })}))
    });

    test("Crear usuarios con propiedades incorrectas", async () => {
        let random = parseInt(Math.random() * (1000000 - 0) + 0)
        const user = {
            app: "usuario"+random+"@gmail.com",
            b: "usuario"+random,
            b: "password"+random,
            c: "primernombre"+random,
            d: "segundonombre"+random,
            e: "god",
            f: "nopic"
        }
        const {statusCode, body} = await request(app).post('/api/v2/users').send(user);
        expect(statusCode).toBe(400);
    });

    test("Crear usuario con email ya existente en la BD", async () => {
        let random = parseInt(Math.random() * (1000000 - 0) + 0)
            const user = {
                email: "god@gmail.com",
                username: "usuario"+random,
                password: "password"+random,
                firstname: "primernombre"+random,
                lastname: "segundonombre"+random,
                role: "god",
                profilepic: "nopic"
            }
            const {statusCode, body} = await request(app).post('/api/v2/users').send(user);
            expect(statusCode).toBe(400);
            expect(body).toEqual(expect.objectContaining({
                errors: expect.arrayContaining([
                    expect.objectContaining({
                        value: expect.any(String),
                        msg: expect.stringContaining(`El email ${user.email} ya se encuentra registrado`),
                        param: expect.any(String),
                        location: expect.any(String)
                    })
                ])
            }))
            expect.stringContaining(`El username ${user.email} ya se encuentra registrado`);
    });

    test("Crear usuario con email vacio", async () => {
        let random = parseInt(Math.random() * (1000000 - 0) + 0)
        const user = {
            email: "",
            username: "usuario"+random,
            password: "password"+random,
            firstname: "primernombre"+random,
            lastname: "segundonombre"+random,
            role: "god",
            profilepic: "nopic"
        }
        const {statusCode, body} = await request(app).post('/api/v2/users').send(user);
        expect(statusCode).toBe(400);
        expect(body).toEqual(expect.objectContaining({
            errors: expect.arrayContaining([
                expect.objectContaining({
                    value: expect.any(String),
                    msg: expect.stringContaining(`Ingrese un email valido`),
                    param: expect.any(String),
                    location: expect.any(String)
                })
            ])
        }))
        expect.stringContaining(`Ingrese un email valido`);
    });

    test("Crear usuario con username ya existente en la BD", async () => {
        let random = parseInt(Math.random() * (1000000 - 0) + 0)
            const user = {
                email: "god"+random+"@gmail.com",
                username: "god",
                password: "password"+random,
                firstname: "primernombre"+random,
                lastname: "segundonombre"+random,
                role: "god",
                profilepic: "nopic"
            }
            const {statusCode, body} = await request(app).post('/api/v2/users').send(user);
            expect(statusCode).toBe(400);
            expect(body).toEqual(expect.objectContaining({
                errors: expect.arrayContaining([
                    expect.objectContaining({
                        value: expect.any(String),
                        msg: expect.stringContaining(`El username ${user.username} ya se encuentra registrado`),
                        param: expect.any(String),
                        location: expect.any(String)
                    })
                ])
            }))
            expect.stringContaining(`El username ${user.username} ya se encuentra registrado`);
    });

    test("Crear usuario con email con mal formato. ej : rodrigoben sin el @ y sin gmail.com", async () => {
        let random = parseInt(Math.random() * (1000000 - 0) + 0)
            const user = {
                email: "god"+random,
                username: "goddie",
                password: "password"+random,
                firstname: "primernombre"+random,
                lastname: "segundonombre"+random,
                role: "god",
                profilepic: "nopic"
            }
            const {statusCode, body} = await request(app).post('/api/v2/users').send(user);
            expect(statusCode).toBe(400);
            expect(body).toEqual(expect.objectContaining({
                errors: expect.arrayContaining([
                    expect.objectContaining({
                        value: expect.any(String),
                        msg: expect.stringContaining(`Ingrese un email valido`),
                        param: expect.any(String),
                        location: expect.any(String)
                    })
                ])
            }))
            expect.stringContaining(`Ingrese un email valido`);
    });

    test("Crear usuario con username vacio", async () => {
        let random = parseInt(Math.random() * (1000000 - 0) + 0)
            const user = {
                email: "god"+random+"@gmail.com",
                username: "",
                password: "password"+random,
                firstname: "primernombre"+random,
                lastname: "segundonombre"+random,
                role: "god",
                profilepic: "nopic"
            }
            const {statusCode, body} = await request(app).post('/api/v2/users').send(user);
            expect(statusCode).toBe(400);
            expect(body).toEqual(expect.objectContaining({
                errors: expect.arrayContaining([
                    expect.objectContaining({
                        value: expect.any(String),
                        msg: expect.stringContaining(`El nombre de usuario es requerido`),
                        param: expect.any(String),
                        location: expect.any(String)
                    })
                ])
            }))
            expect.stringContaining(`El nombre de usuario es requerido`);
    });

    test("Crear usuario con contraseña vacio o menor a 6 digitos, expect 400", async () => {
        let random = parseInt(Math.random() * (1000000 - 0) + 0)
            const user = {
                email: "god"+random+"@gmail.com",
                username: "godUser",
                password: "",
                firstname: "primernombre"+random,
                lastname: "segundonombre"+random,
                role: "god",
                profilepic: "nopic"
            }
            const {statusCode, body} = await request(app).post('/api/v2/users').send(user);
            expect(statusCode).toBe(400);
            expect(body).toEqual(expect.objectContaining({
                errors: expect.arrayContaining([
                    expect.objectContaining({
                        value: expect.any(String),
                        msg: expect.stringContaining(`La contraseña es requerida y debe tener 6 caracteres`),
                        param: expect.any(String),
                        location: expect.any(String)
                    })
                ])
            }))
            expect.stringContaining(`La contraseña es requerida y debe tener 6 caracteres`);
    });

    test("Crear usuario con primer nombre vacio, expect 400", async () => {
        let random = parseInt(Math.random() * (1000000 - 0) + 0)
            const user = {
                email: "god"+random+"@gmail.com",
                username: "godUser",
                password: "fdsadfsaadsf",
                firstname: "",
                lastname: "segundonombre"+random,
                role: "god",
                profilepic: "nopic"
            }
            const {statusCode, body} = await request(app).post('/api/v2/users').send(user);
            expect(statusCode).toBe(400);
            expect(body).toEqual(expect.objectContaining({
                errors: expect.arrayContaining([
                    expect.objectContaining({
                        value: expect.any(String),
                        msg: expect.stringContaining(`El nombre es requerido`),
                        param: expect.any(String),
                        location: expect.any(String)
                    })
                ])
            }))
            expect.stringContaining(`El nombre es requerido`);
    });

    test("Crear usuario con apellido vacio, expect 400", async () => {
        let random = parseInt(Math.random() * (1000000 - 0) + 0)
            const user = {
                email: "god"+random+"@gmail.com",
                username: "godUser",
                password: "fdsadfsaadsf",
                firstname: "PrimerNombre",
                lastname: "",
                role: "god",
                profilepic: "nopic"
            }
            const {statusCode, body} = await request(app).post('/api/v2/users').send(user);
            expect(statusCode).toBe(400);
            expect(body).toEqual(expect.objectContaining({
                errors: expect.arrayContaining([
                    expect.objectContaining({
                        value: expect.any(String),
                        msg: expect.stringContaining(`El apellido es requerido`),
                        param: expect.any(String),
                        location: expect.any(String)
                    })
                ])
            }))
            expect.stringContaining(`El apellido es requerido`);
    });
});

describe("Editar usuarios", () => {
    test("Editar usuario con permisos God, expect 200", async () => {
        const user = {
            email: "usuariodelete@gmail.com",
            username: "usuariodelete",
            password: "password",
            firstname: "primernombre",
            lastname: "segundonombre",
            role: "god",
            profilepic: "nopic"
        }
        let create = await db.User.create(user);
        const idCreated = create.id_user;
        //establecemos permisos
        let userDb = await db.User.findOne({where: {username: 'god'}});
        const userId = userDb.dataValues.id_user; //permisos de god con el id correspondiente
        const token = await jwt({ role: 'god', id_user: userId});

        let random = parseInt(Math.random() * (1000000 - 0) + 0);
        const userData = {
            firstname: "primernombre"+random,
            lastname: "segundonombre"+random
        }
        const {statusCode, body} = await request(app).put(`/api/v2/users/${idCreated}`).auth(token, { type: 'bearer' }).send(userData);
        expect(statusCode).toBe(200);
        expect(body).toEqual(expect.objectContaining(
                                    {id_user: expect.any(Number),
                                    email: expect.any(String),
                                    username: expect.any(String),
                                    firstname: expect.any(String),
                                    password: expect.any(String),
                                    lastname: expect.any(String),
                                    role: expect.any(String),
                                    profilepic: expect.any(String)
                                }));
        //borramos
        await db.User.destroy({ where: {id_user: idCreated} });
        });

    test("Editar usuario no existente con permisos God, expect 400", async () => {
        const maxId = await db.User.max('id_user');
        const idUrl = maxId+1;
        //establecemos permisos
        let userDb = await db.User.findOne({where: {username: 'god'}});
        const userId = userDb.dataValues.id_user; //permisos de god con el id correspondiente
        const token = await jwt({ role: 'god', id_user: userId});
        let random = parseInt(Math.random() * (1000000 - 0) + 0)
        const user = {
            firstname: "primernombre"+random,
            lastname: "segundonombre"+random
        }
        const {statusCode, body} = await request(app).put(`/api/v2/users/${idUrl}`).auth(token, { type: 'bearer' }).send(user)
        expect(statusCode).toBe(400);
        expect(body).toEqual(expect.objectContaining({msg: expect.stringContaining('El usuario no existe')}));
    });

    test("Editar usuario con permisos admin a si mismo, expect 200", async () => {
        //establecemos permisos
        let userDb = await db.User.findOne({where: {username: 'admin'}});
        const userId = userDb.dataValues.id_user; //permisos de admin con el id correspondiente
        const token = await jwt({ role: 'admin', id_user: userId});
        let random = parseInt(Math.random() * (1000000 - 0) + 0);
        const user = {
            firstname: "primernombre"+random,
            lastname: "segundonombre"+random
        }
        const {statusCode, body} = await request(app).put(`/api/v2/users/${userId}`).auth(token, { type: 'bearer' }).send(user)
        expect(statusCode).toBe(200);
        expect(body).toEqual(expect.objectContaining(
                                    {id_user: expect.any(Number),
                                    email: expect.any(String),
                                    username: expect.any(String),
                                    firstname: expect.any(String),
                                    password: expect.any(String),
                                    lastname: expect.any(String),
                                    role: expect.any(String),
                                    profilepic: expect.any(String)
                                }))
        });

    test("Editar usuario con permisos admin a otro usuario, expect 401", async () => {
        //establecemos permisos
        let userDb = await db.User.findOne({where: {username: 'admin'}});
        const userId = userDb.dataValues.id_user; //id usuario admin
        let userDbEdit = await db.User.findOne({where: {username: 'guest'}});
        const idUrl = userDbEdit.dataValues.id_user; //id usuario guest a editar
        const token = await jwt({ role: 'admin', id_user: userId});
        let random = parseInt(Math.random() * (1000000 - 0) + 0)
        const user = {
            firstname: "a"+random,
            lastname: "segundonombre"+random
        }
        const {statusCode, body} = await request(app).put('/api/v2/users/'+idUrl).auth(token, { type: 'bearer' }).send(user);
        expect(statusCode).toBe(401);
        expect(body).toEqual(expect.objectContaining({Mensaje: expect.stringContaining('No tienes permisos')}));
        });

    test("Editar usuario con permisos guest a si mismo, expect 200", async () => {
        //establecemos permisos
        let userDb = await db.User.findOne({where: {username: 'guest'}});
        const idUrl = userDb.dataValues.id_user; //id usuario guest a editar
        const userId = userDb.dataValues.id_user; //id usuario guest
        const token = await jwt({ role: 'guest', id_user: userId});
        let random = parseInt(Math.random() * (1000000 - 0) + 0)
        const user = {
            firstname: "primernombre"+random,
            lastname: "segundonombre"+random
        }
        const {statusCode, body} = await request(app).put(`/api/v2/users/${idUrl}`).auth(token, { type: 'bearer' }).send(user)
        expect(statusCode).toBe(200);
        expect(body).toEqual(expect.objectContaining(
                                    {id_user: expect.any(Number),
                                    email: expect.any(String),
                                    username: expect.any(String),
                                    firstname: expect.any(String),
                                    password: expect.any(String),
                                    lastname: expect.any(String),
                                    role: expect.any(String),
                                    profilepic: expect.any(String)
                                }))
        });

    test("Editar usuario con permisos guest a otro usuario, expect 401", async () => {
        //establecemos permisos
        let userDb = await db.User.findOne({where: {username: 'guest'}});
        const userId = userDb.dataValues.id_user; //id usuario guest
        let userDbEdit = await db.User.findOne({where: {username: 'admin'}});
        const idUrl = userDbEdit.dataValues.id_user; //id usuario admin a editar
        const token = await jwt({ role: 'guest', id_user: userId});
        let random = parseInt(Math.random() * (1000000 - 0) + 0)
        const user = {
            firstname: "a"+random,
            lastname: "segundonombre"+random
        }
        const {statusCode, body} = await request(app).put('/api/v2/users/'+idUrl).auth(token, { type: 'bearer' }).send(user);
        expect(statusCode).toBe(401);
        expect(body).toEqual(expect.objectContaining({Mensaje: expect.stringContaining('No tienes permisos')}));
        });

    test("Editar usuario con email ya existente en la BD, expect 400", async () => {
        const user = {
            email: "usuariodelete@gmail.com",
            username: "usuariodelete",
            password: "password",
            firstname: "primernombre",
            lastname: "segundonombre",
            role: "god",
            profilepic: "nopic"
        }
        let create = await db.User.create(user);
        const idCreated = create.id_user;

        //establecemos permisos
        let userDb = await db.User.findOne({where: {username: 'god'}});
        const userId = userDb.dataValues.id_user; //id usuario GOD

        const token = await jwt({ role: 'god', id_user: userId});
        const userData = {
            email: "god@gmail.com"
        }
        const {statusCode, body} = await request(app).put(`/api/v2/users/${idCreated}`).auth(token, { type: 'bearer' }).send(userData);
        expect(statusCode).toBe(400);
        expect(body).toEqual(expect.objectContaining({
            errors: expect.arrayContaining([
                expect.objectContaining({
                    value: expect.any(String),
                    msg: expect.stringContaining(`El email ${userData.email} ya se encuentra registrado`),
                    param: expect.any(String),
                    location: expect.any(String)
                })
            ])
        }))
        expect.stringContaining(`El username ${userData.email} ya se encuentra registrado`);
        //borramos
        await db.User.destroy({ where: {id_user: idCreated} });
        });

    test("Editar usuario con email vacio, expect 400", async () => {
        let userEdit = await db.User.findOne({where: {username: 'guest'}})
        const idUrl = userEdit.dataValues.id_user; //usuario guest a editar
        //establecemos permisos
        let userDb = await db.User.findOne({where: {username: 'god'}});
        const userId = userDb.dataValues.id_user; //id usuario GOD
        const token = await jwt({ role: 'god', id_user: userId});
        const user = {
            email: ""
        }
        const {statusCode, body} = await request(app).put(`/api/v2/users/${idUrl}`).auth(token, { type: 'bearer' }).send(user);
        expect(statusCode).toBe(400);
        expect(body).toEqual(expect.objectContaining({
            errors: expect.arrayContaining([
                expect.objectContaining({
                    value: expect.any(String),
                    msg: expect.stringContaining(`Ingrese un email valido`),
                    param: expect.any(String),
                    location: expect.any(String)
                })
            ])
        }))
        expect.stringContaining(`Ingrese un email valido`);
    });

    test("Editar usuario con username ya existente en la BD, expect 400", async () => {
        let userEdit = await db.User.findOne({where: {username: 'guest'}});
        const idUrl = userEdit.dataValues.id_user; //usuario guest a editar
        //establecemos permisos
        let userDb = await db.User.findOne({where: {username: 'god'}});
        const userId = userDb.dataValues.id_user; //id usuario GOD

        const token = await jwt({ role: 'god', id_user: userId});
        let random = parseInt(Math.random() * (1000000 - 0) + 0)
        const user = {
            username: "guest"
        }
        const {statusCode, body} = await request(app).put(`/api/v2/users/${idUrl}`).auth(token, { type: 'bearer' }).send(user);
        expect(statusCode).toBe(400);
        expect(body).toEqual(expect.objectContaining({
            errors: expect.arrayContaining([
                expect.objectContaining({
                    value: expect.any(String),
                    msg: expect.stringContaining(`El username ${user.username} ya se encuentra registrado`),
                    param: expect.any(String),
                    location: expect.any(String)
                })
            ])
        }))
        expect.stringContaining(`El username ${user.username} ya se encuentra registrado`);
    });

    test("Editar usuario con email con mal formato. ej rodrigoben sin el @ y sin gmail.com, expect 400", async () => {
        let userEdit = await db.User.findOne({where: {username: 'guest'}});
        const idUrl = userEdit.dataValues.id_user; //usuario guest a editar
        //establecemos permisos
        let userDb = await db.User.findOne({where: {username: 'god'}});
        const userId = userDb.dataValues.id_user; //id usuario GOD

        const token = await jwt({ role: 'god', id_user: userId});
        let random = parseInt(Math.random() * (1000000 - 0) + 0);
        const user = {
            email: "aaaaa"
        }
        const {statusCode, body} = await request(app).put(`/api/v2/users/${idUrl}`).auth(token, { type: 'bearer' }).send(user);
        expect(statusCode).toBe(400);
        expect(body).toEqual(expect.objectContaining({
            errors: expect.arrayContaining([
                expect.objectContaining({
                    value: expect.any(String),
                    msg: expect.stringContaining(`Ingrese un email valido`),
                    param: expect.any(String),
                    location: expect.any(String)
                })
            ])
        }))
        expect.stringContaining(`Ingrese un email valido`);
    });

    test("Editar usuario con username vacio, expect 400", async () => {
        let userEdit = await db.User.findOne({where: {username: 'guest'}});
        const idUrl = userEdit.dataValues.id_user; //usuario guest a editar
        //establecemos permisos
        let userDb = await db.User.findOne({where: {username: 'god'}});
        const userId = userDb.dataValues.id_user; //id usuario GOD
        const token = await jwt({ role: 'god', id_user: userId});
        const user = {
            username: ""
        }
        const {statusCode, body} = await request(app).put(`/api/v2/users/${idUrl}`).auth(token, { type: 'bearer' }).send(user);
        expect(statusCode).toBe(400);
        expect(body).toEqual(expect.objectContaining({
            errors: expect.arrayContaining([
                expect.objectContaining({
                    value: expect.any(String),
                    msg: expect.stringContaining(`El nombre de usuario es requerido`),
                    param: expect.any(String),
                    location: expect.any(String)
                })
            ])
        }))
        expect.stringContaining(`El nombre de usuario es requerido`);
    });

    test("Editar usuario con contraseña vacio o menor a 6 digitos, expect 400", async () => {
        let userEdit = await db.User.findOne({where: {username: 'guest'}});
        const idUrl = userEdit.dataValues.id_user; //usuario guest a editar
        //establecemos permisos
        let userDb = await db.User.findOne({where: {username: 'god'}});
        const userId = userDb.dataValues.id_user; //id usuario GOD
        const token = await jwt({ role: 'god', id_user: userId});
        const user = {
            password: ""
        }
        const {statusCode, body} = await request(app).put(`/api/v2/users/${idUrl}`).auth(token, { type: 'bearer' }).send(user);
        expect(statusCode).toBe(400);
        expect(body).toEqual(expect.objectContaining({
            errors: expect.arrayContaining([
                expect.objectContaining({
                    value: expect.any(String),
                    msg: expect.stringContaining(`La contraseña es requerida y debe tener 6 caracteres`),
                    param: expect.any(String),
                    location: expect.any(String)
                })
            ])
        }))
        expect.stringContaining(`La contraseña es requerida y debe tener 6 caracteres`);
    });

    test("Editar usuario con primer nombre vacio, expect 400", async () => {
        let userEdit = await db.User.findOne({where: {username: 'guest'}});
        const idUrl = userEdit.dataValues.id_user; //usuario guest a editar
        //establecemos permisos
        let userDb = await db.User.findOne({where: {username: 'god'}});
        const userId = userDb.dataValues.id_user; //id usuario GOD
        const token = await jwt({ role: 'god', id_user: userId});
        let random = parseInt(Math.random() * (1000000 - 0) + 0)
        const user = {
            firstname: ""
        }
        const {statusCode, body} = await request(app).put(`/api/v2/users/${idUrl}`).auth(token, { type: 'bearer' }).send(user);
        expect(statusCode).toBe(400);
        expect(body).toEqual(expect.objectContaining({
            errors: expect.arrayContaining([
                expect.objectContaining({
                    value: expect.any(String),
                    msg: expect.stringContaining(`El nombre es requerido`),
                    param: expect.any(String),
                    location: expect.any(String)
                })
            ])
        }))
        expect.stringContaining(`El nombre es requerido`);
    });

    test("Editar usuario con apellido vacio, expect 400", async () => {
        let userEdit = await db.User.findOne({where: {username: 'guest'}});
        const idUrl = userEdit.dataValues.id_user; //usuario guest a editar
        //establecemos permisos
        let userDb = await db.User.findOne({where: {username: 'god'}});
        const userId = userDb.dataValues.id_user; //id usuario GOD
        const token = await jwt({ role: 'god', id_user: userId});
        let random = parseInt(Math.random() * (1000000 - 0) + 0)
        const user = {
            lastname: ""
        }
        const {statusCode, body} = await request(app).put(`/api/v2/users/${idUrl}`).auth(token, { type: 'bearer' }).send(user);
        expect(statusCode).toBe(400);
        expect(body).toEqual(expect.objectContaining({
            errors: expect.arrayContaining([
                expect.objectContaining({
                    value: expect.any(String),
                    msg: expect.stringContaining(`El apellido es requerido`),
                    param: expect.any(String),
                    location: expect.any(String)
                })
            ])
        }));
        expect.stringContaining(`El apellido es requerido`);
    });

    test("Editar usuario con permisos God pero una letra en vez de ID en parametro, expect 500", async () => {
        const idUrl = 'a';
        const userId = 1; //usuario permisos god
        const token = await jwt({ role: 'god', id_user: userId});
        let random = parseInt(Math.random() * (1000000 - 0) + 0)
        const user = {
            firstname: "primernombre"+random,
            lastname: "segundonombre"+random
        }
        const {statusCode, body} = await request(app).put(`/api/v2/users/${idUrl}`).auth(token, { type: 'bearer' }).send(user);
        expect(statusCode).toBe(500);
    });

});

describe("Eliminar usuarios", () => {

    test("Eliminar un usuario con permisos God, expect 200", async () => {
        const user = {
            email: "usuariodelete@gmail.com",
            username: "usuariodelete",
            password: "password",
            firstname: "primernombre",
            lastname: "segundonombre",
            role: "god",
            profilepic: "nopic"
        }
        let create = await db.User.create(user);
        const idUrl = create.id_user;

        const userId = 1; //un usuario god con id 1.
        const token = await jwt({ role: 'god', id_user: userId});
        let {statusCode, body} = await request(app).delete(`/api/v2/users/${idUrl}`).auth(token, {type: 'bearer'});
        expect(statusCode).toBe(200);
        expect(body).toEqual(
            expect.objectContaining({id_user: expect.any(Number),
                                    email: expect.any(String),
                                    username: expect.any(String),
                                    firstname: expect.any(String),
                                    lastname: expect.any(String),
                                    role: expect.any(String),
                                    profilepic: expect.any(String),
                                    carts: expect.any(Array)}))
    });

    test("Eliminar un usuario con permisos admin a si mismo, expect 200", async () => {
        const user = {
            email: "usuariodelete@gmail.com",
            username: "usuariodelete",
            password: "password",
            firstname: "primernombre",
            lastname: "segundonombre",
            role: "admin",
            profilepic: "nopic"
        }
        let create = await db.User.create(user);
        const idUrl = create.id_user;

        const userId = 1;
        const token = await jwt({ role: 'admin', id_user: idUrl});
        let {statusCode, body} = await request(app).delete(`/api/v2/users/${idUrl}`).auth(token, {type: 'bearer'});
        expect(statusCode).toBe(200);
        expect(body).toEqual(
            expect.objectContaining({id_user: expect.any(Number),
                                    email: expect.any(String),
                                    username: expect.any(String),
                                    firstname: expect.any(String),
                                    lastname: expect.any(String),
                                    role: expect.any(String),
                                    profilepic: expect.any(String),
                                    carts: expect.any(Array)}))
    });

    test("Eliminar cualquier usuario con permisos admin, expect 401", async () => {
        const user = {
            email: "usuariodelete@gmail.com",
            username: "usuariodelete",
            password: "password",
            firstname: "primernombre",
            lastname: "segundonombre",
            role: "admin",
            profilepic: "nopic"
        }
        let create = await db.User.create(user);
        const idCreated = create.id_user;
        const token = await jwt({ role: 'admin', id_user: 2}); //un usuario admin con id 2.
        let {statusCode, body} = await request(app).delete(`/api/v2/users/${idCreated}`).auth(token, {type: 'bearer'});
        expect(statusCode).toBe(401);
        expect(body).toEqual(expect.objectContaining({
                        Mensaje: expect.stringContaining('No tienes permisos')
                        }))
        //borramos
        await db.User.destroy({ where: {id_user: idCreated} });
    });

    test("Eliminar un usuario con permisos guest a si mismo, expect 200", async () => {
        const user = {
            email: "usuariodelete@gmail.com",
            username: "usuariodelete",
            password: "password",
            firstname: "primernombre",
            lastname: "segundonombre",
            role: "guest",
            profilepic: "nopic"
        }
        let create = await db.User.create(user);
        const idUrl = create.id_user;

        const userId = 1;
        const token = await jwt({ role: 'guest', id_user: idUrl});
        let {statusCode, body} = await request(app).delete(`/api/v2/users/${idUrl}`).auth(token, {type: 'bearer'});
        expect(statusCode).toBe(200);
        expect(body).toEqual(
            expect.objectContaining({id_user: expect.any(Number),
                                    email: expect.any(String),
                                    username: expect.any(String),
                                    firstname: expect.any(String),
                                    lastname: expect.any(String),
                                    role: expect.any(String),
                                    profilepic: expect.any(String),
                                    carts: expect.any(Array)}))
    });

    test("Eliminar cualquier usuario con permisos guest, expect 401", async () => {
        const user = {
            email: "usuariodelete@gmail.com",
            username: "usuariodelete",
            password: "password",
            firstname: "primernombre",
            lastname: "segundonombre",
            role: "guest",
            profilepic: "nopic"
        }
        let create = await db.User.create(user);
        const idCreated = create.id_user;
        const token = await jwt({ role: 'admin', id_user: 3}); //un usuario guest con id 3.
        let {statusCode, body} = await request(app).delete(`/api/v2/users/${idCreated}`).auth(token, {type: 'bearer'});
        expect(statusCode).toBe(401);
        expect(body).toEqual(expect.objectContaining({
                        Mensaje: expect.stringContaining('No tienes permisos')
                        }))
        //borramos
        await db.User.destroy({ where: {id_user: idCreated} });
    });

    test("Eliminar cualquier usuario con permisos GOD pero en parametro enviar una letra., expect 500", async () => {
        const idDelete = 'a';
        const token = await jwt({ role: 'GOD', id_user: 1}); //un usuario admin con id 2.
        let {statusCode, body} = await request(app).delete(`/api/v2/users/${idDelete}`).auth(token, {type: 'bearer'});
        expect(statusCode).toBe(500);
    });

});

describe("Chequeo de rutas invalidas, expect 400", () => {
    test("Bad request get, expect 400", async () => {
        const token = await jwt({ role: 'god', id_user: 1}); //un usuario guest con id 3.
        let {statusCode, body} = await request(app).get(`/api/v2/users/a/a`).auth(token, {type: 'bearer'});
        expect(body).toEqual(expect.objectContaining({Mensaje: expect.stringContaining('Bad Request')}))
        expect(statusCode).toBe(400);
    })

    test("Bad request post, expect 400", async () => {
        const token = await jwt({ role: 'god', id_user: 1}); //un usuario guest con id 3.
        let {statusCode, body} = await request(app).post(`/api/v2/users/a/a`).auth(token, {type: 'bearer'});
        expect(body).toEqual(expect.objectContaining({Mensaje: expect.stringContaining('Bad Request')}))
        expect(statusCode).toBe(400);
    })

    test("Bad request put, expect 400", async () => {
        const token = await jwt({ role: 'god', id_user: 1}); //un usuario guest con id 3.
        let {statusCode, body} = await request(app).put(`/api/v2/users/a/a`).auth(token, {type: 'bearer'});
        expect(body).toEqual(expect.objectContaining({Mensaje: expect.stringContaining('Bad Request')}))
        expect(statusCode).toBe(400);
    })

    test("Bad request delete, expect 400", async () => {
        const token = await jwt({ role: 'god', id_user: 1}); //un usuario guest con id 3.
        let {statusCode, body} = await request(app).delete(`/api/v2/users/a/a`).auth(token, {type: 'bearer'});
        expect(body).toEqual(expect.objectContaining({Mensaje: expect.stringContaining('Bad Request')}))
        expect(statusCode).toBe(400);
    })
});

describe("Test con BD vacías", () => {
    beforeAll( async () => {
        await db.User.destroy({where: {username: 'god'}});
        await db.User.destroy({where: {username: 'admin'}});
        await db.User.destroy({where: {username: 'guest'}});
    });
    test("Test listado de usuarios vacío", async () => {
        const [results, metadata] = await sequelize.query("DELETE FROM Users");
        const token = await jwt({ role: 'god' });
        const {statusCode, body} = await request(app).get('/api/v2/users').auth(token, { type: 'bearer' });
        expect(statusCode).toBe(400);
    });
});


