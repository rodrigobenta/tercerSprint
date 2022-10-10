const db = require('../database/models');
const request = require("supertest");
const { app } = require('../app');
const generateJWT = require('../helpers/generateJWT');


describe('Automatizacion de los test', () => {
    
    test('GET Retorna un status 404 y un msg de que no hay productos en el sistema - guest', async () => {
        const token = await generateJWT({ role: 'guest' });
        const { body, statusCode } = await request(app).get('/api/v2/products').auth(token, { type: 'bearer' });
        expect(statusCode).toEqual(404);
        expect(body).toEqual(expect.objectContaining({
            msg: expect.any(String)
        }))
    });

    test('GET Retorna un status 404 y un msg de que no hay productos en el sistema - admin', async () => {
        const token = await generateJWT({ role: 'admin' });
        const { body, statusCode } = await request(app).get('/api/v2/products').auth(token, { type: 'bearer' });
        expect(statusCode).toEqual(404);
        expect(body).toEqual(expect.objectContaining({
            msg: expect.any(String)
        }))
    });

    test('GET Retorna un status 404 y un msg de que no hay productos en el sistema - god', async () => {
        const token = await generateJWT({ role: 'god' });
        const { body, statusCode } = await request(app).get('/api/v2/products').auth(token, { type: 'bearer' });
        expect(statusCode).toEqual(404);
        expect(body).toEqual(expect.objectContaining({
            msg: expect.any(String)
        }))
    });

    test('GET Retorna un status 404 en buscar producto por ID y un msg de que no hay productos en el sistema - guest', async () => {
        const token = await generateJWT({ role: 'guest' });
        let id = 94359;
        const { body, statusCode } = await request(app).get(`/api/v2/products/${id}`).auth(token, { type: 'bearer' });
        expect(statusCode).toEqual(404);
        expect(body).toEqual(expect.objectContaining({
            msg: expect.any(String)
        }))
    });

    test('GET Retorna un status 404 en buscar producto por ID y un msg de que no hay productos en el sistema - admin', async () => {
        const token = await generateJWT({ role: 'admin' });
        let id = 323499;
        const { body, statusCode } = await request(app).get(`/api/v2/products/${id}`).auth(token, { type: 'bearer' });
        expect(statusCode).toEqual(404);
        expect(body).toEqual(expect.objectContaining({
            msg: expect.any(String)
        }))
    });

    test('GET Retorna un status 404 en buscar producto por ID y un msg de que no hay productos en el sistema - god', async () => {
        const token = await generateJWT({ role: 'god' });
        let id = 92359;
        const { body, statusCode } = await request(app).get(`/api/v2/products/${id}`).auth(token, { type: 'bearer' });
        expect(statusCode).toEqual(404);
        expect(body).toEqual(expect.objectContaining({
            msg: expect.any(String)
        }))
    });

    test('GET Retorna un status 404 en buscar producto por MOSTWANTED y un msg de que no hay productos en el sistema  - guest', async () => {
        const token = await generateJWT({ role: 'guest' });
        const { body, statusCode } = await request(app).get('/api/v2/products/mostwanted').auth(token, { type: 'bearer' });
        expect(statusCode).toEqual(404);
        expect(body).toEqual(expect.objectContaining({
            msg: expect.any(String)
        }))
    });

    test('GET Retorna un status 404 en buscar producto por MOSTWANTED y un msg de que no hay productos en el sistema  - admin', async () => {
        const token = await generateJWT({ role: 'admin' });
        const { body, statusCode } = await request(app).get('/api/v2/products/mostwanted').auth(token, { type: 'bearer' });
        expect(statusCode).toEqual(404);
        expect(body).toEqual(expect.objectContaining({
            msg: expect.any(String)
        }))
    });

    test('GET Retorna un status 404 en buscar producto por MOSTWANTED y un msg de que no hay productos en el sistema  - god', async () => {
        const token = await generateJWT({ role: 'god' });
        const { body, statusCode } = await request(app).get('/api/v2/products/mostwanted').auth(token, { type: 'bearer' });
        expect(statusCode).toEqual(404);
        expect(body).toEqual(expect.objectContaining({
            msg: expect.any(String)
        }))
    });

    test('GET Retorna un status 404 en buscar producto por KEYWORD y un msg de que no hay productos en el sistema  - guest', async () => {
        const token = await generateJWT({ role: 'guest' });
        const keyw ="pan";
        const { body, statusCode } = await request(app).get(`/api/v2/products/search?q=${keyw}`).auth(token, { type: 'bearer' });
        expect(statusCode).toEqual(404);
        expect(body).toEqual(expect.objectContaining({
            msg: expect.any(String)
        }))
    });

    test('GET Retorna un status 404 en buscar producto por KEYWORD y un msg de que no hay productos en el sistema  - admin', async () => {
        const token = await generateJWT({ role: 'admin' });
        const keyw ="pan";
        const { body, statusCode } = await request(app).get(`/api/v2/products/search?q=${keyw}`).auth(token, { type: 'bearer' });
        expect(statusCode).toEqual(404);
        expect(body).toEqual(expect.objectContaining({
            msg: expect.any(String)
        }))
    });

    test('GET Retorna un status 404 en buscar producto por KEYWORD y un msg de que no hay productos en el sistema  - god', async () => {
        const token = await generateJWT({ role: 'god' });
        const keyw ="pan";
        const { body, statusCode } = await request(app).get(`/api/v2/products/search?q=${keyw}`).auth(token, { type: 'bearer' });
        expect(statusCode).toEqual(404);
        expect(body).toEqual(expect.objectContaining({
            msg: expect.any(String)
        }))
    });

    test('GET Retorna un status 404 en buscar producto por CATEGORY que es No existen productos o categoria especificada  - guest', async () => {
        const token = await generateJWT({ role: 'guest' });
        const keyw ="cat";
        const { body, statusCode } = await request(app).get(`/api/v2/products?category=${keyw}`).auth(token, { type: 'bearer' });
        expect(statusCode).toEqual(404);
        expect(body).toEqual(expect.objectContaining({
            msg: expect.any(String)
        }))
    });

    test('GET Retorna un status 404 en buscar producto por CATEGORY que es No existen productos o categoria especificada- admin', async () => {
        const token = await generateJWT({ role: 'admin' });
        const keyw ="cat";
        const { body, statusCode } = await request(app).get(`/api/v2/products?category=${keyw}`).auth(token, { type: 'bearer' });
        expect(statusCode).toEqual(404);
        expect(body).toEqual(expect.objectContaining({
            msg: expect.any(String)
        }))
    });

    test('GET Retorna un status 404 en buscar producto por CATEGORY que es No existen productos o categoria especificada  - god', async () => {
        const token = await generateJWT({ role: 'god' });
        const keyw ="cat";
        const { body, statusCode } = await request(app).get(`/api/v2/products?category=${keyw}`).auth(token, { type: 'bearer' });
        expect(statusCode).toEqual(404);
        expect(body).toEqual(expect.objectContaining({
            msg: expect.any(String)
        }))
    });

    test('GET Retorna un status 404 por que no existe la PICTURE para ese producto - guest', async () => {
        const token = await generateJWT({ role: 'guest' });
        const id =99;
        const { body, statusCode } = await request(app).get(`/api/v2/products/${id}/pictures`).auth(token, { type: 'bearer' });
        expect(statusCode).toEqual(404);
        expect(body).toEqual(expect.objectContaining({
            msg: expect.any(String)
        }))
    });

    test('GET Retorna un status 404  por que no existe la PICTURE para ese producto - admin', async () => {
        const token = await generateJWT({ role: 'admin' });
        const id =99;
        const { body, statusCode } = await request(app).get(`/api/v2/products/${id}/pictures`).auth(token, { type: 'bearer' });
        expect(statusCode).toEqual(404);
        expect(body).toEqual(expect.objectContaining({
            msg: expect.any(String)
        }))
    });

    test('GET Retorna un status 404  por que no existe la PICTURE para ese producto - GOD', async () => {
        const token = await generateJWT({ role: 'god' });
        const id =99;
        const { body, statusCode } = await request(app).get(`/api/v2/products/${id}/pictures`).auth(token, { type: 'bearer' });
        expect(statusCode).toEqual(404);
        expect(body).toEqual(expect.objectContaining({
            msg: expect.any(String)
        }))
    });

    test('DELETE Retorna un status 404 PRODUCT no existe - admin', async () => {
        const token = await generateJWT({ role: 'admin' });
        const id =1;
        const { body, statusCode } = await request(app).delete(`/api/v2/products/${id}`).auth(token, { type: 'bearer' });
        expect(statusCode).toEqual(404);
        expect(body).toEqual(expect.objectContaining({
            msg: expect.any(String)
        }))
    });

    test('DELETE Retorna un status 404 PRODUCT no existe - god', async () => {
        const token = await generateJWT({ role: 'god' });
        const id =1;
        const { body, statusCode } = await request(app).delete(`/api/v2/products/${id}`).auth(token, { type: 'bearer' });
        expect(statusCode).toEqual(404);
        expect(body).toEqual(expect.objectContaining({
            msg: expect.any(String)
        }))
    });

    test("POST con GUEST = 401 no tiene permisos", async () => {
        const token = await generateJWT({ role: 'guest' });
        const data = {
            "title": "Manzanas",
            "stock" : 10,
            "price" : 100,
            "description" : "Una descripcion",
            "mostwanted" : 0,
            "fk_id_category":1
        }
        const { body, statusCode } = await request(app).post('/api/v2/products').send(data).auth(token, { type: 'bearer' });
        expect(statusCode).toEqual(401);
        expect(body).toMatchObject({ msg: expect.any(String) });
    });

    test("PUT con GUEST = 401 no tiene permisos ", async () => {
        const token = await generateJWT({ role: 'guest' });
        const id = 12;
        const data = {
            "title": "Matess",
            "stock" : 10,
            "price" : 100,
            "description" : "Una descripcion",
            "mostwanted" : 0,
            "fk_id_category":1
        }
        const { body, statusCode } = await request(app).put(`/api/v2/products/${id}`).send(data).auth(token, { type: 'bearer' });
        expect(statusCode).toEqual(401);
        expect(body).toMatchObject({ msg: expect.any(String) });
    });

    test('DELETE Retorna un status 401 NO tiene permisos  - guest', async () => {
        const token = await generateJWT({ role: 'guest' });
        const id =14;
        const { body, statusCode } = await request(app).delete(`/api/v2/products/${id}`).auth(token, { type: 'bearer' });
        expect(statusCode).toEqual(401);
        expect(body).toEqual(expect.objectContaining({
            msg: expect.any(String)
        }))
    });

    test("POST con ADMIN devuelve un error por categoria repetida = 400 ", async () => {
        const token = await generateJWT({ role: 'admin' });
        const data = {
            "title": "juan",
            "stock" : 10,
            "price" : 100,
            "description" : "Una descripcion",
            "mostwanted" : 0,
            "fk_id_category":1
        }
        const { body, statusCode } = await request(app).post('/api/v2/products').auth(token, { type: 'bearer' }).send(data);
        expect(statusCode).toEqual(400);
        expect(body).toEqual(expect.objectContaining({
            errors: expect.arrayContaining([
                expect.objectContaining({
                    msg: expect.any(String)
                })
            ])
        }));
    });

    test("POST con GOD devuelve un error por categoria repetida = 400 ", async () => {
        const token = await generateJWT({ role: 'god' });
        const data = {
            "title": "Bizcochos",
            "stock" : 10,
            "price" : 100,
            "description" : "Una descripcion",
            "mostwanted" : 0,
            "fk_id_category":1
        }
        const { body, statusCode } = await request(app).post('/api/v2/products/').auth(token, { type: 'bearer' }).send(data);
        expect(statusCode).toEqual(400);
        expect(body).toEqual(expect.objectContaining({
            errors: expect.arrayContaining([
                expect.objectContaining({
                    msg: expect.any(String)
                })
            ])
        }));
    });

    test("POST con ADMIN devuelve un error por categoria repetida = 400 ", async () => {
        const token = await generateJWT({ role: 'admin' });
        const data = {
            "title": "juan",
            "stock" : 10,
            "price" : 100,
            "description" : "Una descripcion",
            "mostwanted" : 0,
            "fk_id_category":1
        }
        const { body, statusCode } = await request(app).post('/api/v2/products').auth(token, { type: 'bearer' }).send(data);
        expect(statusCode).toEqual(400);
        expect(body).toEqual(expect.objectContaining({
            errors: expect.arrayContaining([
                expect.objectContaining({
                    msg: expect.any(String)
                })
            ])
        }));
    });

    test("POST con GOD (TITULO VACIO) = 400 ", async () => {
        const token = await generateJWT({ role: 'god' });
        const data = {
            "title": "",
            "stock" : 10,
            "price" : 100,
            "description" : "Una descripcion",
            "mostwanted" : 0,
            "fk_id_category":1
        }
        const { body, statusCode } = await request(app).post('/api/v2/products/').auth(token, { type: 'bearer' }).send(data);
        const title = data.title
        expect(statusCode).toEqual(400);
        expect(body).toEqual(expect.objectContaining({
            errors: expect.arrayContaining([
                expect.objectContaining({
                    msg: expect.any(String)
                })
            ])
        }));
    });

    test("POST con ADMIN (TITULO VACIO) = 400 ", async () => {
        const token = await generateJWT({ role: 'admin' });
        const data = {
            "title": "",
            "stock" : 10,
            "price" : 100,
            "description" : "Una descripcion",
            "mostwanted" : 0,
            "fk_id_category":1
        }
        const { body, statusCode } = await request(app).post('/api/v2/products/').auth(token, { type: 'bearer' }).send(data);
        const title = data.title
        expect(statusCode).toEqual(400);
        expect(body).toEqual(expect.objectContaining({
            errors: expect.arrayContaining([
                expect.objectContaining({
                    msg: expect.any(String)
                })
            ])
        }));
    });

    test("POST con ADMIN (STOCK MENOR A 0)) = 400 ", async () => {
        const token = await generateJWT({ role: 'admin' });
        const data = {
            "title": "Mate",
            "stock" : -10,
            "price" : 100,
            "description" : "Una descripcion",
            "mostwanted" : 0,
            "fk_id_category":1
        }
        const { body, statusCode } = await request(app).post('/api/v2/products/').auth(token, { type: 'bearer' }).send(data);
        const title = data.title
        expect(statusCode).toEqual(400);
        expect(body).toEqual(expect.objectContaining({
            errors: expect.arrayContaining([
                expect.objectContaining({
                    msg: expect.any(String)
                })
            ])
        }));
    });

    test("POST con GOD (STOCK MENOR A 0)) = 400 ", async () => {
        const token = await generateJWT({ role: 'god' });
        const data = {
            "title": "Mate",
            "stock" : -10,
            "price" : 100,
            "description" : "Una descripcion",
            "mostwanted" : 0,
            "fk_id_category":1
        }
        const { body, statusCode } = await request(app).post('/api/v2/products/').auth(token, { type: 'bearer' }).send(data);
        const title = data.title
        expect(statusCode).toEqual(400);
        expect(body).toEqual(expect.objectContaining({
            errors: expect.arrayContaining([
                expect.objectContaining({
                    msg: expect.any(String)
                })
            ])
        }));
    });

    test("POST con ADMIN (PRICE MENOR A 0)) = 400 ", async () => {
        const token = await generateJWT({ role: 'admin' });
        const data = {
            "title": "Jabulani",
            "stock" : 10,
            "price" : -100,
            "description" : "Una descripcion",
            "mostwanted" : 0,
            "fk_id_category":1
        }
        const { body, statusCode } = await request(app).post('/api/v2/products/').auth(token, { type: 'bearer' }).send(data);
        const title = data.title
        expect(statusCode).toEqual(400);
        expect(body).toEqual(expect.objectContaining({
            errors: expect.arrayContaining([
                expect.objectContaining({
                    msg: expect.any(String)
                })
            ])
        }));
    });

    test("POST con GOD (PRICE MENOR A 0)) = 400 ", async () => {
        const token = await generateJWT({ role: 'god' });
        const data = {
            "title": "Jabulani",
            "stock" : 10,
            "price" : -100,
            "description" : "Una descripcion",
            "mostwanted" : 0,
            "fk_id_category":1
        }
        const { body, statusCode } = await request(app).post('/api/v2/products/').auth(token, { type: 'bearer' }).send(data);
        const title = data.title
        expect(statusCode).toEqual(400);
        expect(body).toEqual(expect.objectContaining({
            errors: expect.arrayContaining([
                expect.objectContaining({
                    msg: expect.any(String)
                })
            ])
        }));
    });

    test("POST con ADMIN (DESCRIPTION NO PUEDE SER VACIO) = 400 ", async () => {
        const token = await generateJWT({ role: 'admin' });
        const data = {
            "title": "Jabulani",
            "stock" : 10,
            "price" : 100,
            "description" : "",
            "mostwanted" : 0,
            "fk_id_category":1
        }
        const { body, statusCode } = await request(app).post('/api/v2/products/').auth(token, { type: 'bearer' }).send(data);
        const title = data.title
        expect(statusCode).toEqual(400);
        expect(body).toEqual(expect.objectContaining({
            errors: expect.arrayContaining([
                expect.objectContaining({
                    msg: expect.any(String)
                })
            ])
        }));
    });

    test("POST con GOD (DESCRIPTION NO PUEDE SER VACIO) = 400 ", async () => {
        const token = await generateJWT({ role: 'god' });
        const data = {
            "title": "Jabulani",
            "stock" : 10,
            "price" : 100,
            "description" : "",
            "mostwanted" : 0,
            "fk_id_category":1
        }
        const { body, statusCode } = await request(app).post('/api/v2/products/').auth(token, { type: 'bearer' }).send(data);
        const title = data.title
        expect(statusCode).toEqual(400);
        expect(body).toEqual(expect.objectContaining({
            errors: expect.arrayContaining([
                expect.objectContaining({
                    msg: expect.any(String)
                })
            ])
        }));
    });

    test("POST con ADMIN (MOSTWANTED NO PUEDE SER NI 0 NI 1) = 400 ", async () => {
        const token = await generateJWT({ role: 'admin' });
        const data = {
            "title": "Jabulani",
            "stock" : 10,
            "price" : 100,
            "description" : "",
            "mostwanted" : 6,
            "fk_id_category":1
        }
        const { body, statusCode } = await request(app).post('/api/v2/products/').auth(token, { type: 'bearer' }).send(data);
        const title = data.title
        expect(statusCode).toEqual(400);
        expect(body).toEqual(expect.objectContaining({
            errors: expect.arrayContaining([
                expect.objectContaining({
                    msg: expect.any(String)
                })
            ])
        }));
    });

    test("POST con GOD (MOSTWANTED NO PUEDE SER NI 0 NI 1) = 400 ", async () => {
        const token = await generateJWT({ role: 'god' });
        const data = {
            "title": "Jabulani",
            "stock" : 10,
            "price" : 100,
            "description" : "",
            "mostwanted" : 1,
            "fk_id_category":99
        }
        const { body, statusCode } = await request(app).post('/api/v2/products/').auth(token, { type: 'bearer' }).send(data);
        const title = data.title
        expect(statusCode).toEqual(400);
        expect(body).toEqual(expect.objectContaining({
            errors: expect.arrayContaining([
                expect.objectContaining({
                    msg: expect.any(String)
                })
            ])
        }));
    });

    test("POST con ADMIN (CATEGORY NO EXISTENTE) = 400 ", async () => {
        const token = await generateJWT({ role: 'admin' });
        const data = {
            "title": "Jabulani",
            "stock" : 10,
            "price" : 100,
            "description" : "",
            "mostwanted" : 0,
            "fk_id_category":99
        }
        const { body, statusCode } = await request(app).post('/api/v2/products/').auth(token, { type: 'bearer' }).send(data);
        const title = data.title
        expect(statusCode).toEqual(400);
        expect(body).toEqual(expect.objectContaining({
            errors: expect.arrayContaining([
                expect.objectContaining({
                    msg: expect.any(String)
                })
            ])
        }));
    });

    test("POST con GOD (CATEGORY NO EXISTENTE)  = 400 ", async () => {
        const token = await generateJWT({ role: 'god' });
        const data = {
            "title": "Jabulani",
            "stock" : 10,
            "price" : 100,
            "description" : "",
            "mostwanted" : 6,
            "fk_id_category":1
        }
        const { body, statusCode } = await request(app).post('/api/v2/products/').auth(token, { type: 'bearer' }).send(data);
        const title = data.title
        expect(statusCode).toEqual(400);
        expect(body).toEqual(expect.objectContaining({
            errors: expect.arrayContaining([
                expect.objectContaining({
                    msg: expect.any(String)
                })
            ])
        }));
    });

    test("POST con GOD = 201 ", async () => {
        const token = await generateJWT({ role: 'god' });

        const dataCategoria = { "title": "Alimentos"};
        await request(app).post('/api/v2/categories').auth(token, { type: 'bearer' }).send(dataCategoria);

        const category = await db.Category.findOne({where: {title: "Alimentos"}});
        const id = category.dataValues.id_category;

        const dataProducto = {
            "title": "Bizcochos",
            "stock" : 100,
            "price" : 10,
            "description" : "Una descripcion de bizcochos",
            "mostwanted" : 1,
            "fk_id_category": `${id}`
        };
        const { body, statusCode } = await request(app).post('/api/v2/products').auth(token, { type: 'bearer' }).send(dataProducto);

        const product = await db.Product.findOne({where: { title: "Bizcochos"}});
        const idProduct = product.dataValues.id_product;

        const dataPicture = { 
            "url": "estoesunaurldeunbizcocho.com",
            "description": "esto es una descripcion de un bizcocho",
            "fk_id_product": `${idProduct}`
        };
        await request(app).post('/api/v2/pictures').auth(token, { type: 'bearer' }).send(dataPicture); 

        const dataUser = {
            "email": "email2@email.com",
            "username": "username2",
            "password": "123456",
            "firstname": "prueba2",
            "lastname": "prueba2",
            "profilepic": "notengo2",
            "role": "guest"
        };
        await request(app).post('/api/v2/users').auth(token, { type: 'bearer' }).send(dataUser); 
        const user = await db.User.findOne({where:{email : dataUser.email}})
        const idUser = user.dataValues.id_user ;

        const dataCart = [{
            "fk_id_product": `${idProduct}`,
            "quantity": 3
        }]
         await request(app).put(`/api/v2/carts/${idUser}`).auth(token, { type: 'bearer' }).send(dataCart); 

        expect(statusCode).toEqual(201);
        expect(body).toEqual(expect.objectContaining({
            newProduct : expect.objectContaining({
                id_product : expect.any(Number)
            })
        }));
    });
    

    test("POST con ADMIN = 201 ", async () => {
        const token = await generateJWT({ role: 'admin' });

        const dataCategoria = { "title": "Jardineria"};
        await request(app).post('/api/v2/categories').auth(token, { type: 'bearer' }).send(dataCategoria);

        const category = await db.Category.findOne({where: {title: "Jardineria"}});
        const id = category.dataValues.id_category;

        const dataProducto = {
            "title": "plantas",
            "stock" : 10,
            "price" : 100,
            "description" : "Una descripcion de plantas",
            "mostwanted" : 0,
            "fk_id_category": `${id}`
        };
        const { body, statusCode } = await request(app).post('/api/v2/products').auth(token, { type: 'bearer' }).send(dataProducto);

        const product = await db.Product.findOne({where: { title: "plantas"}});
        const idProduct = product.dataValues.id_product;

        const dataPicture = { 
            "url": "estoesunaurl.com",
            "description": "esto es una descripcion",
            "fk_id_product": `${idProduct}`
        };
        await request(app).post('/api/v2/pictures').auth(token, { type: 'bearer' }).send(dataPicture); 

        const dataUser = {
            "email": "email@email.com",
            "username": "username",
            "password": "1234567",
            "firstname": "prueba",
            "lastname": "prueba",
            "profilepic": "notengo",
            "role": "guest"
        };
        await request(app).post('/api/v2/users').auth(token, { type: 'bearer' }).send(dataUser); 

        expect(statusCode).toEqual(201);
        expect(body).toEqual(expect.objectContaining({
            newProduct : expect.objectContaining({
                id_product : expect.any(Number)
            })
        }));
    });

    test('GET Trae un array de productos 200 - god', async () => {
        const token = await generateJWT({ role: 'god' });
        const { body, statusCode } = await request(app).get('/api/v2/products').auth(token, { type: 'bearer' });
        expect(statusCode).toEqual(200);
        expect(body).toEqual(expect.objectContaining({
            Productos: expect.arrayContaining([
                expect.objectContaining({
                    id_product: expect.any(Number)
                })
            ])
        }))
    });

    test('GET Trae un array de productos 200 - admin', async () => {
        const token = await generateJWT({ role: 'admin' });
        const { body, statusCode } = await request(app).get('/api/v2/products').auth(token, { type: 'bearer' });
        expect(statusCode).toEqual(200);
        expect(body).toEqual(expect.objectContaining({
            Productos: expect.arrayContaining([
                expect.objectContaining({
                    id_product: expect.any(Number)
                })
            ])
        }))
    });

    test('GET Trae un array de productos 200 - guest', async () => {
        const token = await generateJWT({ role: 'guest' });
        const { body, statusCode } = await request(app).get('/api/v2/products').auth(token, { type: 'bearer' });
        expect(statusCode).toEqual(200);
        expect(body).toEqual(expect.objectContaining({
            Productos: expect.arrayContaining([
                expect.objectContaining({
                    id_product: expect.any(Number)
                })
            ])
        }))
    });

    test('GET{id} devuelve satus 200 y el producto por id - god', async () => {
        const token = await generateJWT({ role: 'god' });
        const product = await db.Product.findOne();
        const id = product.dataValues.id_product;
        const { body, statusCode } = await request(app).get(`/api/v2/products/${id}`).auth(token, { type: 'bearer' });
        expect(statusCode).toEqual(200);
        expect(body).toEqual(expect.objectContaining({
            Producto: expect.objectContaining({
                id_product: expect.any(Number)
            })
        }));
    });

    test('GET{id} devuelve satus 200 y el producto por id - admin', async () => {
        const token = await generateJWT({ role: 'admin' });
        const product = await db.Product.findOne();
        const id = product.dataValues.id_product;
        const { body, statusCode } = await request(app).get(`/api/v2/products/${id}`).auth(token, { type: 'bearer' });
        expect(statusCode).toEqual(200);
        expect(body).toEqual(expect.objectContaining({
            Producto: expect.objectContaining({
                id_product: expect.any(Number)
            })
        }));
    });

    test('GET{id} devuelve satus 200 y el producto por id - guest', async () => {
        const token = await generateJWT({ role: 'guest' });
        const product = await db.Product.findOne();
        const id = product.dataValues.id_product;
        const { body, statusCode } = await request(app).get(`/api/v2/products/${id}`).auth(token, { type: 'bearer' });
        expect(statusCode).toEqual(200);
        expect(body).toEqual(expect.objectContaining({
            Producto: expect.objectContaining({
                id_product: expect.any(Number)
            })
        }));
    });

    test('GET Retorna un status 200 y devuelve todos los productos que tengan  MOSTWANTED TRUE- GUEST', async () => {
        const token = await generateJWT({ role: 'guest' });
        const { body, statusCode } = await request(app).get('/api/v2/products/mostwanted').auth(token, { type: 'bearer' });
        expect(statusCode).toEqual(200);
        expect(body).toEqual(expect.objectContaining({
            ProductsMostwanted: expect.arrayContaining([
                expect.objectContaining({
                    id_product: expect.any(Number)
                })
            ])
        }))
    });

    test('GET Retorna un status 200 y devuelve todos los productos que tengan MOSTWANTED TRUE- ADMIN', async () => {
        const token = await generateJWT({ role: 'admin' });
        const { body, statusCode } = await request(app).get('/api/v2/products/mostwanted').auth(token, { type: 'bearer' });
        expect(statusCode).toEqual(200);
        expect(body).toEqual(expect.objectContaining({
            ProductsMostwanted: expect.arrayContaining([
                expect.objectContaining({
                    id_product: expect.any(Number)
                })
            ])
        }))
    });

    test('GET Retorna un status 200 y devuelve todos los productos que tengan MOSTWANTED TRUE- GOD', async () => {
        const token = await generateJWT({ role: 'GOD' });
        const { body, statusCode } = await request(app).get('/api/v2/products/mostwanted').auth(token, { type: 'bearer' });
        expect(statusCode).toEqual(200);
        expect(body).toEqual(expect.objectContaining({
            ProductsMostwanted: expect.arrayContaining([
                expect.objectContaining({
                    id_product: expect.any(Number)
                })
            ])
        }))
    });

    test('GET Retorna un status 200 en buscar producto por KEYWORD - god', async () => {
        const token = await generateJWT({ role: 'god' });
        const keyw ="plantas";
        const { body, statusCode } = await request(app).get(`/api/v2/products/search?q=${keyw}`).auth(token, { type: 'bearer' });
        expect(statusCode).toEqual(200);
        expect(body).toEqual(expect.objectContaining({
            Lista: expect.arrayContaining([
                expect.objectContaining({
                    id_product: expect.any(Number)
                })
            ])
        }))
    });

    test('GET Retorna un status 200 en buscar producto por KEYWORD - admin', async () => {
        const token = await generateJWT({ role: 'admin' });
        const keyw ="plantas";
        const { body, statusCode } = await request(app).get(`/api/v2/products/search?q=${keyw}`).auth(token, { type: 'bearer' });
        expect(statusCode).toEqual(200);
        expect(body).toEqual(expect.objectContaining({
            Lista: expect.arrayContaining([
                expect.objectContaining({
                    id_product: expect.any(Number)
                })
            ])
        }))
    });

    test('GET Retorna un status 200 en buscar producto por KEYWORD - guest', async () => {
        const token = await generateJWT({ role: 'guest' });
        const keyw ="plantas";
        const { body, statusCode } = await request(app).get(`/api/v2/products/search?q=${keyw}`).auth(token, { type: 'bearer' });
        expect(statusCode).toEqual(200);
        expect(body).toEqual(expect.objectContaining({
            Lista: expect.arrayContaining([
                expect.objectContaining({
                    id_product: expect.any(Number)
                })
            ])
        }))
    });

    test('GET Retorna un status 200 en buscar producto por CATEGORY - guest', async () => {
        const token = await generateJWT({ role: 'guest' });
        const keyw ="Alimentos";
        const { body, statusCode } = await request(app).get(`/api/v2/products?category=${keyw}`).auth(token, { type: 'bearer' });
        expect(statusCode).toEqual(200);
        expect(body).toEqual(expect.objectContaining({
            Productos: expect.arrayContaining([
                expect.objectContaining({
                    id_product: expect.any(Number)
                })
            ])
        }))
    });

    test('GET Retorna un status 200 en buscar producto por CATEGORY - admin', async () => {
        const token = await generateJWT({ role: 'admin' });
        const keyw ="Jardineria";
        const { body, statusCode } = await request(app).get(`/api/v2/products?category=${keyw}`).auth(token, { type: 'bearer' });
        expect(statusCode).toEqual(200);
        expect(body).toEqual(expect.objectContaining({
            Productos: expect.arrayContaining([
                expect.objectContaining({
                    id_product: expect.any(Number)
                })
            ])
        }))
    });

    test('GET Retorna un status 200 en buscar producto por CATEGORY - god', async () => {
        const token = await generateJWT({ role: 'god' });
        const keyw ="Alimentos";
        const { body, statusCode } = await request(app).get(`/api/v2/products?category=${keyw}`).auth(token, { type: 'bearer' });
        expect(statusCode).toEqual(200);
        expect(body).toEqual(expect.objectContaining({
            Productos: expect.arrayContaining([
                expect.objectContaining({
                    id_product: expect.any(Number)
                })
            ])
        }))
    });

    test('GET Retorna un status 200 en buscar producto por que no existe la PICTURE para ese producto - guest', async () => {
        const token = await generateJWT({ role: 'guest' });
        const product = await db.Product.findOne();
        const id = product.dataValues.id_product;
        const { body, statusCode } = await request(app).get(`/api/v2/products/${id}/pictures`).auth(token, { type: 'bearer' });
        expect(statusCode).toEqual(200);
        expect(body).toEqual(expect.objectContaining({
            pictures: expect.arrayContaining([
                expect.objectContaining({
                    fk_id_product: expect.any(Number)
                })
            ])
        }))
    });

    test('GET Retorna un status 200 en buscar producto por que no existe la PICTURE para ese producto - admin', async () => {
        const token = await generateJWT({ role: 'admin' });
        const product = await db.Product.findOne();
        const id = product.dataValues.id_product;
        const { body, statusCode } = await request(app).get(`/api/v2/products/${id}/pictures`).auth(token, { type: 'bearer' });
        expect(statusCode).toEqual(200);
        expect(body).toEqual(expect.objectContaining({
            pictures: expect.arrayContaining([
                expect.objectContaining({
                    fk_id_product: expect.any(Number)
                })
            ])
        }))
    });

    test('GET Retorna un status 200 en buscar producto por que no existe la PICTURE para ese producto - god', async () => {
        const token = await generateJWT({ role: 'god' });
        const product = await db.Product.findOne();
        const id = product.dataValues.id_product;
        const { body, statusCode } = await request(app).get(`/api/v2/products/${id}/pictures`).auth(token, { type: 'bearer' });
        expect(statusCode).toEqual(200);
        expect(body).toEqual(expect.objectContaining({
            pictures: expect.arrayContaining([
                expect.objectContaining({
                    fk_id_product: expect.any(Number)
                })
            ])
        }))
    });

    test("PUT con ADMIN NO puede ser title REPETIDO - ADMIN", async () => {
        const token = await generateJWT({ role: 'admin' });
        const product = await db.Product.findOne({where: {title: "plantas"}});
        const id = product.dataValues.id_product;
        const data = {
            "title": "plantas",
            "stock" : 10,
            "price" : 100,
            "description" : "Una descripcion",
            "mostwanted" : 0,
            "fk_id_category":1
        }
        const { body, statusCode } = await request(app).put(`/api/v2/products/${id}`).auth(token, { type: 'bearer' }).send(data);
        expect(statusCode).toEqual(400);
        expect(body).toEqual(expect.objectContaining({
            errors : expect.arrayContaining([
                expect.objectContaining({
                    msg: expect.any(String)
                })
            ])
        }));
    });

    test("PUT con ADMIN NO puede ser title VACIO - ADMIN", async () => {
        const token = await generateJWT({ role: 'admin' });
        const product = await db.Product.findOne();
        const id = product.dataValues.id_product;
        const data = {
            "title": "",
            "stock" : 10,
            "price" : 100,
            "description" : "Una descripcion",
            "mostwanted" : 0,
            "fk_id_category":1
        }
        const { body, statusCode } = await request(app).put(`/api/v2/products/${id}`).auth(token, { type: 'bearer' }).send(data);
        expect(statusCode).toEqual(400);
        expect(body).toEqual(expect.objectContaining({
            errors : expect.arrayContaining([
                expect.objectContaining({
                    msg: expect.any(String)
                })
            ])
        }));
    });

    test("PUT con GOD NO puede ser title VACIO - GOD", async () => {
        const token = await generateJWT({ role: 'god' });
        const product = await db.Product.findOne();
        const id = product.dataValues.id_product;
        const data = {
            "title": "",
            "stock" : 10,
            "price" : 100,
            "description" : "Una descripcion",
            "mostwanted" : 0,
            "fk_id_category":1
        }
        const { body, statusCode } = await request(app).put(`/api/v2/products/${id}`).auth(token, { type: 'bearer' }).send(data);
        expect(statusCode).toEqual(400);
        expect(body).toEqual(expect.objectContaining({
            errors : expect.arrayContaining([
                expect.objectContaining({
                    msg: expect.any(String)
                })
            ])
        }));
    });

    test("PUT con ADMIN NO puede ser STOCK < a 0 - ADMIN", async () => {
        const token = await generateJWT({ role: 'admin' });
        const product = await db.Product.findOne();
        const id = product.dataValues.id_product;
        const data = {
            "title": "title",
            "stock" : -10,
            "price" : 100,
            "description" : "Una descripcion",
            "mostwanted" : 0,
            "fk_id_category":1
        }
        const { body, statusCode } = await request(app).put(`/api/v2/products/${id}`).auth(token, { type: 'bearer' }).send(data);
        expect(statusCode).toEqual(400);
        expect(body).toEqual(expect.objectContaining({
            errors : expect.arrayContaining([
                expect.objectContaining({
                    msg: expect.any(String)
                })
            ])
        }));
    });

    test("PUT con GOD NO puede ser STOCK < a 0 - GOD", async () => {
        const token = await generateJWT({ role: 'god' });
        const product = await db.Product.findOne();
        const id = product.dataValues.id_product;
        const data = {
            "title": "title",
            "stock" : -10,
            "price" : 100,
            "description" : "Una descripcion",
            "mostwanted" : 0,
            "fk_id_category":1
        }
        const { body, statusCode } = await request(app).put(`/api/v2/products/${id}`).auth(token, { type: 'bearer' }).send(data);
        expect(statusCode).toEqual(400);
        expect(body).toEqual(expect.objectContaining({
            errors : expect.arrayContaining([
                expect.objectContaining({
                    msg: expect.any(String)
                })
            ])
        }));
    });

    test("PUT con ADMIN NO puede ser PRICE < a 0 - ADMIN", async () => {
        const token = await generateJWT({ role: 'admin' });
        const product = await db.Product.findOne();
        const id = product.dataValues.id_product;
        const data = {
            "title": "title",
            "stock" : 10,
            "price" : -100,
            "description" : "Una descripcion",
            "mostwanted" : 0,
            "fk_id_category":1
        }
        const { body, statusCode } = await request(app).put(`/api/v2/products/${id}`).auth(token, { type: 'bearer' }).send(data);
        expect(statusCode).toEqual(400);
        expect(body).toEqual(expect.objectContaining({
            errors : expect.arrayContaining([
                expect.objectContaining({
                    msg: expect.any(String)
                })
            ])
        }));
    });

    test("PUT con GOD NO puede ser PRICE < a 0 - GOD", async () => {
        const token = await generateJWT({ role: 'god' });
        const product = await db.Product.findOne();
        const id = product.dataValues.id_product;
        const data = {
            "title": "title",
            "stock" : 10,
            "price" : -100,
            "description" : "Una descripcion",
            "mostwanted" : 0,
            "fk_id_category":1
        }
        const { body, statusCode } = await request(app).put(`/api/v2/products/${id}`).auth(token, { type: 'bearer' }).send(data);
        expect(statusCode).toEqual(400);
        expect(body).toEqual(expect.objectContaining({
            errors : expect.arrayContaining([
                expect.objectContaining({
                    msg: expect.any(String)
                })
            ])
        }));
    });

    test("PUT on ADMIN NO puede ser DESCRIPCION NO PUEDE SER VACIA- admin", async () => {
        const token = await generateJWT({ role: 'admin' });
        const product = await db.Product.findOne();
        const id = product.dataValues.id_product;
        const data = {
            "title": "title",
            "stock" : 10,
            "price" : 100,
            "description" : "",
            "mostwanted" : 0,
            "fk_id_category":1
        }
        const { body, statusCode } = await request(app).put(`/api/v2/products/${id}`).auth(token, { type: 'bearer' }).send(data);
        expect(statusCode).toEqual(400);
        expect(body).toEqual(expect.objectContaining({
            errors : expect.arrayContaining([
                expect.objectContaining({
                    msg: expect.any(String)
                })
            ])
        }));
    })

    test("PUT con GOD NO puede ser DESCRIPCION NO PUEDE SER VACIA- god", async () => {
        const token = await generateJWT({ role: 'god' });
        const product = await db.Product.findOne();
        const id = product.dataValues.id_product;
        const data = {
            "title": "title",
            "stock" : 10,
            "price" : 100,
            "description" : "",
            "mostwanted" : 0,
            "fk_id_category":1
        }
        const { body, statusCode } = await request(app).put(`/api/v2/products/${id}`).auth(token, { type: 'bearer' }).send(data);
        expect(statusCode).toEqual(400);
        expect(body).toEqual(expect.objectContaining({
            errors : expect.arrayContaining([
                expect.objectContaining({
                    msg: expect.any(String)
                })
            ])
        }));
    });

    test("PUT con ADMIN NO puede ser MOSTWANTED tiene que ser 0 o 1 - ADMIN", async () => {
        const token = await generateJWT({ role: 'admin' });
        const product = await db.Product.findOne();
        const id = product.dataValues.id_product;
        const data = {
            "title": "title",
            "stock" : 10,
            "price" : 100,
            "description" : "Una descripcion",
            "mostwanted" : 99,
            "fk_id_category":1
        }

        const { body, statusCode } = await request(app).put(`/api/v2/products/${id}`).auth(token, { type: 'bearer' }).send(data);
        expect(statusCode).toEqual(400);
        expect(body).toEqual(expect.objectContaining({
            errors : expect.arrayContaining([
                expect.objectContaining({
                    msg: expect.any(String)
                })
            ])
        }));
    });

    test("PUT con GOD NO puede ser MOSTWANTED tiene que ser 0 o 1 - GOD", async () => {
        const token = await generateJWT({ role: 'god' });
        const product = await db.Product.findOne();
        const id = product.dataValues.id_product;
        const data = {
            "title": "title",
            "stock" : 10,
            "price" : 100,
            "description" : "Una descripcion",
            "mostwanted" : 99,
            "fk_id_category":1
        }
        const { body, statusCode } = await request(app).put(`/api/v2/products/${id}`).auth(token, { type: 'bearer' }).send(data);
        expect(statusCode).toEqual(400);
        expect(body).toEqual(expect.objectContaining({
            errors : expect.arrayContaining([
                expect.objectContaining({
                    msg: expect.any(String)
                })
            ])
        }));
    });

    test("PUT con GOD NO existe el producto- GOD", async () => {
        const token = await generateJWT({ role: 'god' });
        const idProduct = 12345;
        const data = {
            "stock" : 10,
            "price" : 100,
            "description" : "Una descripcion",
            "mostwanted" : 0
        }
        const { body, statusCode } = await request(app).put(`/api/v2/products/${idProduct}`).auth(token, { type: 'bearer' }).send(data);
        expect(statusCode).toEqual(404);
        expect(body).toEqual(expect.objectContaining({
            msg: expect.any(String)
        }));
    });

    test("PUT con GOD devuelve un 200 - GOD", async () => {
        const token = await generateJWT({ role: 'god' });

        const producto = await db.Product.findOne({where: {title: "plantas"}});
        const id = producto.dataValues.id_product;

        const category = await db.Category.findOne({where: {title: "Jardineria"}});
        const idC = category.dataValues.id_category;
        const data = {
            "title": "plantaCarnivora",
            "stock" : 10,
            "price" : 100,
            "description" : "Una descripcion",
            "mostwanted" : 0,
            "fk_id_category":`${idC}`
        }
        const { body, statusCode } = await request(app).put(`/api/v2/products/${id}`).auth(token, { type: 'bearer' }).send(data);
        expect(statusCode).toEqual(200);
        expect(body).toEqual(expect.objectContaining({
            ProductoEditado: expect.objectContaining({
                id_product: expect.any(Number)
            })
        }));
    });

    test('DELETE Retorna un status 409 PRODUCT  tiene una PICTURE asociado - admin', async () => {
        const token = await generateJWT({ role: 'admin' });
        const producto = await db.Product.findOne();
        const id = producto.dataValues.id_product;
        const { body, statusCode } = await request(app).delete(`/api/v2/products/${id}`).auth(token, { type: 'bearer' });
        expect(statusCode).toEqual(409);
        expect(body).toEqual(expect.objectContaining({
            msg: expect.any(String)
        }))
    });

    test('DELETE Retorna un status 409 PRODUCT  tiene una PICTURE  asociada - god', async () => {
        const token = await generateJWT({ role: 'god' });
        const producto = await db.Product.findOne({where:{title: 'plantaCarnivora'}});
        const id = producto.dataValues.id_product;
        const { body, statusCode } = await request(app).delete(`/api/v2/products/${id}`).auth(token, { type: 'bearer' });
        expect(statusCode).toEqual(409);
        expect(body).toEqual(expect.objectContaining({
            msg: expect.any(String)
        }));
    });

    test('DELETE Retorna un status 409 PRODUCT  tiene un CART asociado - admin', async () => {
        const token = await generateJWT({ role: 'admin' });
        const product = await db.Product.findOne({where:{title: 'plantaCarnivora'}});
        const id = product.dataValues.id_product;
        const { body, statusCode } = await request(app).delete(`/api/v2/products/${id}`).auth(token, { type: 'bearer' });
        expect(statusCode).toEqual(409);
        expect(body).toEqual(expect.objectContaining({
            msg: expect.any(String)
        }));
    });

    test('DELETE Retorna un status 409 PRODUCT  tiene un CART asociado  - god', async () => {
        const token = await generateJWT({ role: 'god' });
        const product = await db.Product.findOne({where:{title: 'plantaCarnivora'}});
        const id = product.dataValues.id_product;
        const { body, statusCode } = await request(app).delete(`/api/v2/products/${id}`).auth(token, { type: 'bearer' });
        expect(statusCode).toEqual(409);
        expect(body).toEqual(expect.objectContaining({
            msg: expect.any(String)
        }));
    });

    test('DELETE Retorna un status 200 se borro el PRODUCT que no tiene ni CARRO ni PICTURE  - god', async () => {
        const token = await generateJWT({ role: 'god' });

        const picture = await db.Picture.findOne();
        const idP = picture.dataValues.id_picture;
        await request(app).delete(`/api/v2/pictures/${idP}`).auth(token, { type: 'bearer' });

        const picture2 = await db.Picture.findOne();
        const idP2 = picture2.dataValues.id_picture;
        await request(app).delete(`/api/v2/pictures/${idP2}`).auth(token, { type: 'bearer' });

        const user = await db.User.findOne({where:{email : "email2@email.com"}})
        const idUser = user.dataValues.id_user ;

        const dataCart ={}
        await request(app).put(`/api/v2/carts/${idUser}`).auth(token, { type: 'bearer' }).send(dataCart);

        const user2 = await db.User.findOne();
        const idUser2 = user2.dataValues.id_user;
        await request(app).delete(`/api/v2/users/${idUser2}`).auth(token, { type: 'bearer' });

        const user3 = await db.User.findOne();
        const idUser3 = user3.dataValues.id_user;
        await request(app).delete(`/api/v2/users/${idUser3}`).auth(token, { type: 'bearer' });

        const product = await db.Product.findOne({where: {title: 'Bizcochos'}});
        const id = product.dataValues.id_product;
        const { body, statusCode } =  await request(app).delete(`/api/v2/products/${id}`).auth(token, { type: 'bearer' });

        expect(statusCode).toEqual(200);
        expect(body).toEqual(expect.objectContaining({
            oldData: expect.objectContaining({
                id_product: expect.any(Number)
            })
        }));
    });

    test('DELETE Retorna un status 200 se borro el PRODUCT que no tiene ni CARRO ni PICTURE  - admin', async () => {
        const token = await generateJWT({ role: 'admin' });

        const product = await db.Product.findOne({where:{title: 'plantaCarnivora'}});
        const id = product.dataValues.id_product;
        const { body, statusCode } = await request(app).delete(`/api/v2/products/${id}`).auth(token, { type: 'bearer' });

        const category = await db.Category.findOne();

        const idCategory = category.dataValues.id_category;
        await request(app).delete(`/api/v2/categories/${idCategory}`).auth(token, {type: 'bearer'})

        const category2 = await db.Category.findOne();
        const idCategory2 = category2.dataValues.id_category;
        await request(app).delete(`/api/v2/categories/${idCategory2}`).auth(token, {type: 'bearer'})

        expect(statusCode).toEqual(200);
        expect(body).toEqual(expect.objectContaining({
            oldData:   expect.objectContaining({
                id_product: expect.any(Number)
            })
        }));
    });

    test('GET Retorna un status 400 y devuelve un mensaje Bad request (ROLE-GOD)', async () => {
        const token = await generateJWT({ role: 'god'});
        const { body, statusCode } = await request(app).get(`/api/v2/products/asnjfjsf/a`).auth(token, { type: 'bearer'});
        expect(statusCode).toEqual(400);
        expect(body).toEqual(expect.objectContaining({
            Mensaje: expect.any(String)
        }));
    });

    test('GET Retorna un status 400 y devuelve un mensaje Bad request (ROLE-ADMIN)', async () => {
        const token = await generateJWT({ role: 'admin'});
        const { body, statusCode } = await request(app).get(`/api/v2/products/asnjfjsf/a`).auth(token, { type: 'bearer'});
        expect(statusCode).toEqual(400);
        expect(body).toEqual(expect.objectContaining({
            Mensaje: expect.any(String)
        }));
    });

    test('GET Retorna un status 400 y devuelve un mensaje Bad request (ROLE-GUEST)', async () => {
        const token = await generateJWT({ role: 'guest'});
        const { body, statusCode } = await request(app).get(`/api/v2/products/asnjfjsf/a`).auth(token, { type: 'bearer'});
        expect(statusCode).toEqual(400);
        expect(body).toEqual(expect.objectContaining({
            Mensaje: expect.any(String)
        }));
    });

    test('PUT Retorna un status 400 y devuelve un mensaje Bad request (ROLE-GOD)', async () => {
        const token = await generateJWT({ role: 'god'});
        const { body, statusCode } = await request(app).put(`/api/v2/products/asnjfjsf/a`).auth(token, { type: 'bearer'});
        expect(statusCode).toEqual(400);
        expect(body).toEqual(expect.objectContaining({
            Mensaje: expect.any(String)
        }));
    });

    test('PUT Retorna un status 400 y devuelve un mensaje Bad request (ROLE-ADMIN)', async () => {
        const token = await generateJWT({ role: 'admin'});
        const { body, statusCode } = await request(app).put(`/api/v2/products/asnjfjsf/a`).auth(token, { type: 'bearer'});
        expect(statusCode).toEqual(400);
        expect(body).toEqual(expect.objectContaining({
            Mensaje: expect.any(String)
        }));
    });

    test('POST Retorna un status 400 y devuelve un mensaje Bad request (ROLE-GOD)', async () => {
        const token = await generateJWT({ role: 'god'});
        const { body, statusCode } = await request(app).post(`/api/v2/products/asnjfjsf/a`).auth(token, { type: 'bearer'});
        expect(statusCode).toEqual(400);
        expect(body).toEqual(expect.objectContaining({
            Mensaje: expect.any(String)
        }));
    });

    test('POST Retorna un status 400 y devuelve un mensaje Bad request (ROLE-ADMIN)', async () => {
        const token = await generateJWT({ role: 'admin'});
        const { body, statusCode } = await request(app).post(`/api/v2/products/asnjfjsf/a`).auth(token, { type: 'bearer'});
        expect(statusCode).toEqual(400);
        expect(body).toEqual(expect.objectContaining({
            Mensaje: expect.any(String)
        }));
    });

    test('DELETE Retorna un status 400 y devuelve un mensaje Bad request (ROLE-GOD)', async () => {
        const token = await generateJWT({ role: 'god'});
        const { body, statusCode } = await request(app).delete(`/api/v2/products/asnjfjsf/a`).auth(token, { type: 'bearer'});
        expect(statusCode).toEqual(400);
        expect(body).toEqual(expect.objectContaining({
            Mensaje: expect.any(String)
        }));
    });

    test('DELETE Retorna un status 400 y devuelve un mensaje Bad request (ROLE-ADMIN)', async () => {
        const token = await generateJWT({ role: 'admin'});
        const { body, statusCode } = await request(app).delete(`/api/v2/products/asnjfjsf/a`).auth(token, { type: 'bearer'});
        expect(statusCode).toEqual(400);
        expect(body).toEqual(expect.objectContaining({
            Mensaje: expect.any(String)
        }));
    });
 
});