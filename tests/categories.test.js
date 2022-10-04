const {app} = require("../app");
const request = require("supertest");
const db = require("../database/models");
const generateJWT = require("../helpers/generateJWT");

describe('GET /categories ', () => {

    test.skip('Retorna un status 404 y un mensaje de que no hay categorias en el sistema (ROLE-GOD)', async () => {
        const token = await generateJWT({ role: 'god'});
        const { body, statusCode } = await request(app).get('/api/v2/categories').auth(token, { type: 'bearer'});
        expect(statusCode).toEqual(404);
        expect(body).toEqual(expect.objectContaining({
            msg: expect.any(String)
        }));
    });

    test.skip('Retorna un status 404 y un mensaje de que no hay categorias en el sistema (ROLE-ADMIN)', async () => {
        const token = await generateJWT({ role: 'admin'});
        const { body, statusCode } = await request(app).get('/api/v2/categories').auth(token, { type: 'bearer'});
        expect(statusCode).toEqual(404);
        expect(body).toEqual(expect.objectContaining({
            msg: expect.any(String)
        }));
    });

    test.skip('Retorna un status 404 y un mensaje de que no hay categorias en el sistema (ROLE-guest)', async () => {
        const token = await generateJWT({ role: 'guest'});
        const { body, statusCode } = await request(app).get('/api/v2/categories').auth(token, { type: 'bearer'});
        expect(statusCode).toEqual(404);
        expect(body).toEqual(expect.objectContaining({
            msg: expect.any(String)
        }));
    });

    test('Retorna un status 200 y devuelve todas las categorias del sistema (ROLE-GOD)', async () => {
        const token = await generateJWT({ role: 'god'});
        const { body, statusCode } = await request(app).get('/api/v2/categories').auth(token, { type: 'bearer'});
        expect(statusCode).toEqual(200);
        expect(body).toEqual(expect.objectContaining({
            Categories: expect.arrayContaining([
                expect.objectContaining({
                    id_category: expect.any(Number)
                })
            ])
            })
        );
    });

    test('Retorna un status 200 y devuelve todas las categorias del sistema (ROLE-ADMIN)', async () => {
        const token = await generateJWT({ role: 'admin'});
        const { body, statusCode } = await request(app).get('/api/v2/categories').auth(token, { type: 'bearer'});
        expect(statusCode).toEqual(200);
        expect(body).toEqual(expect.objectContaining({
            Categories: expect.arrayContaining([
                expect.objectContaining({
                    id_category: expect.any(Number)
                })
            ])
            })
        );
    });

    test('Retorna un status 200 y devuelve todas las categorias del sistema (ROLE-GUEST)', async () => {
        const token = await generateJWT({ role: 'guest'});
        const { body, statusCode } = await request(app).get('/api/v2/categories').auth(token, { type: 'bearer'});
        expect(statusCode).toEqual(200);
        expect(body).toEqual(expect.objectContaining({
            Categories: expect.arrayContaining([
                expect.objectContaining({
                    id_category: expect.any(Number)
                })
            ])
            })
        );
    });

});

describe('GET /categories/:id', () => {

    test('Retorna un status 404 y un mensaje de que no existe la categoria (ROLE-GOD)', async () => {
        const id = 10; 
        const token = await generateJWT({ role: 'god'});
        const { body, statusCode } = await request(app).get(`/api/v2/categories/${id}`).auth(token, { type: 'bearer'});
        expect(statusCode).toEqual(404);
        expect(body).toEqual(expect.objectContaining({
            msg: expect.any(String)
        }));
    });

    test('Retorna un status 404 y un mensaje de que no existe la categoria (ROLE-ADMIN)', async () => {
        const id = 10; 
        const token = await generateJWT({ role: 'admin'});
        const { body, statusCode } = await request(app).get(`/api/v2/categories/${id}`).auth(token, { type: 'bearer'});
        expect(statusCode).toEqual(404);
        expect(body).toEqual(expect.objectContaining({
            msg: expect.any(String)
        }));
    });

    test('Retorna un status 404 y un mensaje de que no existe la categoria (ROLE-GUEST)', async () => {
        const id = 10; 
        const token = await generateJWT({ role: 'guest'});
        const { body, statusCode } = await request(app).get(`/api/v2/categories/${id}`).auth(token, { type: 'bearer'});
        expect(statusCode).toEqual(404);
        expect(body).toEqual(expect.objectContaining({
            msg: expect.any(String)
        }));
    });

    test('Retorna un status 200 y devuelve la categoria indicada por el id (ROLE-GOD)', async () => {
        const id = 1; 
        const token = await generateJWT({ role: 'god'});
        const { body, statusCode } = await request(app).get(`/api/v2/categories/${id}`).auth(token, { type: 'bearer'});
        expect(statusCode).toEqual(200);
        expect(body).toEqual(expect.objectContaining({
            Category: expect.objectContaining({
                    id_category: expect.any(Number)
                })
            })
        );
    });

    test('Retorna un status 200 y devuelve la categoria indicada por el id (ROLE-ADMIN)', async () => {
        const id = 1; 
        const token = await generateJWT({ role: 'god'});
        const { body, statusCode } = await request(app).get(`/api/v2/categories/${id}`).auth(token, { type: 'bearer'});
        expect(statusCode).toEqual(200);
        expect(body).toEqual(expect.objectContaining({
            Category: expect.objectContaining({
                    id_category: expect.any(Number)
                })
            })
        );
    });

    test('Retorna un status 200 y devuelve la categoria indicada por el id (ROLE-GUEST)', async () => {
        const id = 1; 
        const token = await generateJWT({ role: 'god'});
        const { body, statusCode } = await request(app).get(`/api/v2/categories/${id}`).auth(token, { type: 'bearer'});
        expect(statusCode).toEqual(200);
        expect(body).toEqual(expect.objectContaining({
            Category: expect.objectContaining({
                    id_category: expect.any(Number)
                })
            })
        );
    });
});

