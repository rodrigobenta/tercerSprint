const db = require('../database/models');
const request = require("supertest");
const { app } = require('../app');
const babel = require("../babel.config")

const generateJWT = require('../helpers/generateJWT');



describe('GET /api/v2/products', () => {



    //#region  ListProduct


    test('Trae un array de productos 200 - god', async () => {

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

    test('Trae un array de productos 200 - admin', async () => {

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

    test('Trae un array de productos 200 - guest', async () => {

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



    test('Retorna un status 404 y un msg de que  no hay productos en el sistema - guest', async () => {

        const token = await generateJWT({ role: 'guest' });



        const { body, statusCode } = await request(app).get('/api/v2/products').auth(token, { type: 'bearer' });
        expect(statusCode).toEqual(404);
        expect(body).toEqual(expect.objectContaining({


            msg: expect.any(String)


        }))
    });

    test('Retorna un status 404 y un msg de que  no hay productos en el sistema - admin', async () => {

        const token = await generateJWT({ role: 'admin' });



        const { body, statusCode } = await request(app).get('/api/v2/products').auth(token, { type: 'bearer' });
        expect(statusCode).toEqual(404);
        expect(body).toEqual(expect.objectContaining({


            msg: expect.any(String)


        }))
    });


    test('Retorna un status 404 y un msg de que  no hay productos en el sistema - god', async () => {

        const token = await generateJWT({ role: 'god' });



        const { body, statusCode } = await request(app).get('/api/v2/products').auth(token, { type: 'bearer' });
        expect(statusCode).toEqual(404);
        expect(body).toEqual(expect.objectContaining({


            msg: expect.any(String)


        }))
    });



    //#endregion




});



describe('GET /api/v2/products/:id', () => {

    //#region byID


    test('Retorna un status 404 en buscar producto por ID y un msg de que  no hay productos en el sistema - guest', async () => {

        const token = await generateJWT({ role: 'guest' });



        const { body, statusCode } = await request(app).get('/api/v2/products').auth(token, { type: 'bearer' });
        expect(statusCode).toEqual(404);
        expect(body).toEqual(expect.objectContaining({


            msg: expect.any(String)


        }))
    });


    test('Retorna un status 404 en buscar producto por ID y un msg de que  no hay productos en el sistema - admin', async () => {

        const token = await generateJWT({ role: 'admin' });



        const { body, statusCode } = await request(app).get('/api/v2/products').auth(token, { type: 'bearer' });
        expect(statusCode).toEqual(404);
        expect(body).toEqual(expect.objectContaining({


            msg: expect.any(String)


        }))
    });


    test('Retorna un status 404 en buscar producto por ID y un msg de que  no hay productos en el sistema - god', async () => {

        const token = await generateJWT({ role: 'god' });



        const { body, statusCode } = await request(app).get('/api/v2/products').auth(token, { type: 'bearer' });
        expect(statusCode).toEqual(404);
        expect(body).toEqual(expect.objectContaining({


            msg: expect.any(String)


        }))
    });




    test('productos por id - god', async () => {

        const token = await generateJWT({ role: 'god' });
        let id = 2;


        const { body, statusCode } = await request(app).get(`/api/v2/products/${id}`).auth(token, { type: 'bearer' });

        expect(statusCode).toEqual(200);
        expect(body).toEqual(expect.objectContaining({
            Producto:
                expect.objectContaining({
                    id_product: expect.any(Number)
                })

        }))
    });


    test('productos por id 200 - admin', async () => {

        const token = await generateJWT({ role: 'admin' });
        let id = 2;


        const { body, statusCode } = await request(app).get(`/api/v2/products/${id}`).auth(token, { type: 'bearer' });

        expect(statusCode).toEqual(200);
        expect(body).toEqual(expect.objectContaining({
            Producto:
                expect.objectContaining({
                    id_product: expect.any(Number)
                })

        }))
    });


    test('productos por id 200 - guest', async () => {

        const token = await generateJWT({ role: 'guest' });
        let id = 2;


        const { body, statusCode } = await request(app).get(`/api/v2/products/${id}`).auth(token, { type: 'bearer' });

        expect(statusCode).toEqual(200);
        expect(body).toEqual(expect.objectContaining({
            Producto:
                expect.objectContaining({
                    id_product: expect.any(Number)
                })

        }))
    });






    test('forzar un 404 con un id no valido - god', async () => {

        const token = await generateJWT({ role: 'god' });
        let id = 99;


        const { body, statusCode } = await request(app).get(`/api/v2/products/${id}`).auth(token, { type: 'bearer' });

        expect(statusCode).toEqual(404);
        expect(body).toEqual(expect.objectContaining({


            msg: expect.any(String)


        }))
    });


    test('forzar un 404 con un id no valido  - admin', async () => {

        const token = await generateJWT({ role: 'admin' });
        let id = 99;


        const { body, statusCode } = await request(app).get(`/api/v2/products/${id}`).auth(token, { type: 'bearer' });

        expect(statusCode).toEqual(404);
        expect(body).toEqual(expect.objectContaining({


            msg: expect.any(String)


        }))
    });


    test('forzar un 404 con un id no valido  - god', async () => {

        const token = await generateJWT({ role: 'god' });
        let id = 99;


        const { body, statusCode } = await request(app).get(`/api/v2/products/${id}`).auth(token, { type: 'bearer' });

        expect(statusCode).toEqual(404);
        expect(body).toEqual(expect.objectContaining({


            msg: expect.any(String)


        }))
    });





    //#endregion


});


describe('POST /api/v2/products/', () => {


    test("create  con GUEST = 401 no tiene permisos", async () => {

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



    test("create  con ADMIN = 201 ", async () => {

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
   
         expect(statusCode).toEqual(201);
         expect(body).toEqual(expect.objectContaining({
            newProduct : expect.objectContaining({
                id_product : expect.any(Number)
            })
         }));

    });


    test("create  con GOD = 201 ", async () => {

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
   
         expect(statusCode).toEqual(201);
         expect(body).toEqual(expect.objectContaining({
            newProduct : expect.objectContaining({
                id_product : expect.any(Number)
            })
         }));

    });

    test("create  con ADMIN devuelve un error por categoria repetida = 400 ", async () => {

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



    test("create  con GOD devuelve un error por categoria repetida = 400 ", async () => {

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




    test("create  con ADMIN devuelve un error por categoria repetida = 400 ", async () => {

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



    test("create  con GOD  (TITULO VACIO) = 400 ", async () => {

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

    test("create  con ADMIN  (TITULO VACIO) = 400 ", async () => {

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


    test("create  con ADMIN  (STOCK MENOR A 0)) = 400 ", async () => {

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

    test("create  con GOD  (STOCK MENOR A 0)) = 400 ", async () => {

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


    test("create  con ADMIN  (PRICE MENOR A 0)) = 400 ", async () => {

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

    test("create  con GOD  (PRICE MENOR A 0)) = 400 ", async () => {

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




    test("create  con ADMIN  (DESCRIPTION NO PUEDE SER VACIO) = 400 ", async () => {

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

    test("create  con GOD  (DESCRIPTION NO PUEDE SER VACIO) = 400 ", async () => {

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



    test("create  con ADMIN  (MOSTWANTED NO PUEDE SER NI 0 NI 1) = 400 ", async () => {

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

    test("create  con GOD  (MOSTWANTED NO PUEDE SER NI 0 NI 1) = 400 ", async () => {

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






    test("create  con ADMIN  (CATEGORY NO EXISTENTE) = 400 ", async () => {

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

    test("create  con GOD  (CATEGORY NO EXISTENTE)  = 400 ", async () => {

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

});


// ver despues
describe('PUT /api/v2/products/:idProduct', () => {


    test("PUT  con GUEST = 401 no tiene permisos ", async () => {

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


    test("PUT  con ADMIN devuelve un 200 - ADMIN", async () => {

        const token = await generateJWT({ role: 'admin' });

        const id = 12;

        const data = {
   
            "title": "Matess",
            "stock" : 10,
            "price" : 100,
            "description" : "Una descripcion",
            "mostwanted" : 0,
            "fk_id_category":1
         }
   
         const { body, statusCode } = await request(app).put(`/api/v2/products/${id}`).auth(token, { type: 'bearer' }).send(data);
   
         expect(statusCode).toEqual(200);
      
         expect(body).toEqual(expect.objectContaining({
            ProductoEditado:
                expect.objectContaining({
                    id_product: expect.any(Number)
                })

        }))

    });


    test("PUT  con GOD  devuelve un 200 - GOD", async () => {

        const token = await generateJWT({ role: 'god' });

        const id = 12;



        const data = {
   
            "title": "NoTEngoMatess",
            "stock" : 10,
            "price" : 100,
            "description" : "Una descripcion",
            "mostwanted" : 0,
            "fk_id_category":1
         }
   
         const { body, statusCode } = await request(app).put(`/api/v2/products/${id}`).send(data).auth(token, { type: 'bearer' });
   
         expect(statusCode).toEqual(200);
         expect(body).toEqual(expect.objectContaining({
            ProductoEditado:
                expect.objectContaining({
                    param: expect.any(String)
                })

        }))

    });


    test("PUT  con ADMIN NO puede ser title VACIO - ADMIN", async () => {

        const token = await generateJWT({ role: 'admin' });

        const id = 12;

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
        
                 errors:expect.objectContaining({ 

                 })
         

        }))

    });


    test("PUT  con ADMIN NO puede ser title VACIO - GOD", async () => {

        const token = await generateJWT({ role: 'god' });

        const id = 12;

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
        
                 errors:expect.objectContaining({ 

                 })
         

        }))

    });


    test("PUT  con ADMIN NO puede ser STOCK  < a 0 - ADMIN", async () => {

        const token = await generateJWT({ role: 'admin' });

        const id = 12;

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
        
                 errors:expect.objectContaining({ 

                 })
         

        }))

    });


    test("PUT  con ADMIN NO puede ser STOCK  < a 0 - GOD", async () => {

        const token = await generateJWT({ role: 'god' });

        const id = 12;

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
        
                 errors:expect.objectContaining({ 

                 })
         

        }))

    });

 

    test("PUT  con ADMIN NO puede ser PRICE  < a 0 - ADMIN", async () => {

        const token = await generateJWT({ role: 'admin' });
    
        const id = 12;
    
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
        
                 errors:expect.objectContaining({ 
    
                 })
         
    
        }))
    })
    
    
    
    
    test("PUT  con ADMIN NO puede ser PRICE  < a 0 - GOD", async () => {
    
        const token = await generateJWT({ role: 'god' });
    
        const id = 12;
    
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
        
                 errors:expect.objectContaining({ 
    
                 })
         
    
        }))
    
    });
    
    test("PUT  con ADMIN NO puede ser DESCRIPCION  NO PUEDE SER VACIA- admin", async () => {
    
        const token = await generateJWT({ role: 'admin' });
    
        const id = 12;
    
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
        
                 errors:expect.objectContaining({ 
    
                 })
         
    
        }))
    })
    
    
        test("PUT  con ADMIN NO puede ser DESCRIPCION  NO PUEDE SER VACIA- god", async () => {
    
            const token = await generateJWT({ role: 'god' });
        
            const id = 12;
        
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
            
                     errors:expect.objectContaining({ 
        
                     })
             
        
            }))
    
    });


    test("PUT  con ADMIN NO puede ser MOSTWANTED  tiene que ser 0 o 1 - ADMIN", async () => {

        const token = await generateJWT({ role: 'admin' });

        const id = 12;

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
        
                 errors:expect.objectContaining({ 

                 })
         

        }))

    });


    test("PUT  con ADMIN NO puede ser MOSTWANTED  tiene que ser 0 o 1 - GOD", async () => {

        const token = await generateJWT({ role: 'god' });

        const id = 12;

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
        
                 errors:expect.objectContaining({ 

                 })
         

        }))

    });


    
});









describe('GET /api/v2/products/mostwanted', () => {


    test('Retorna un status 404 en buscar producto por MOSTWANTED y un msg de que  no hay productos en el sistema  - guest', async () => {

        const token = await generateJWT({ role: 'guest' });



        const { body, statusCode } = await request(app).get('/api/v2/products/mostwanted').auth(token, { type: 'bearer' });
        expect(statusCode).toEqual(404);
        expect(body).toEqual(expect.objectContaining({


            msg: expect.any(String)


        }))
    });



    test('Retorna un status 404 en buscar producto por MOSTWANTED y un msg de que  no hay productos en el sistema  - admin', async () => {

        const token = await generateJWT({ role: 'admin' });



        const { body, statusCode } = await request(app).get('/api/v2/products/mostwanted').auth(token, { type: 'bearer' });
        expect(statusCode).toEqual(404);
        expect(body).toEqual(expect.objectContaining({


            msg: expect.any(String)


        }))
    });


    test('Retorna un status 404 en buscar producto por MOSTWANTED y un msg de que  no hay productos en el sistema  - god', async () => {

        const token = await generateJWT({ role: 'god' });



        const { body, statusCode } = await request(app).get('/api/v2/products/mostwanted').auth(token, { type: 'bearer' });
        expect(statusCode).toEqual(404);
        expect(body).toEqual(expect.objectContaining({


            msg: expect.any(String)


        }))
    });

    test('Retorna un status 200 y devuelve todos los productos que tengan  MOSTWANTED TRUE- GUEST', async () => {

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


    test('Retorna un status 200 y devuelve todos los productos que tengan MOSTWANTED  TRUE- ADMIN', async () => {

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


    test('Retorna un status 200 y devuelve todos los productos que tengan MOSTWANTED  TRUE- GOD', async () => {

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

});




describe('GET /api/v2/products/search', () => {



    test('Retorna un status 404 en buscar producto por KEYWORD  y un msg de que  no hay productos en el sistema  - guest', async () => {

        const token = await generateJWT({ role: 'guest' });

        const keyw ="pan";

        const { body, statusCode } = await request(app).get(`/api/v2/products/search?q=${keyw}`).auth(token, { type: 'bearer' });
        expect(statusCode).toEqual(404);
        expect(body).toEqual(expect.objectContaining({


            msg: expect.any(String)


        }))
    });



    test('Retorna un status 404 en buscar producto por KEYWORD  y un msg de que  no hay productos en el sistema  - admin', async () => {

        const token = await generateJWT({ role: 'admin' });

        const keyw ="pan";

        const { body, statusCode } = await request(app).get(`/api/v2/products/search?q=${keyw}`).auth(token, { type: 'bearer' });
        expect(statusCode).toEqual(404);
        expect(body).toEqual(expect.objectContaining({


            msg: expect.any(String)


        }))
    });


    test('Retorna un status 404 en buscar producto por KEYWORD y un msg de que  no hay productos en el sistema  - god', async () => {

        const token = await generateJWT({ role: 'god' });

        const keyw ="pan";


        const { body, statusCode } = await request(app).get(`/api/v2/products/search?q=${keyw}`).auth(token, { type: 'bearer' });
        expect(statusCode).toEqual(404);
        expect(body).toEqual(expect.objectContaining({


            msg: expect.any(String)


        }))
      
    });



    test('Retorna un status 200 en buscar producto por KEYWORD    - guest', async () => {

        const token = await generateJWT({ role: 'guest' });

        const keyw ="pan";

        const baseOld = await db.Product.findAll();
        console.log(baseOld)

        const { body, statusCode } = await (await request(app).get(`/api/v2/products/search?q=${keyw}`).auth(token, { type: 'bearer' }));
        expect(statusCode).toEqual(200);
        expect(body).toEqual(expect.objectContaining({
            Lista: expect.arrayContaining([
                expect.objectContaining({
                    id_product: expect.any(Number)
                })
            ])

        }))
    });


    test('Retorna un status 200 en buscar producto por KEYWORD    - god', async () => {

        const token = await generateJWT({ role: 'god' });

        const keyw ="pan";

        const baseOld = await db.Product.findAll();
        console.log(baseOld)

        const { body, statusCode } = await (await request(app).get(`/api/v2/products/search?q=${keyw}`).auth(token, { type: 'bearer' }));
        expect(statusCode).toEqual(200);
        expect(body).toEqual(expect.objectContaining({
            Lista: expect.arrayContaining([
                expect.objectContaining({
                    id_product: expect.any(Number)
                })
            ])

        }))
    });

    test('Retorna un status 200 en buscar producto por KEYWORD    - admin', async () => {

        const token = await generateJWT({ role: 'admin' });

        const keyw ="pan";

        const baseOld = await db.Product.findAll();
        console.log(baseOld)

        const { body, statusCode } = await (await request(app).get(`/api/v2/products/search?q=${keyw}`).auth(token, { type: 'bearer' }));
        expect(statusCode).toEqual(200);
        expect(body).toEqual(expect.objectContaining({
            Lista: expect.arrayContaining([
                expect.objectContaining({
                    id_product: expect.any(Number)
                })
            ])

        }))
    });




    test('Retorna un status 200 en buscar producto por KEYWORD    - guest', async () => {

        const token = await generateJWT({ role: 'guest' });

        const keyw ="pan";

        const baseOld = await db.Product.findAll();
        console.log(baseOld)

        const { body, statusCode } = await (await request(app).get(`/api/v2/products/search?q=${keyw}`).auth(token, { type: 'bearer' }));
        expect(statusCode).toEqual(200);
        expect(body).toEqual(expect.objectContaining({
            Lista: expect.arrayContaining([
                expect.objectContaining({
                    id_product: expect.any(Number)
                })
            ])

        }))
    });

});




describe('GET /api/v2/products/ CATEGORY', () => {


    test('Retorna un status 404 en buscar producto por CATEGORY  que es No existen productos o categoria especificada  - guest', async () => {

        const token = await generateJWT({ role: 'guest' });

        const keyw ="cat";

        const { body, statusCode } = await request(app).get(`/api/v2/products?category=${keyw}`).auth(token, { type: 'bearer' });
        expect(statusCode).toEqual(404);
        expect(body).toEqual(expect.objectContaining({


            msg: expect.any(String)


        }))
    });


    test('Retorna un status 404 en buscar producto por CATEGORY   que es No existen productos o categoria especificada- admin', async () => {

        const token = await generateJWT({ role: 'admin' });

        const keyw ="cat";

        const { body, statusCode } = await request(app).get(`/api/v2/products?category=${keyw}`).auth(token, { type: 'bearer' });
        expect(statusCode).toEqual(404);
        expect(body).toEqual(expect.objectContaining({


            msg: expect.any(String)


        }))
    });

    test('Retorna un status 404 en buscar producto por CATEGORY  que es No existen productos o categoria especificada  - god', async () => {

        const token = await generateJWT({ role: 'god' });

        const keyw ="cat";

        const { body, statusCode } = await request(app).get(`/api/v2/products?category=${keyw}`).auth(token, { type: 'bearer' });
        expect(statusCode).toEqual(404);
        expect(body).toEqual(expect.objectContaining({


            msg: expect.any(String)


        }))
    });


    test('Retorna un status 200 en buscar producto por CATEGORY    - guest', async () => {

        const token = await generateJWT({ role: 'guest' });

        const keyw ="frutas";

        const baseOld = await db.Product.findAll();
     

        const { body, statusCode } = await (await request(app).get(`/api/v2/products?category=${keyw}`).auth(token, { type: 'bearer' }));
        expect(statusCode).toEqual(200);
        expect(body).toEqual(expect.objectContaining({
            Productos: expect.arrayContaining([
                expect.objectContaining({
                    id_product: expect.any(Number)
                })
            ])

        }))
    });


    test('Retorna un status 200 en buscar producto por CATEGORY    - admin', async () => {

        const token = await generateJWT({ role: 'admin' });

        const keyw ="frutas";

        const baseOld = await db.Product.findAll();
     

        const { body, statusCode } = await (await request(app).get(`/api/v2/products?category=${keyw}`).auth(token, { type: 'bearer' }));
        expect(statusCode).toEqual(200);
        expect(body).toEqual(expect.objectContaining({
            Productos: expect.arrayContaining([
                expect.objectContaining({
                    id_product: expect.any(Number)
                })
            ])

        }))
    });


    test('Retorna un status 200 en buscar producto por CATEGORY    - god', async () => {

        const token = await generateJWT({ role: 'god' });

        const keyw ="frutas";

        const baseOld = await db.Product.findAll();
     

        const { body, statusCode } = await (await request(app).get(`/api/v2/products?category=${keyw}`).auth(token, { type: 'bearer' }));
        expect(statusCode).toEqual(200);
        expect(body).toEqual(expect.objectContaining({
            Productos: expect.arrayContaining([
                expect.objectContaining({
                    id_product: expect.any(Number)
                })
            ])

        }))
    });

})


describe('GET /api/v2/products/id/pictures PICTURES', () => {


    test('Retorna un status 404 en buscar producto por que no existe la PICTURE para ese producto   - guest', async () => {

        const token = await generateJWT({ role: 'guest' });

        const id =99;

        const { body, statusCode } = await request(app).get(`/api/v2/products/${id}/pictures`).auth(token, { type: 'bearer' });
        expect(statusCode).toEqual(404);
        expect(body).toEqual(expect.objectContaining({


            msg: expect.any(String)


        }))
    });


    test('Retorna un status 404 en buscar producto por que no existe la PICTURE para ese producto  - admin', async () => {

        const token = await generateJWT({ role: 'admin' });

        const id =99;

        const { body, statusCode } = await request(app).get(`/api/v2/products/${id}/pictures`).auth(token, { type: 'bearer' });
        expect(statusCode).toEqual(404);
        expect(body).toEqual(expect.objectContaining({


            msg: expect.any(String)


        }))
    });

    test('Retorna un status 404 en buscar producto por que no existe la PICTURE para ese producto  - GOD', async () => {

        const token = await generateJWT({ role: 'god' });

        const id =99;

        const { body, statusCode } = await request(app).get(`/api/v2/products/${id}/pictures`).auth(token, { type: 'bearer' });
        expect(statusCode).toEqual(404);
        expect(body).toEqual(expect.objectContaining({


            msg: expect.any(String)


        }))
    });



    test('Retorna un status 200 en buscar producto por que no existe la PICTURE para ese producto   - guest', async () => {

        const token = await generateJWT({ role: 'guest' });

        const id =12;

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


    test('Retorna un status 200 en buscar producto por que no existe la PICTURE para ese producto   - admin', async () => {

        const token = await generateJWT({ role: 'admin' });

        const id =12;

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


    test('Retorna un status 200 en buscar producto por que no existe la PICTURE para ese producto   - admin', async () => {

        const token = await generateJWT({ role: 'admin' });

        const id =12;

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

});



describe('DELETE /api/v2/products/id/ DELETE', () => {



    test('Retorna un status 401 NO tiene permisos  - guest', async () => {

        const token = await generateJWT({ role: 'guest' });

        const id =14;

        const { body, statusCode } = await request(app).delete(`/api/v2/products/${id}`).auth(token, { type: 'bearer' });
        expect(statusCode).toEqual(401);
        expect(body).toEqual(expect.objectContaining({


            msg: expect.any(String)


        }))
    });

    test('Retorna un status 200 se borro el PRODUCT que no tiene ni CARRO ni PICTURE  - admin', async () => {

        const token = await generateJWT({ role: 'admin' });

        const id =18;

        const { body, statusCode } = await request(app).delete(`/api/v2/products/${id}`).auth(token, { type: 'bearer' });
        expect(statusCode).toEqual(200);
        expect(body).toEqual(expect.objectContaining({
           
            oldData:   expect.objectContaining({
                   id_product: expect.any(Number)
               })
   

       }))
    });

    test('Retorna un status 200 se borro el PRODUCT que no tiene ni CARRO ni PICTURE  - god', async () => {

        const token = await generateJWT({ role: 'god' });

        const id =16;

        const { body, statusCode } = await request(app).delete(`/api/v2/products/${id}`).auth(token, { type: 'bearer' });
        expect(statusCode).toEqual(200);
        expect(body).toEqual(expect.objectContaining({
           
            oldData:   expect.objectContaining({
                    id_product: expect.any(Number)
                })
    

        }))
    });




    test('Retorna un status 404 PRODUCT no existe - admin', async () => {

        const token = await generateJWT({ role: 'admin' });

        const id =1;

        const { body, statusCode } = await request(app).delete(`/api/v2/products/${id}`).auth(token, { type: 'bearer' });
        expect(statusCode).toEqual(404);
        expect(body).toEqual(expect.objectContaining({
           
  
                   msg: expect.any(String)
   
   

       }))
    });


    test('Retorna un status 404 PRODUCT no existe - god', async () => {

        const token = await generateJWT({ role: 'god' });

        const id =1;

        const { body, statusCode } = await request(app).delete(`/api/v2/products/${id}`).auth(token, { type: 'bearer' });
        expect(statusCode).toEqual(404);
        expect(body).toEqual(expect.objectContaining({
           
  
                   msg: expect.any(String)
   
   

       }))
    });



    test('Retorna un status 409 PRODUCT  tiene una PICTURE asociado - admin', async () => {

        const token = await generateJWT({ role: 'admin' });

        const id =13;

        const { body, statusCode } = await request(app).delete(`/api/v2/products/${id}`).auth(token, { type: 'bearer' });
        expect(statusCode).toEqual(409);
        expect(body).toEqual(expect.objectContaining({
           
  
                   msg: expect.any(String)
   
   

       }))
    });


    test('Retorna un status 409 PRODUCT  tiene una PICTURE  asociada - god', async () => {

        const token = await generateJWT({ role: 'god' });

        const id =13;

        const { body, statusCode } = await request(app).delete(`/api/v2/products/${id}`).auth(token, { type: 'bearer' });
        expect(statusCode).toEqual(409);
        expect(body).toEqual(expect.objectContaining({
           
  
                   msg: expect.any(String)
   
   

       }))
    });



    test('Retorna un status 409 PRODUCT  tiene un CART asociado - admin', async () => {

        const token = await generateJWT({ role: 'admin' });

        const id =12;

        const { body, statusCode } = await request(app).delete(`/api/v2/products/${id}`).auth(token, { type: 'bearer' });
        expect(statusCode).toEqual(409);
        expect(body).toEqual(expect.objectContaining({
           
  
                   msg: expect.any(String)
   
   

       }))
    });


    test('Retorna un status 409 PRODUCT  tiene un CART asociado  - god', async () => {

        const token = await generateJWT({ role: 'god' });

        const id =12;

        const { body, statusCode } = await request(app).delete(`/api/v2/products/${id}`).auth(token, { type: 'bearer' });
        expect(statusCode).toEqual(409);
        expect(body).toEqual(expect.objectContaining({
           
  
                   msg: expect.any(String)
   
   

       }))
    });


});