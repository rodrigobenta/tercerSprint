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
            console.log(body)
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


});