describe('POST /categories', () => {

    test.skip('Retorna un status 401 y un mensaje que no tienes permisos (ROLE-GUEST)', async () => {
        const data = { "title": "muebles" };
        const token = await generateJWT({ role: 'guest'});
        const { body, statusCode } = await request(app).post(`/api/v2/categories`).auth(token, { type: 'bearer'}).send(data);
        expect(statusCode).toEqual(401);
        expect(body).toEqual(expect.objectContaining({
            msg: expect.any(String)
        }));
    });

    test.skip('Retorna un status 400 y un mensaje que ya hay una categoria con ese titulo (ROLE-GOD)', async () => {
        const data = { "title": "muebles" };
        const token = await generateJWT({ role: 'god'});
        const { body, statusCode } = await request(app).post(`/api/v2/categories`).auth(token, { type: 'bearer'}).send(data);
        expect(statusCode).toEqual(400);
        expect(body).toEqual(expect.objectContaining({
            errors: expect.arrayContaining([
                expect.objectContaining({
                    msg: expect.any(String)
                })
            ])
        }));
    });

    test.skip('Retorna un status 400 y un mensaje que ya hay una categoria con ese titulo (ROLE-ADMIN)', async () => {
        const data = { "title": "muebles" };
        const token = await generateJWT({ role: 'admin'});
        const { body, statusCode } = await request(app).post(`/api/v2/categories`).auth(token, { type: 'bearer'}).send(data);
        expect(statusCode).toEqual(400);
        expect(body).toEqual(expect.objectContaining({
            errors: expect.arrayContaining([
                expect.objectContaining({
                    msg: expect.any(String)
                })
            ])
        }));
    });

    test.skip('Retorna un status 201 y la categoria creada (ROLE-GOD)', async () => {
        const data = { "title": "pastas" };
        const token = await generateJWT({ role: 'god'});
        const { body, statusCode } = await request(app).post(`/api/v2/categories`).auth(token, { type: 'bearer'}).send(data);
        expect(statusCode).toEqual(201);
        expect(body).toEqual(expect.objectContaining({
            newCategory: expect.objectContaining({
                id_category: expect.any(Number)
            })
        }));
    });

    test.skip('Retorna un status 201 y la categoria creada (ROLE-ADMIN)', async () => {
        const data = { "title": "pastas" };
        const token = await generateJWT({ role: 'god'});
        const { body, statusCode } = await request(app).post(`/api/v2/categories`).auth(token, { type: 'bearer'}).send(data);
        expect(statusCode).toEqual(201);
        expect(body).toEqual(expect.objectContaining({
            newCategory: expect.objectContaining({
                id_category: expect.any(Number)
            })
        }));
    });

});

