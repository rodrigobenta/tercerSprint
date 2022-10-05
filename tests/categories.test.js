const {app} = require("../app");
const request = require("supertest");
const generateJWT = require("../helpers/generateJWT");
const db = require("../database/models");


describe("Ciclo de testing automatizado", () => {

    test('GET Retorna un status 404 y un mensaje de que no hay categorias en el sistema (ROLE-GOD)', async () => {
        const token = await generateJWT({ role: 'god'});
        const { body, statusCode } = await request(app).get('/api/v2/categories').auth(token, { type: 'bearer'});
        expect(statusCode).toEqual(404);
        expect(body).toEqual(expect.objectContaining({
            msg: expect.any(String)
        }));
    });

    test('GET Retorna un status 404 y un mensaje de que no hay categorias en el sistema (ROLE-ADMIN)', async () => {
        const token = await generateJWT({ role: 'admin'});
        const { body, statusCode } = await request(app).get('/api/v2/categories').auth(token, { type: 'bearer'});
        expect(statusCode).toEqual(404);
        expect(body).toEqual(expect.objectContaining({
            msg: expect.any(String)
        }));
    });

    test('GET Retorna un status 404 y un mensaje de que no hay categorias en el sistema (ROLE-GUEST)', async () => {
        const token = await generateJWT({ role: 'guest'});
        const { body, statusCode } = await request(app).get('/api/v2/categories').auth(token, { type: 'bearer'});
        expect(statusCode).toEqual(404);
        expect(body).toEqual(expect.objectContaining({
            msg: expect.any(String)
        }));
    });

    test.skip('POST Retorna un status 201 y la categoria creada (ROLE-GOD)', async () => {
        const data = { "title": "jardineria" };
        const token = await generateJWT({ role: 'god'});
        const { body, statusCode } = await request(app).post(`/api/v2/categories`).auth(token, { type: 'bearer'}).send(data);
        expect(statusCode).toEqual(201);
        expect(body).toEqual(expect.objectContaining({
            newCategory: expect.objectContaining({
                id_category: expect.any(Number)
            })
        }));
    });

    test('POST Retorna un status 201 y la categoria creada (ROLE-GOD)', async () => {
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

    test('POST Retorna un status 201 y la categoria creada (ROLE-ADMIN)', async () => {
        const data = { "title": "muebles" };
        const token = await generateJWT({ role: 'admin'});
        const { body, statusCode } = await request(app).post(`/api/v2/categories`).auth(token, { type: 'bearer'}).send(data);
        expect(statusCode).toEqual(201);
        expect(body).toEqual(expect.objectContaining({
            newCategory: expect.objectContaining({
                id_category: expect.any(Number)
            })
        }));
    });

    test('GET Retorna un status 200 y devuelve todas las categorias del sistema (ROLE-GOD)', async () => {
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

    test('GET Retorna un status 200 y devuelve todas las categorias del sistema (ROLE-ADMIN)', async () => {
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

    test('GET Retorna un status 200 y devuelve todas las categorias del sistema (ROLE-GUEST)', async () => {
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

    test('PUT Retorna un status 401 y un mensaje que no tienes permisos (ROLE-GUEST)', async () => {
        const id = 1;
        const data = { "title": "muebles" };
        const token = await generateJWT({ role: 'guest'});
        const { body, statusCode } = await request(app).put(`/api/v2/categories/${id}`).auth(token, { type: 'bearer'}).send(data);
        expect(statusCode).toEqual(401);
        expect(body).toEqual(expect.objectContaining({
            msg: expect.any(String)
        }));
    });

    test('PUT Retorna un status 404 y un mensaje de que no existe la categoria indicada (ROLE-GOD)', async () => {
        const id = 13240;
        const data = { "title": "muebles" };
        const token = await generateJWT({ role: 'god'});
        const { body, statusCode } = await request(app).put(`/api/v2/categories/${id}`).auth(token, { type: 'bearer'}).send(data);
        expect(statusCode).toEqual(404);
        expect(body).toEqual(expect.objectContaining({
            msg: expect.any(String)
        }));
    });

    test('PUT Retorna un status 404 y un mensaje de que no existe la categoria indicada (ROLE-ADMIN)', async () => {
        const id = 12310;
        const data = { "title": "muebles" };
        const token = await generateJWT({ role: 'admin'});
        const { body, statusCode } = await request(app).put(`/api/v2/categories/${id}`).auth(token, { type: 'bearer'}).send(data);
        expect(statusCode).toEqual(404);
        expect(body).toEqual(expect.objectContaining({
            msg: expect.any(String)
        }));
    });

    test('PUT Retorna un status 400 y un mensaje que el titulo no puede ir vacio (ROLE-GOD)', async () => {
        const primer = await db.Category.findOne();
        const id = primer.dataValues.id_category + 1;
        const data = { };
        const token = await generateJWT({ role: 'god'});
        const { body, statusCode } = await request(app).put(`/api/v2/categories/${id}`).auth(token, { type: 'bearer'}).send(data);
        expect(statusCode).toEqual(400);
        expect(body).toEqual(expect.objectContaining({
            errors: expect.arrayContaining([
                expect.objectContaining({
                    msg: expect.any(String)
                })
            ])
        }));
    });

    test('PUT Retorna un status 400 y un mensaje que el titulo no puede ir vacio (ROLE-ADMIN)', async () => {
        const primer = await db.Category.findOne();
        const id = primer.dataValues.id_category + 1;
        const data = { };
        const token = await generateJWT({ role: 'admin'});
        const { body, statusCode } = await request(app).put(`/api/v2/categories/${id}`).auth(token, { type: 'bearer'}).send(data);
        expect(statusCode).toEqual(400);
        expect(body).toEqual(expect.objectContaining({
            errors: expect.arrayContaining([
                expect.objectContaining({
                    msg: expect.any(String)
                })
            ])
        }));
    });

    test('PUT Retorna un status 200 y la categoria editada (ROLE-GOD)', async () => {
        const primer = await db.Category.findOne();
        const id = primer.dataValues.id_category ;
        // comente porque es el skip de la categoria con el producto const id = primer.dataValues.id_category + 1;
        const data = { "title": "autos" };
        const token = await generateJWT({ role: 'god'});
        const { body, statusCode } = await request(app).put(`/api/v2/categories/${id}`).auth(token, { type: 'bearer'}).send(data);
        expect(statusCode).toEqual(200);
        expect(body).toEqual(expect.objectContaining({
            CategoryEdited: expect.objectContaining({
                title: expect.any(String)
            })
        }));
    });

    test('PUT Retorna un status 200 y la categoria editada (ROLE-ADMIN)', async () => {
        const primer = await db.Category.findOne();
        const id = primer.dataValues.id_category + 1;
        // comente porque es el skip de la categoria con el producto const id = primer.dataValues.id_category + 2;
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

    test('GET{id} Retorna un status 404 y un mensaje de que no existe la categoria (ROLE-GOD)', async () => {
        const id = 12350; 
        const token = await generateJWT({ role: 'god'});
        const { body, statusCode } = await request(app).get(`/api/v2/categories/${id}`).auth(token, { type: 'bearer'});
        expect(statusCode).toEqual(404);
        expect(body).toEqual(expect.objectContaining({
            msg: expect.any(String)
        }));
    });

    test('GET{id} Retorna un status 404 y un mensaje de que no existe la categoria (ROLE-ADMIN)', async () => {
        const id = 13250; 
        const token = await generateJWT({ role: 'admin'});
        const { body, statusCode } = await request(app).get(`/api/v2/categories/${id}`).auth(token, { type: 'bearer'});
        expect(statusCode).toEqual(404);
        expect(body).toEqual(expect.objectContaining({
            msg: expect.any(String)
        }));
    });

    test('GET{id} Retorna un status 404 y un mensaje de que no existe la categoria (ROLE-GUEST)', async () => {
        const id = 10435; 
        const token = await generateJWT({ role: 'guest'});
        const { body, statusCode } = await request(app).get(`/api/v2/categories/${id}`).auth(token, { type: 'bearer'});
        expect(statusCode).toEqual(404);
        expect(body).toEqual(expect.objectContaining({
            msg: expect.any(String)
        }));
    });

    test('GET{id} Retorna un status 200 y devuelve la categoria indicada por el id (ROLE-GOD)', async () => {
        const primer = await db.Category.findOne();
        const id = primer.dataValues.id_category;
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

    test('GET{id} Retorna un status 200 y devuelve la categoria indicada por el id (ROLE-ADMIN)', async () => {
        const primer = await db.Category.findOne();
        const id = primer.dataValues.id_category + 1;
        const token = await generateJWT({ role: 'admin'});
        const { body, statusCode } = await request(app).get(`/api/v2/categories/${id}`).auth(token, { type: 'bearer'});
        expect(statusCode).toEqual(200);
        expect(body).toEqual(expect.objectContaining({
            Category: expect.objectContaining({
                    id_category: expect.any(Number)
                })
            })
        );
    });

    test('GET{id} Retorna un status 200 y devuelve la categoria indicada por el id (ROLE-GUEST)', async () => {
        const primer = await db.Category.findOne();
        const id = primer.dataValues.id_category;
        const token = await generateJWT({ role: 'guest'});
        const { body, statusCode } = await request(app).get(`/api/v2/categories/${id}`).auth(token, { type: 'bearer'});
        expect(statusCode).toEqual(200);
        expect(body).toEqual(expect.objectContaining({
            Category: expect.objectContaining({
                    id_category: expect.any(Number)
                })
            })
        );
    });

    test('POST Retorna un status 401 y un mensaje que no tienes permisos (ROLE-GUEST)', async () => {
        const data = { "title": "muebles" };
        const token = await generateJWT({ role: 'guest'});
        const { body, statusCode } = await request(app).post(`/api/v2/categories`).auth(token, { type: 'bearer'}).send(data);
        expect(statusCode).toEqual(401);
        expect(body).toEqual(expect.objectContaining({
            msg: expect.any(String)
        }));
    });

    test('POST Retorna un status 400 y un mensaje que ya hay una categoria con ese titulo (ROLE-GOD)', async () => {
        const data = { "title": "autos" };
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

    test('POST Retorna un status 400 y un mensaje que ya hay una categoria con ese titulo (ROLE-ADMIN)', async () => {
        const data = { "title": "golosinas" };
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

    test('POST Retorna un status 400 y un mensaje que el titulo no puede ir vacio (ROLE-GOD)', async () => {
        const data = { };
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

    test('POST Retorna un status 400 y un mensaje que el titulo no puede ir vacio (ROLE-ADMIN)', async () => {
        const data = { };
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

    test('DELETE Retorna un status 401 y un mensaje que no tienes permisos (ROLE-GUEST)', async () => {
        const id = 1;
        const data = { "title": "golosinas" };
        const token = await generateJWT({ role: 'guest'});
        const { body, statusCode } = await request(app).delete(`/api/v2/categories/${id}`).auth(token, { type: 'bearer'}).send(data);
        expect(statusCode).toEqual(401);
        expect(body).toEqual(expect.objectContaining({
            msg: expect.any(String)
        }));
    });

    test('DELETE Retorna un status 404 y un mensaje de que no existe la categoria indicada (ROLE-GOD)', async () => {
        const id = 1342340;
        const token = await generateJWT({ role: 'god'});
        const { body, statusCode } = await request(app).delete(`/api/v2/categories/${id}`).auth(token, { type: 'bearer'});
        expect(statusCode).toEqual(404);
        expect(body).toEqual(expect.objectContaining({
            msg: expect.any(String)
        }));
    });

    test('DELETE Retorna un status 404 y un mensaje de que no existe la categoria indicada (ROLE-ADMIN)', async () => {
        const id = 1234230;
        const token = await generateJWT({ role: 'admin'});
        const { body, statusCode } = await request(app).delete(`/api/v2/categories/${id}`).auth(token, { type: 'bearer'});
        expect(statusCode).toEqual(404);
        expect(body).toEqual(expect.objectContaining({
            msg: expect.any(String)
        }));
    });

    test.skip('DELETE Retorna un status 404 y un mensaje de que no se puede eliminar porque tiene un producto asociado (ROLE-GOD)', async () => {
        const id = 1;
        const token = await generateJWT({ role: 'god'});
        const { body, statusCode } = await request(app).delete(`/api/v2/categories/${id}`).auth(token, { type: 'bearer'});
        expect(statusCode).toEqual(404);
        expect(body).toEqual(expect.objectContaining({
            msg: expect.any(String)
        }));
    });

    test.skip('DELETE Retorna un status 404 y un mensaje de que no se puede eliminar porque tiene un producto asociado (ROLE-ADMIN)', async () => {
        const id = 1;
        const token = await generateJWT({ role: 'admin'});
        const { body, statusCode } = await request(app).delete(`/api/v2/categories/${id}`).auth(token, { type: 'bearer'});
        expect(statusCode).toEqual(404);
        expect(body).toEqual(expect.objectContaining({
            msg: expect.any(String)
        }));
    });

    test('DELETE Retorna un status 200 y la categoria eliminada (ROLE-GOD)', async () => {
        const primer = await db.Category.findOne();
        const id = primer.dataValues.id_category ;
        //comente porque es el skip de la categoria con el producto const id = primer.dataValues.id_category + 1;
        const token = await generateJWT({ role: 'god'});
        const { body, statusCode } = await request(app).delete(`/api/v2/categories/${id}`).auth(token, { type: 'bearer'});
        expect(statusCode).toEqual(200);
        expect(body).toEqual(expect.objectContaining({
            CategoryDeleted: expect.objectContaining({
                title: expect.any(String)
            })
        }));
    });

    test('DELETE Retorna un status 200 y la categoria eliminada (ROLE-ADMIN)', async () => {
        const primer = await db.Category.findOne();
        const id = primer.dataValues.id_category;
        //comente porque es el skip de la categoria con el producto const id = primer.dataValues.id_category + 1;
        const token = await generateJWT({ role: 'admin'});
        const { body, statusCode } = await request(app).delete(`/api/v2/categories/${id}`).auth(token, { type: 'bearer'});
        expect(statusCode).toEqual(200);
        expect(body).toEqual(expect.objectContaining({
            CategoryDeleted: expect.objectContaining({
                title: expect.any(String)
            })
        }));
    });

    test('GET Retorna un status 400 y devuelve un mensaje Bad request (ROLE-GOD)', async () => {
        const token = await generateJWT({ role: 'god'});
        const { body, statusCode } = await request(app).get(`/api/v2/categories/asnjfjsf/a`).auth(token, { type: 'bearer'});
        expect(statusCode).toEqual(400);
        expect(body).toEqual(expect.objectContaining({
            Mensaje: expect.any(String)
        }));
    });

    test('GET Retorna un status 400 y devuelve un mensaje Bad request (ROLE-ADMIN)', async () => {
        const token = await generateJWT({ role: 'admin'});
        const { body, statusCode } = await request(app).get(`/api/v2/categories/asnjfjsf/a`).auth(token, { type: 'bearer'});
        expect(statusCode).toEqual(400);
        expect(body).toEqual(expect.objectContaining({
            Mensaje: expect.any(String)
        }));
    });

    test('GET Retorna un status 400 y devuelve un mensaje Bad request (ROLE-GUEST)', async () => {
        const token = await generateJWT({ role: 'guest'});
        const { body, statusCode } = await request(app).get(`/api/v2/categories/asnjfjsf/a`).auth(token, { type: 'bearer'});
        expect(statusCode).toEqual(400);
        expect(body).toEqual(expect.objectContaining({
            Mensaje: expect.any(String)
        }));
    });

    test('PUT Retorna un status 400 y devuelve un mensaje Bad request (ROLE-GOD)', async () => {
        const token = await generateJWT({ role: 'god'});
        const { body, statusCode } = await request(app).put(`/api/v2/categories/asnjfjsf/a`).auth(token, { type: 'bearer'});
        expect(statusCode).toEqual(400);
        expect(body).toEqual(expect.objectContaining({
            Mensaje: expect.any(String)
        }));
    });

    test('PUT Retorna un status 400 y devuelve un mensaje Bad request (ROLE-ADMIN)', async () => {
        const token = await generateJWT({ role: 'admin'});
        const { body, statusCode } = await request(app).put(`/api/v2/categories/asnjfjsf/a`).auth(token, { type: 'bearer'});
        expect(statusCode).toEqual(400);
        expect(body).toEqual(expect.objectContaining({
            Mensaje: expect.any(String)
        }));
    });

    test('POST Retorna un status 400 y devuelve un mensaje Bad request (ROLE-GOD)', async () => {
        const token = await generateJWT({ role: 'god'});
        const { body, statusCode } = await request(app).post(`/api/v2/categories/asnjfjsf/a`).auth(token, { type: 'bearer'});
        expect(statusCode).toEqual(400);
        expect(body).toEqual(expect.objectContaining({
            Mensaje: expect.any(String)
        }));
    });

    test('POST Retorna un status 400 y devuelve un mensaje Bad request (ROLE-ADMIN)', async () => {
        const token = await generateJWT({ role: 'admin'});
        const { body, statusCode } = await request(app).post(`/api/v2/categories/asnjfjsf/a`).auth(token, { type: 'bearer'});
        expect(statusCode).toEqual(400);
        expect(body).toEqual(expect.objectContaining({
            Mensaje: expect.any(String)
        }));
    });

    test('DELETE Retorna un status 400 y devuelve un mensaje Bad request (ROLE-GOD)', async () => {
        const token = await generateJWT({ role: 'god'});
        const { body, statusCode } = await request(app).delete(`/api/v2/categories/asnjfjsf/a`).auth(token, { type: 'bearer'});
        expect(statusCode).toEqual(400);
        expect(body).toEqual(expect.objectContaining({
            Mensaje: expect.any(String)
        }));
    });

    test('DELETE Retorna un status 400 y devuelve un mensaje Bad request (ROLE-ADMIN)', async () => {
        const token = await generateJWT({ role: 'admin'});
        const { body, statusCode } = await request(app).delete(`/api/v2/categories/asnjfjsf/a`).auth(token, { type: 'bearer'});
        expect(statusCode).toEqual(400);
        expect(body).toEqual(expect.objectContaining({
            Mensaje: expect.any(String)
        }));
    });

    describe('Testeando con la DB apagada', () =>{
        
        beforeAll(() => {
            db.sequelize.close();
        });

        test('GET Retorna un status 500 y devuelve un mensaje Server error (ROLE-GOD)', async () => {
            const token = await generateJWT({ role: 'god'});
            const { body, statusCode } = await request(app).get('/api/v2/categories').auth(token, { type: 'bearer'});
            expect(statusCode).toEqual(500);
            expect(body).toEqual(expect.objectContaining({
                msg: expect.any(String)
            }));
        });
    
        test('GET Retorna un status 500 y devuelve un mensaje Server error (ROLE-GUEST)', async () => {
            const token = await generateJWT({ role: 'guest'});
            const { body, statusCode } = await request(app).get('/api/v2/categories').auth(token, { type: 'bearer'});
            expect(statusCode).toEqual(500);
            expect(body).toEqual(expect.objectContaining({
                msg: expect.any(String)
            }));
        });
    
        test('GET Retorna un status 500 y devuelve un mensaje Server error (ROLE-ADMIN)', async () => {
            const token = await generateJWT({ role: 'admin'});
            const { body, statusCode } = await request(app).get('/api/v2/categories').auth(token, { type: 'bearer'});
            expect(statusCode).toEqual(500);
            expect(body).toEqual(expect.objectContaining({
                msg: expect.any(String)
            }));
        });
    
        test('GET{id} Retorna un status 500 y devuelve un mensaje Server error (ROLE-GUEST)', async () => {
            const id = 3;
            const token = await generateJWT({ role: 'guest'});
            const { body, statusCode } = await request(app).get(`/api/v2/categories/${id}`).auth(token, { type: 'bearer'});
            expect(statusCode).toEqual(500);
            expect(body).toEqual(expect.objectContaining({
                msg: expect.any(String)
            }));
        });
    
        test('GET{id} Retorna un status 500 y devuelve un mensaje Server error (ROLE-ADMIN)', async () => {
            const id = 3;
            const token = await generateJWT({ role: 'admin'});
            const { body, statusCode } = await request(app).get(`/api/v2/categories/${id}`).auth(token, { type: 'bearer'});
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
    
        test('PUT Retorna un status 500 y devuelve un mensaje Server error (ROLE-ADMIN)', async () => {
            const id = 5;
            const data = { "title": "muebles" };
            const token = await generateJWT({ role: 'admin'});
            const { body, statusCode } = await request(app).put(`/api/v2/categories/${id}`).auth(token, { type: 'bearer'}).send(data);
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
    
        test('DELETE Retorna un status 500 y devuelve un mensaje Server error (ROLE-ADMIN)', async () => {
            const id = 5;
            const token = await generateJWT({ role: 'admin'});
            const { body, statusCode } = await request(app).delete(`/api/v2/categories/${id}`).auth(token, { type: 'bearer'});
            expect(statusCode).toEqual(500);
            expect(body).toEqual(expect.objectContaining({
                msg: expect.any(String)
            }));
        });
    
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

}); 