const {app} = require("../app");
const request = require("supertest");
const generateJWT = require("../helpers/generateJWT");
const db = require("../database/models");

describe('Testeando con la DB apagada', () =>{
        
    beforeAll(() => {
        db.sequelize.close();
    });

    describe('Tests de categories', () => {
        test('GET Retorna un status 500 y devuelve un mensaje Server error (ROLE-GOD)', async () => {
            const token = await generateJWT({ role: 'god'});
            const { body, statusCode } = await request(app).get('/api/v2/categories').auth(token, { type: 'bearer'});
            expect(statusCode).toEqual(500);
            expect(body).toEqual(expect.objectContaining({
                msg: expect.any(String)
            }));
        });

        test('GET{id} Retorna un status 500 y devuelve un mensaje Server error (ROLE-GOD)', async () => {
            const id = 3;
            const token = await generateJWT({ role: 'god'});
            const { body, statusCode } = await request(app).get(`/api/v2/categories/${id}`).auth(token, { type: 'bearer'});
            expect(statusCode).toEqual(500);
            expect(body).toEqual(expect.objectContaining({
                msg: expect.any(String)
            }));
        });

        test('PUT Retorna un status 500 y devuelve un mensaje Server error (ROLE-GOD)', async () => {
            const id = 5;
            const data = { "title": "muebles" };
            const token = await generateJWT({ role: 'god'});
            const { body, statusCode } = await request(app).put(`/api/v2/categories/${id}`).auth(token, { type: 'bearer'}).send(data);
            expect(statusCode).toEqual(500);
            expect(body).toEqual(expect.objectContaining({
                msg: expect.any(String)
            }));
        });
/* 
        test('POST Retorna un status 500 y devuelve un mensaje Server error (ROLE-GOD)', async () => {
            const id = 5;
            const token = await generateJWT({ role: 'god'});
            const data = { "title": "Bizcochos" };
            const { body, statusCode } = await request(app).post('/api/v2/categories').auth(token, { type: 'bearer' }).send(data);
            expect(statusCode).toEqual(500);
            expect(body).toEqual(expect.objectContaining({
                msg: expect.any(String)
            })); 
        });
 */
        test('DELETE Retorna un status 500 y devuelve un mensaje Server error (ROLE-GOD)', async () => {
            const id = 5;
            const token = await generateJWT({ role: 'god'});
            const { body, statusCode } = await request(app).delete(`/api/v2/categories/${id}`).auth(token, { type: 'bearer'});
            expect(statusCode).toEqual(500);
            expect(body).toEqual(expect.objectContaining({
                msg: expect.any(String)
            }));
        }); 
    });

    describe("Tests de usuarios", () => {

        test("Server error 500 Login Usuarios", async () => {
            const user = {username:"god", password: "123456"};
            const{statusCode, body} = await request(app).post('/api/v2/users/login').send(user);
            expect(statusCode).toBe(500);
            expect(body).toEqual(expect.objectContaining({msg: 'Server error.'}));
        })
    
        test("Server error 500 listar Usuarios", async () => {
            const token = await generateJWT({ role: 'god' });
            const {statusCode, body} = await request(app).get('/api/v2/users').auth(token, { type: 'bearer' });
            expect(statusCode).toBe(500);
            expect(body).toEqual(expect.objectContaining({msg: 'Server error.'}));
        });
    
        test("Server error 500 listar Usuarios por ID", async () => {
            const idUrl = 1;
            const token = await generateJWT({ role: 'god', id_user: idUrl});
            const {statusCode, body} = await request(app).get('/api/v2/users/'+idUrl).auth(token, { type: 'bearer' });
    
            expect(statusCode).toBe(500);
            expect(body).toEqual(expect.objectContaining({msg: 'Server error.'}));
        });
    
        test("Server error 500 crear Usuario", async () => {
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
            expect(statusCode).toBe(400);
        });
    
        test("Server error 500 editar Usuario", async () => {
            const token = await generateJWT({ role: 'god', id_user: 1});
            let random = parseInt(Math.random() * (1000000 - 0) + 0);
            const userData = {
                firstname: "primernombre"+random,
                lastname: "segundonombre"+random
            }
            const {statusCode, body} = await request(app).put(`/api/v2/users/1`).auth(token, { type: 'bearer' }).send(userData);
            expect(statusCode).toBe(500);
            expect(body).toEqual(expect.objectContaining({msg: 'Server error.'}));
        });
    
        test("Server error 500 eliminar Usuario", async () => {
            const userId = 1; //un usuario god con id 1.
            const token = await generateJWT({ role: 'god', id_user: userId});
            let {statusCode, body} = await request(app).delete(`/api/v2/users/${userId}`).auth(token, {type: 'bearer'});
            expect(statusCode).toBe(500);
            expect(body).toEqual(expect.objectContaining({msg: 'Server error.'}));
        });
    });

    describe('Tests de products', () => {
  
        test('GET Retorna un status 500 y devuelve un mensaje Server error (ROLE-GOD)', async () => {
            const token = await generateJWT({ role: 'god'});
            const { body, statusCode } = await request(app).get('/api/v2/products').auth(token, { type: 'bearer'});
            expect(statusCode).toEqual(500);
            expect(body).toEqual(expect.objectContaining({
                msg: expect.any(String)
            }));
        });

        test('GET Retorna un status 500 y devuelve un mensaje Server error MOSTWANTED (ROLE-GOD)', async () => {
            const token = await generateJWT({ role: 'god'});
            const { body, statusCode } = await request(app).get('/api/v2/products/mostwanted').auth(token, { type: 'bearer'});
            expect(statusCode).toEqual(500);
            expect(body).toEqual(expect.objectContaining({
                msg: expect.any(String)
            }));
        });

        test('GET Retorna un status 500 y devuelve un mensaje Server error KEYWORD (ROLE-GOD)', async () => {
            const token = await generateJWT({ role: 'admin'});
            const { body, statusCode } = await request(app).get('/api/v2/products/search').auth(token, { type: 'bearer'});
            expect(statusCode).toEqual(500);
            expect(body).toEqual(expect.objectContaining({
                msg: expect.any(String)
            }));
        });

        test('GET{id} Retorna un status 500 y devuelve un mensaje Server error (ROLE-GOD)', async () => {
            const id = 3;
            const token = await generateJWT({ role: 'god'});
            const { body, statusCode } = await request(app).get(`/api/v2/products/${id}`).auth(token, { type: 'bearer'});
            expect(statusCode).toEqual(500);
            expect(body).toEqual(expect.objectContaining({
                msg: expect.any(String)
            }));
        });

        test('PUT Retorna un status 500 y devuelve un mensaje Server error (ROLE-GOD)', async () => {
            const id = 5;
            const dataProducto = {
                "stock" : 100,
                "price" : 10,
                "description" : "Una descripcion de bizcochos",
                "mostwanted" : 1
            };
            const token = await generateJWT({ role: 'god'});
            const { body, statusCode } = await request(app).put(`/api/v2/products/${id}`).auth(token, { type: 'bearer'}).send(dataProducto);
            expect(statusCode).toEqual(500);
            expect(body).toEqual(expect.objectContaining({
                msg: expect.any(String)
            }));
        });
/*
        test('POST Retorna un status 500 y devuelve un mensaje Server error (ROLE-GOD)', async () => {
            const id = 5;
            const token = await generateJWT({ role: 'god'});
            const dataProducto = {
                "title": "Bizcochos",
                "stock" : 100,
                "price" : 10,
                "description" : "Una descripcion de bizcochos",
                "mostwanted" : 1,
                "fk_id_category": `${id}`
            };
            const { body, statusCode } = await request(app).post('/api/v2/products/').auth(token, { type: 'bearer' }).send(dataProducto);
            
            expect(statusCode).toEqual(500);
            expect(body).toEqual(expect.objectContaining({
                msg: expect.any(String)
            })); 
        });
 */
        test('DELETE Retorna un status 500 y devuelve un mensaje Server error (ROLE-ADMIN)', async () => {
            const id = 5;
            const token = await generateJWT({ role: 'admin'});
            const { body, statusCode } = await request(app).delete(`/api/v2/products/${id}`).auth(token, { type: 'bearer'});
            expect(statusCode).toEqual(500);
            expect(body).toEqual(expect.objectContaining({
                msg: expect.any(String)
            }));
        });

        test('DELETE Retorna un status 500 y devuelve un mensaje Server error (ROLE-GOD)', async () => {
            const id = 5;
            const token = await generateJWT({ role: 'god'});
            const { body, statusCode } = await request(app).delete(`/api/v2/products/${id}`).auth(token, { type: 'bearer'});
            expect(statusCode).toEqual(500);
            expect(body).toEqual(expect.objectContaining({
                msg: expect.any(String)
            }));
        }); 
    });

    describe("Tests de carts", () => {

    
        test("500, Falla la base de datos en GET", async ()=>{
            const token = await generateJWT({role:'god'});
            
            await db.sequelize.close();
            const { body, statusCode } = await request(app).get('/api/v2/carts/3').auth(token,{type: 'bearer'});
            
            expect(statusCode).toEqual(500);
            expect(body.Mensaje).toEqual('Server error');
        });
        
        
        
        
        test("500, Falla la base de datos en PUT", async ()=>{
            await db.sequelize.close();
            const token = await generateJWT({role:'god'});
            
            const data=[{
                "fk_id_product": 1,
                "quantity": 2 },
                {
                "fk_id_product": 2,
                "quantity": 3 },
        ];
            
            const { body, statusCode } = await request(app).put(`/api/v2/carts/1`).auth(token,{type: 'bearer'}).send(data);
            
            expect(statusCode).toEqual(500);
            expect(body.Mensaje).toEqual('Server error (UpdateCart)');
        });
    
    
    
    })

    describe("Tests de pictures", () => {

        test("GET /products/:id/pictures retorna un status 500 y un mensaje de server error", async() => {
            const token = await generateJWT({role: "god"});
            const idProduct = 2;
            const {statusCode, body} = await request(app).get(`/api/v2/products/${idProduct}/pictures`).auth(token, {type: "bearer"})
            expect(statusCode).toBe(500);
            expect(body).toEqual(expect.objectContaining({
                msg: expect.any(String)
            }))
        })
        test("GET /pictures?product=id retorna un status 500 y un mensaje de server error", async() => {
            const token = await generateJWT({role: "god"});
            const idProducto = 2;
            const {body, statusCode} = await request(app).get(`/api/v2/pictures?product=${idProducto}`).auth(token, {type: "bearer"});
            expect(statusCode).toBe(500);
            expect(body).toEqual(expect.objectContaining({
                msg: expect.any(String)
            }))
        })
        test("GET /pictures/:id retorna un status 500 y un mensaje de server error", async() => {
            const token = await generateJWT({role: "god"});
            const idPicture = 2;
            const {statusCode, body} = await request(app).get(`/api/v2/pictures/${idPicture}`).auth(token, {type: "bearer"})
            expect(statusCode).toBe(500);
            expect(body).toEqual(expect.objectContaining({
                msg: expect.any(String)
            }))
        })
        test("PUT /pictures/:id retorna un status 500 y un mensaje de server error cuando no se pasa una URL a editar", async() => {
            const token = await generateJWT({role: "god"});
            const idPicture = 2;
            const data = {
                description: "algo raro"
            }
            const {statusCode, body} = await request(app).put(`/api/v2/pictures/${idPicture}`).auth(token, {type: "bearer"}).send(data);
            expect(statusCode).toBe(500);
            expect(body).toEqual(expect.objectContaining({
                msg: expect.any(String)
            }))
        })
        test("DELETE /pictures/:id retorna un status 500 y un mensaje de server error", async() => {
            const token = await generateJWT({role: "god"});
            const idPicture = 2;
            const {statusCode, body} = await request(app).delete(`/api/v2/pictures/${idPicture}`).auth(token, {type: "bearer"});
            expect(statusCode).toBe(500);
            expect(body).toEqual(expect.objectContaining({
                msg: expect.any(String)
            }))
        })
    
    })
});