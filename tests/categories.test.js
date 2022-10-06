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

    test('POST Retorna un status 201 y la categoria creada (ROLE-GOD)', async () => {
        const token = await generateJWT({ role: 'god'});

        const categoria = { "title": "jardineria" };
        
        const { body, statusCode } = await request(app).post(`/api/v2/categories`).auth(token, { type: 'bearer'}).send(categoria);

        const category = await db.Category.findOne({where: { title: 'jardineria'}});
        const idCategory = category.dataValues.id_category;
        const producto = { 
            "title": "mesa",
            "stock": 3, 
            "description": "mesa familiar", 
            "price": 1236, 
            "fk_id_category": `${idCategory}`, 
            "mostwanted": 0 
            }
        await request(app).post('/api/v2/products').auth(token, { type: 'bearer'}).send(producto) // creo un producto 
        expect(statusCode).toEqual(201);
        expect(body).toEqual(expect.objectContaining({
            newCategory: expect.objectContaining({
                id_category: expect.any(Number)
            })
        }));
    });

    test('POST Retorna un status 201 y la categoria creada (ROLE-GOD)', async () => {
        const token = await generateJWT({ role: 'god'});

        const categria = { "title": "pastas" };

        const { body, statusCode } = await request(app).post(`/api/v2/categories`).auth(token, { type: 'bearer'}).send(categria);
        expect(statusCode).toEqual(201);
        expect(body).toEqual(expect.objectContaining({
            newCategory: expect.objectContaining({
                id_category: expect.any(Number)
            })
        }));
    });

    test('POST Retorna un status 201 y la categoria creada (ROLE-ADMIN)', async () => {
        const token = await generateJWT({ role: 'admin'});

        const categria = { "title": "muebles" };
    
        const { body, statusCode } = await request(app).post(`/api/v2/categories`).auth(token, { type: 'bearer'}).send(categria);
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
        const data = {"title": "" };
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
        const data = { "title": ""};
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
        const token = await generateJWT({ role: 'god'});

        const categoria = await db.Category.findOne({where:{title: 'pastas'}});
        const id = categoria.dataValues.id_category;
        const data = { "title": "autos" };
        
        const { body, statusCode } = await request(app).put(`/api/v2/categories/${id}`).auth(token, { type: 'bearer'}).send(data);
        expect(statusCode).toEqual(200);
        expect(body).toEqual(expect.objectContaining({
            CategoryEdited: expect.objectContaining({
                title: expect.any(String)
            })
        }));
    });

    test('PUT Retorna un status 200 y la categoria editada (ROLE-ADMIN)', async () => {
        const primer = await db.Category.findOne({where:{title: 'muebles'}});
        const id = primer.dataValues.id_category;
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

    test('DELETE Retorna un status 409 y un mensaje de que no se puede eliminar porque tiene un producto asociado (ROLE-GOD)', async () => {
        const token = await generateJWT({ role: 'god'});

        const categoria = await db.Category.findOne({where: {title: 'jardineria'}});
        const id = categoria.dataValues.id_category;
        
        const { body, statusCode } = await request(app).delete(`/api/v2/categories/${id}`).auth(token, { type: 'bearer'});
        expect(statusCode).toEqual(409);
        expect(body).toEqual(expect.objectContaining({
            msg: expect.any(String)
        }));
    });

    test('DELETE Retorna un status 409 y un mensaje de que no se puede eliminar porque tiene un producto asociado (ROLE-ADMIN)', async () => {
        const token = await generateJWT({ role: 'admin'});

        const categoria = await db.Category.findOne({where: {title: 'jardineria'}});
        const id = categoria.dataValues.id_category;
        
        const { body, statusCode } = await request(app).delete(`/api/v2/categories/${id}`).auth(token, { type: 'bearer'});
        expect(statusCode).toEqual(409);
        expect(body).toEqual(expect.objectContaining({
            msg: expect.any(String)
        }));
    });

    test('DELETE Retorna un status 200 y la categoria eliminada (ROLE-GOD)', async () => {
        const token = await generateJWT({ role: 'god'});

        const primer = await db.Category.findOne();
        const id = primer.dataValues.id_category;

        const product = await db.Product.findOne();
        const idProduct = product.dataValues.id_product;
        await request(app).delete(`/api/v2/products/${idProduct}`).auth(token, { type: 'bearer'});

        const { body, statusCode } = await request(app).delete(`/api/v2/categories/${id}`).auth(token, { type: 'bearer'});
        expect(statusCode).toEqual(200);
        expect(body).toEqual(expect.objectContaining({
            CategoryDeleted: expect.objectContaining({
                title: expect.any(String)
            })
        }));
    });

    test('DELETE Retorna un status 200 y la categoria eliminada (ROLE-GOD)', async () => {
        const primer = await db.Category.findOne();
        const id = primer.dataValues.id_category;
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
 
}); 