describe('PUT /categories/:id', () => {

    test('Retorna un status 401 y un mensaje que no tienes permisos (ROLE-GUEST)', async () => {
        const id = 1;
        const data = { "title": "muebles" };
        const token = await generateJWT({ role: 'guest'});
        const { body, statusCode } = await request(app).put(`/api/v2/categories/${id}`).auth(token, { type: 'bearer'}).send(data);
        expect(statusCode).toEqual(401);
        expect(body).toEqual(expect.objectContaining({
            msg: expect.any(String)
        }));
    });

    test('Retorna un status 404 y un mensaje de que no existe la categoria indicada (ROLE-GOD)', async () => {
        const id = 10;
        const data = { "title": "muebles" };
        const token = await generateJWT({ role: 'god'});
        const { body, statusCode } = await request(app).put(`/api/v2/categories/${id}`).auth(token, { type: 'bearer'}).send(data);
        expect(statusCode).toEqual(404);
        expect(body).toEqual(expect.objectContaining({
            msg: expect.any(String)
        }));
    });

    test('Retorna un status 404 y un mensaje de que no existe la categoria indicada (ROLE-ADMIN)', async () => {
        const id = 10;
        const data = { "title": "muebles" };
        const token = await generateJWT({ role: 'admin'});
        const { body, statusCode } = await request(app).put(`/api/v2/categories/${id}`).auth(token, { type: 'bearer'}).send(data);
        expect(statusCode).toEqual(404);
        expect(body).toEqual(expect.objectContaining({
            msg: expect.any(String)
        }));
    });

    test.skip('Retorna un status 200 y la categoria editada (ROLE-GOD)', async () => {
        const id = 1;
        const data = { "title": "muebles" };
        const token = await generateJWT({ role: 'admin'});
        const { body, statusCode } = await request(app).put(`/api/v2/categories/${id}`).auth(token, { type: 'bearer'}).send(data);
        expect(statusCode).toEqual(200);
        expect(body).toEqual(expect.objectContaining({
            CategoryEdited: expect.objectContaining({
                title: expect.any(String)
            })
        }));
    });

    test.skip('Retorna un status 200 y la categoria editada (ROLE-ADMIN)', async () => {
        const id = 4;
        const data = { "title": "golosinas" };
        const token = await generateJWT({ role: 'admin'});
        const { body, statusCode } = await request(app).put(`/api/v2/categories/${id}`).auth(token, { type: 'bearer'}).send(data);
        expect(statusCode).toEqual(200);
        expect(body).toEqual(expect.objectContaining({
            CategoryEdited: expect.objectContaining({
                title: expect.any(String)
            })
        }));
    });
});

describe('DELETE /categories/:id', () => {

    test('Retorna un status 401 y un mensaje que no tienes permisos (ROLE-GUEST)', async () => {
        const id = 1;
        const data = { "title": "muebles" };
        const token = await generateJWT({ role: 'guest'});
        const { body, statusCode } = await request(app).put(`/api/v2/categories/${id}`).auth(token, { type: 'bearer'}).send(data);
        expect(statusCode).toEqual(401);
        expect(body).toEqual(expect.objectContaining({
            msg: expect.any(String)
        }));
    });

    test('Retorna un status 404 y un mensaje de que no existe la categoria indicada (ROLE-GOD)', async () => {
        const id = 10;
        const token = await generateJWT({ role: 'god'});
        const { body, statusCode } = await request(app).put(`/api/v2/categories/${id}`).auth(token, { type: 'bearer'});
        expect(statusCode).toEqual(404);
        expect(body).toEqual(expect.objectContaining({
            msg: expect.any(String)
        }));
    });

    test('Retorna un status 404 y un mensaje de que no existe la categoria indicada (ROLE-ADMIN)', async () => {
        const id = 10;
        const token = await generateJWT({ role: 'admin'});
        const { body, statusCode } = await request(app).put(`/api/v2/categories/${id}`).auth(token, { type: 'bearer'});
        expect(statusCode).toEqual(404);
        expect(body).toEqual(expect.objectContaining({
            msg: expect.any(String)
        }));
    });

    test('Retorna un status 409 y un mensaje de que no se puede eliminar porque tiene un producto asociado (ROLE-GOD)', async () => {
        const id = 1;
        const token = await generateJWT({ role: 'god'});
        const { body, statusCode } = await request(app).put(`/api/v2/categories/${id}`).auth(token, { type: 'bearer'});
        expect(statusCode).toEqual(409);
        expect(body).toEqual(expect.objectContaining({
            msg: expect.any(String)
        }));
    });

    test('Retorna un status 409 y un mensaje de que no se puede eliminar porque tiene un producto asociado (ROLE-ADMIN)', async () => {
        const id = 1;
        const token = await generateJWT({ role: 'admin'});
        const { body, statusCode } = await request(app).put(`/api/v2/categories/${id}`).auth(token, { type: 'bearer'});
        expect(statusCode).toEqual(409);
        expect(body).toEqual(expect.objectContaining({
            msg: expect.any(String)
        }));
    });

    test.skip('Retorna un status 200 y la categoria eliminada (ROLE-GOD)', async () => {
        const id = 1;
        const token = await generateJWT({ role: 'admin'});
        const { body, statusCode } = await request(app).put(`/api/v2/categories/${id}`).auth(token, { type: 'bearer'});
        expect(statusCode).toEqual(200);
        expect(body).toEqual(expect.objectContaining({
            CategoryDeleted: expect.objectContaining({
                title: expect.any(String)
            })
        }));
    });

    test.skip('Retorna un status 200 y la categoria eliminada (ROLE-ADMIN)', async () => {
        const id = 4;
        const token = await generateJWT({ role: 'admin'});
        const { body, statusCode } = await request(app).put(`/api/v2/categories/${id}`).auth(token, { type: 'bearer'});
        expect(statusCode).toEqual(200);
        expect(body).toEqual(expect.objectContaining({
            CategoryDeleted: expect.objectContaining({
                title: expect.any(String)
            })
        }));
    });
});