const {app} = require("../app");
const request = require("supertest");
const db = require("../database/models/index");
const generateJWT = require("../helpers/generateJWT");


/* describe("POST /pictures", () => {
    describe("Usuarios con rol GOD", () => {
        test.skip("devuelve una foto creada y un status 201", async() => {
            const token = await generateJWT({role: "god"})
            const data = {
                "url": "panDuro3.com",
                "description": "foto de un pan duro",
                "fk_id_product": 3
                };
            const originalDB = await db.Picture.findAll();
            const {statusCode, body} = await request(app).post("/api/v2/pictures").send(data).auth(token, {type: "bearer"});
            const newDB = await db.Picture.findAll(); 
            expect(originalDB.length+1).toBe(newDB.length);
            expect(statusCode).toBe(201);
            expect(body).toEqual(expect.objectContaining({
                picture: expect.any(Object)
            }))
        })
        test.skip("La foto a crear debe tener URL", async() => {
            const token = await generateJWT({role: "god"})
            const data = {
                "description": "foto de un pan duro podrido",
                "fk_id_product": 3
            };
            const {statusCode, body} = await request(app).post("/api/v2/pictures").send(data).auth(token, {type: "bearer"});
            expect(statusCode).toBe(400);
            //console.log(body);
            expect(body).toEqual(expect.objectContaining({
                errors: expect.any(Array)
            }))
        })
        test.skip("La foto a crear debe tener un producto a asociar", async() => {
            const token = await generateJWT({role: "god"})
            const data = {
                "url": "panDuro4.com",
                "description": "foto de un pan duro podrido"
            };
            const {statusCode, body} = await request(app).post("/api/v2/pictures").send(data).auth(token, {type: "bearer"});
            expect(statusCode).toBe(400);
            //console.log(body);
            expect(body).toEqual(expect.objectContaining({
                errors: expect.any(Array)
            }))
        })
        test("Debe de existir el Id de producto pasado en el body", async() => {
            const token = await generateJWT({role: "god"})
            const data = {
                "url": "panDuro7.com",
                "description": "foto de un pan duro podrido",
                "fk_id_product": 9
            };
            const {statusCode, body} = await request(app).post("/api/v2/pictures").send(data).auth(token, {type: "bearer"});
            //console.log(body);
            expect(statusCode).toBe(400)
            expect(body).toEqual(expect.objectContaining({
                errors: expect.arrayContaining([
                    expect.objectContaining({
                        msg: expect.stringContaining(`el producto con id ${data.fk_id_product} no existe`)
                    })
                ])
            }))
        })
        test.skip("Las URL no pueden repetirse", async() => {
            const token = await generateJWT({role: "god"});
            const data = {
                "url": "panDuro3.com",
                "description": "foto de un pan duro",
                "fk_id_product": 3
                };
            const url = data.url
            const {statusCode, body} = await request(app).post("/api/v2/pictures").send(data).auth(token, {type: "bearer"});
            expect(statusCode).toBe(400);
            expect(body).toEqual(expect.objectContaining({
                errors: expect.arrayContaining([
                    expect.objectContaining({
                        msg: expect.stringContaining(`la url ${url} ya se encuentra en uso`)
                    })
                ])
            }))
        })
    })
    describe("Usuarios con rol ADMIN", () => {
        test.skip("devuelve una foto creada y un status 201", async() => {
            const token = await generateJWT({role: "admin"})
            const data = {
                "url": "panDuro4.com",
                "description": "foto de un pan duro",
                "fk_id_product": 3
                };
            const originalDB = await db.Picture.findAll();
            const {statusCode, body} = await request(app).post("/api/v2/pictures").send(data).auth(token, {type: "bearer"});
            const newDB = await db.Picture.findAll(); 
            expect(originalDB.length+1).toBe(newDB.length);
            expect(statusCode).toBe(201);
            expect(body).toEqual(expect.objectContaining({
                picture: expect.any(Object)
            }))
        })
        test.skip("La foto a crear debe tener todos los campos requeridos", async() => {
            const token = await generateJWT({role: "admin"})
            const data = {
                "url": "panDuro3.com",
                "description": "foto de un pan duro podrido",
            };
            const {statusCode, body} = await request(app).post("/api/v2/pictures").send(data).auth(token, {type: "bearer"});
            expect(statusCode).toBe(400);
            //console.log(body);
            expect(body).toEqual(expect.objectContaining({
                errors: expect.any(Array)
            }))
        })
        test("Debe de existir el Id de producto pasado en el body", async() => {
            const token = await generateJWT({role: "admin"})
            const data = {
                "url": "panDuro7.com",
                "description": "foto de un pan duro podrido",
                "fk_id_product": 9
            };
            const id = data.fk_id_product;
            const {statusCode, body} = await request(app).post("/api/v2/pictures").send(data).auth(token, {type: "bearer"});
            //console.log(body);
            expect(statusCode).toBe(400)
            expect(body).toEqual(expect.objectContaining({
                errors: expect.arrayContaining([
                    expect.objectContaining({
                        msg: expect.stringContaining(`el producto con id ${id} no existe`)
                    })
                ])
            }))
        })
        test.skip("Las URL no pueden repetirse", async() => {
            const token = await generateJWT({role: "admin"});
            const data = {
                "url": "panDuro3.com",
                "description": "foto de un pan duro",
                "fk_id_product": 3
                };
            const url = data.url
            const {statusCode, body} = await request(app).post("/api/v2/pictures").send(data).auth(token, {type: "bearer"});
            expect(statusCode).toBe(400);
            expect(body).toEqual(expect.objectContaining({
                errors: expect.arrayContaining([
                    expect.objectContaining({
                        msg: expect.stringContaining(`la url ${url} ya se encuentra en uso`)
                    })
                ])
            }))
        })
    })
    describe("Usuarios con rol GUEST", () => {
        test("el usuario guest no puede crear fotos", async() => {
            const token = await generateJWT({role: "guest"});
            const {statusCode} = await request(app).post("/api/v2/pictures").send().auth(token, {type: "bearer"});
            expect(statusCode).toBe(401)
        })
    })
})

describe("GET /pictures", () => {
    describe("GET pictures de un producto, pasado su ID por query", () => {
        describe("Usuarios con rol GOD", () => {
            test("Lista todas las fotos de un producto, pasado su ID por query, devuelve un status 200 y las fotos", async() => {
                const token = await generateJWT({role: "god"});
                const idProducto = 2;
                const {body,statusCode} = await request(app).get(`/api/v2/pictures?product=${idProducto}`).auth(token, {type: "bearer"});
                expect(statusCode).toBe(200)
                expect(body).toEqual(expect.objectContaining({
                    pictures: expect.any(Array)
                }))
            })
            test("Si el ID pasado por query no existe o es diferente a un numero, debe dar status 404 y un mensaje ", async() => {
                const token = await generateJWT({role: "god"});
                const idProducto = 9;
                const {statusCode, body} = await request(app).get(`/api/v2/pictures?product=${idProducto}`).auth(token, {type: "bearer"});
                expect(statusCode).toBe(404)
                expect(body).toEqual(expect.objectContaining({
                    msg: expect.stringContaining("No existe el producto indicado o no hay fotos")
                }))
            })
            test("Si la key del query no es 'product', debe de devolver un status 500 server error", async() => {
                const token = await generateJWT({role: "god"});
                const key = "cualquierCosa"
                const {statusCode, body} = await request(app).get(`/api/v2/pictures?${key}=3`).auth(token, {type: "bearer"});
                expect(body).toEqual(expect.objectContaining({
                    msg: expect.stringContaining("Server error")
                }))
                expect(statusCode).toBe(500)
            })
            test("Si no hay fotos del producto, devuelve un status 404 y un mensaje", async() => {
                const token = await generateJWT({role: "god"});
                const idProducto = 4;
                const {statusCode, body} = await request(app).get(`/api/v2/pictures?product=${idProducto}`).auth(token, {type: "bearer"});
                expect(statusCode).toBe(404);
                expect(body).toEqual(expect.objectContaining({
                    msg: expect.stringContaining("No existe el producto indicado o no hay fotos")
                }))
            })
        })
        describe("Usuarios con rol ADMIN", () => {
            test("Lista todas las fotos de un producto, pasado su ID por query, devuelve un status 200 y las fotos", async() => {
                const token = await generateJWT({role: "admin"});
                const idProducto = 2;
                const {body,statusCode} = await request(app).get(`/api/v2/pictures?product=${idProducto}`).auth(token, {type: "bearer"});
                expect(statusCode).toBe(200)
                expect(body).toEqual(expect.objectContaining({
                    pictures: expect.any(Array)
                }))
            })
            test("Si el ID pasado por query no existe o es diferente a un numero, debe dar status 404 y un mensaje ", async() => {
                const token = await generateJWT({role: "admin"});
                const idProducto = "Idproducto";
                const {statusCode, body} = await request(app).get(`/api/v2/pictures?product=${idProducto}`).auth(token, {type: "bearer"});
                expect(statusCode).toBe(404)
                expect(body).toEqual(expect.objectContaining({
                    msg: expect.stringContaining("No existe el producto indicado o no hay fotos")
                }))
            })
            test("Si la key del query no es 'product', debe de devolver un status 500 server error", async() => {
                const token = await generateJWT({role: "admin"});
                const key = "cualquierCosa"
                const {statusCode, body} = await request(app).get(`/api/v2/pictures?${key}=3`).auth(token, {type: "bearer"});
                expect(body).toEqual(expect.objectContaining({
                    msg: expect.stringContaining("Server error")
                }))
                expect(statusCode).toBe(500)
            })
            test("Si no hay fotos del producto, devuelve un status 404 y un mensaje", async() => {
                const token = await generateJWT({role: "admin"});
                const idProducto = 4;
                const {statusCode, body} = await request(app).get(`/api/v2/pictures?product=${idProducto}`).auth(token, {type: "bearer"});
                expect(statusCode).toBe(404);
                expect(body).toEqual(expect.objectContaining({
                    msg: expect.stringContaining("No existe el producto indicado o no hay fotos")
                }))
            })
        })
        describe("Usuarios con rol GUEST", () => {
            test("Lista todas las fotos de un producto, pasado su ID por query, devuelve un codigo 200 y las fotos", async() => {
                const token = await generateJWT({role: "guest"});
                const idProducto = 2;
                const {body,statusCode} = await request(app).get(`/api/v2/pictures?product=${idProducto}`).auth(token, {type: "bearer"});
                expect(statusCode).toBe(200)
                expect(body).toEqual(expect.objectContaining({
                    pictures: expect.any(Array)
                }))
            })
            test("Si el ID pasado por query no existe o es diferente a un numero, debe dar error 404 y un mensaje ", async() => {
                const token = await generateJWT({role: "guest"});
                const idProducto = "Idproducto";
                const {statusCode, body} = await request(app).get(`/api/v2/pictures?product=${idProducto}`).auth(token, {type: "bearer"});
                expect(statusCode).toBe(404)
                expect(body).toEqual(expect.objectContaining({
                    msg: expect.stringContaining("No existe el producto indicado o no hay fotos")
                }))
            })
            test("Si la key del query no es 'product', debe de devolver un status 500 server error", async() => {
                const token = await generateJWT({role: "guest"});
                const key = "cualquierCosa"
                const {statusCode, body} = await request(app).get(`/api/v2/pictures?${key}=3`).auth(token, {type: "bearer"});
                expect(body).toEqual(expect.objectContaining({
                    msg: expect.stringContaining("Server error")
                }))
                expect(statusCode).toBe(500)
            })
            test("Si no hay fotos del producto, devuelve un status 404 y un mensaje", async() => {
                const token = await generateJWT({role: "guest"});
                const idProducto = 4;
                const {statusCode, body} = await request(app).get(`/api/v2/pictures?product=${idProducto}`).auth(token, {type: "bearer"});
                expect(statusCode).toBe(404);
                expect(body).toEqual(expect.objectContaining({
                    msg: expect.stringContaining("No existe el producto indicado o no hay fotos")
                }))
            })
        })
    })
    describe("GET pictures de un producto, pasado su ID por parametros", () => {
        describe("Usuarios con rol GOD", () => {
            test("Lista todas las fotos de un producto, pasado su ID por parametros, devuelve un codigo 200 y las fotos", async() => {
                const token = await generateJWT({role: "god"});
                const idProducto = 2;
                const {body,statusCode} = await request(app).get(`/api/v2/products/${idProducto}/pictures`).auth(token, {type: "bearer"});
                expect(statusCode).toBe(200)
                expect(body).toEqual(expect.objectContaining({
                    pictures: expect.any(Array)
                }))
            })
            test("Si el ID pasado por parametros no existe o es diferente a un numero, debe dar error 404 y un mensaje ", async() => {
                const token = await generateJWT({role: "god"});
                const idProducto = "cualquierCosa";
                const {statusCode, body} = await request(app).get(`/api/v2/products/${idProducto}/pictures`).auth(token, {type: "bearer"});
                expect(statusCode).toBe(404)
                expect(body).toEqual(expect.objectContaining({
                    msg: expect.stringContaining("No existe el producto indicado o no hay fotos")
                }))
            })
            test("Si no hay fotos del producto, devuelve un status 404 y un mensaje", async() => {
                const token = await generateJWT({role: "god"});
                const idProducto = 4;
                const {statusCode, body} = await request(app).get(`/api/v2/products/${idProducto}/pictures`).auth(token, {type: "bearer"});
                expect(statusCode).toBe(404);
                expect(body).toEqual(expect.objectContaining({
                    msg: expect.stringContaining("No existe el producto indicado o no hay fotos")
                }))
            })
        })
        describe("Usuarios con rol ADMIN", () => {
            test("Lista todas las fotos de un producto, pasado su ID por parametros, devuelve un codigo 200 y las fotos", async() => {
                const token = await generateJWT({role: "admin"});
                const idProducto = 2;
                const {body,statusCode} = await request(app).get(`/api/v2/products/${idProducto}/pictures`).auth(token, {type: "bearer"});
                expect(statusCode).toBe(200)
                expect(body).toEqual(expect.objectContaining({
                    pictures: expect.any(Array)
                }))
            })
            test("Si el ID pasado por parametros no existe o es diferente a un numero, debe dar error 404 y un mensaje ", async() => {
                const token = await generateJWT({role: "admin"});
                const idProducto = "cualquierCosa";
                const {statusCode, body} = await request(app).get(`/api/v2/products/${idProducto}/pictures`).auth(token, {type: "bearer"});
                expect(statusCode).toBe(404)
                expect(body).toEqual(expect.objectContaining({
                    msg: expect.stringContaining("No existe el producto indicado o no hay fotos")
                }))
            })
            test("Si no hay fotos del producto, devuelve un status 404 y un mensaje", async() => {
                const token = await generateJWT({role: "admin"});
                const idProducto = 4;
                const {statusCode, body} = await request(app).get(`/api/v2/products/${idProducto}/pictures`).auth(token, {type: "bearer"});
                expect(statusCode).toBe(404);
                expect(body).toEqual(expect.objectContaining({
                    msg: expect.stringContaining("No existe el producto indicado o no hay fotos")
                }))
            })
        })
        describe("Usuarios con rol GUEST", () => {
            test("Lista todas las fotos de un producto, pasado su ID por parametros, devuelve un codigo 200 y las fotos", async() => {
                const token = await generateJWT({role: "guest"});
                const idProducto = 2;
                const {body,statusCode} = await request(app).get(`/api/v2/products/${idProducto}/pictures`).auth(token, {type: "bearer"});
                expect(statusCode).toBe(200)
                expect(body).toEqual(expect.objectContaining({
                    pictures: expect.any(Array)
                }))
            })
            test("Si el ID pasado por parametros no existe o es diferente a un numero, debe dar error 404 y un mensaje ", async() => {
                const token = await generateJWT({role: "guest"});
                const idProducto = "cualquierCosa";
                const {statusCode, body} = await request(app).get(`/api/v2/products/${idProducto}/pictures`).auth(token, {type: "bearer"});
                expect(statusCode).toBe(404)
                expect(body).toEqual(expect.objectContaining({
                    msg: expect.stringContaining("No existe el producto indicado o no hay fotos")
                }))
            })
            test("Si no hay fotos del producto, devuelve un status 404 y un mensaje", async() => {
                const token = await generateJWT({role: "guest"});
                const idProducto = 4;
                const {statusCode, body} = await request(app).get(`/api/v2/products/${idProducto}/pictures`).auth(token, {type: "bearer"});
                expect(statusCode).toBe(404);
                expect(body).toEqual(expect.objectContaining({
                    msg: expect.stringContaining("No existe el producto indicado o no hay fotos")
                }))
            })
        })
    })
})

describe("GET /pictures/:id", () => {
    describe("Usuarios con rol GOD", ()=>{
        test("Lista la foto con el ID pasado por parametro. Devuelve un status 200 y la foto", async() => {
            const token = await generateJWT({role: "god"});
            const idPicture = 1;
            const {statusCode, body} = await request(app).get(`/api/v2/pictures/${idPicture}`).auth(token, {type: "bearer"})
            expect(statusCode).toBe(200);
            expect(body).toEqual(expect.objectContaining({
                picture: expect.any(Object)
            }))
        })
        test("Si el ID no es un numero, o no existe la foto con ese ID, debe devolver un status 404 y un mensaje", async() => {
            const token = await generateJWT({role: "god"});
            const idPicture = 20;
            const {statusCode, body} = await request(app).get(`/api/v2/pictures/${idPicture}`).auth(token, {type: "bearer"});
            expect(statusCode).toBe(404);
            expect(body).toEqual(expect.objectContaining({
                msg: expect.any(String)
            }))
        })
    })
    describe("Usuarios con rol ADMIN", ()=>{
        test("Lista la foto con el ID pasado por parametro. Devuelve un status 200 y la foto", async() => {
            const token = await generateJWT({role: "admin"});
            const idPicture = 1;
            const {statusCode, body} = await request(app).get(`/api/v2/pictures/${idPicture}`).auth(token, {type: "bearer"})
            expect(statusCode).toBe(200);
            expect(body).toEqual(expect.objectContaining({
                picture: expect.any(Object)
            }))
        })
        test("Si el ID no es un numero, o no existe la foto con ese ID, debe devolver un status 404 y un mensaje", async() => {
            const token = await generateJWT({role: "admin"});
            const idPicture = 20;
            const {statusCode, body} = await request(app).get(`/api/v2/pictures/${idPicture}`).auth(token, {type: "bearer"});
            expect(statusCode).toBe(404);
            expect(body).toEqual(expect.objectContaining({
                msg: expect.any(String)
            }))
        })
    })
    describe("Usuarios con rol GUEST", ()=>{
        test("Lista la foto con el ID pasado por parametro. Devuelve un status 200 y la foto", async() => {
            const token = await generateJWT({role: "guest"});
            const idPicture = 1;
            const {statusCode, body} = await request(app).get(`/api/v2/pictures/${idPicture}`).auth(token, {type: "bearer"})
            expect(statusCode).toBe(200);
            expect(body).toEqual(expect.objectContaining({
                picture: expect.any(Object)
            }))
        })
        test("Si el ID no es un numero, o no existe la foto con ese ID, debe devolver un status 404 y un mensaje", async() => {
            const token = await generateJWT({role: "guest"});
            const idPicture = 20;
            const {statusCode, body} = await request(app).get(`/api/v2/pictures/${idPicture}`).auth(token, {type: "bearer"});
            expect(statusCode).toBe(404);
            expect(body).toEqual(expect.objectContaining({
                msg: expect.any(String)
            }))
        })
    })
})

describe("PUT /pictures/:id", () => {
    describe("Usuarios con rol GOD", () => {
        test.skip("Edita la foto con la ID pasada por parametros. Devuelve un status 200 y la foto editada", async() => {
            const token = await generateJWT({role: "god"});
            const idPicture = 3;
            const data = {
                "url": "panDuroEditado2.com"
            }
            const {statusCode, body} = await request(app).put(`/api/v2/pictures/${idPicture}`).auth(token, {type: "bearer"}).send(data);
            expect(statusCode).toBe(200)
            expect(body).toEqual(expect.objectContaining({
                foto_anterior: expect.any(Object),
                foto_editada: expect.any(Object)
            }))
        })
        test("Si se quiere editar una foto y poner una URL que ya esta en la base de datos, devuelve un status 400 y un mensaje", async() => {
            const token = await generateJWT({role: "god"});
            const idPicture = 3;
            const data = {
                "url": "panDuro2.com"
            }
            const {statusCode, body} = await request(app).put(`/api/v2/pictures/${idPicture}`).auth(token, {type: "bearer"}).send(data);
            expect(statusCode).toBe(400)
            expect(body).toEqual(expect.objectContaining({
                errors: expect.any(Array)
            }))
        })
        test("Si se quiere editar una foto y poner una URL vacia, devuelve un status 400 y un mensaje", async() => {
            const token = await generateJWT({role: "god"});
            const idPicture = 3;
            const data = {
                "url": "",
                "description": "nada"
            }
            const {statusCode, body} = await request(app).put(`/api/v2/pictures/${idPicture}`).auth(token, {type: "bearer"}).send(data);
            expect(statusCode).toBe(400)
            expect(body).toEqual(expect.objectContaining({
                errors: expect.any(Array)
            }))
        })
        test("Si se quiere pasar un ID que no existe, devuelve un status 404 y un mensaje", async() => {
            const token = await generateJWT({role: "god"});
            const idPicture = 30;
            const data = {
                description: "algo.com"
            }
            const {statusCode, body} = await request(app).put(`/api/v2/pictures/${idPicture}`).auth(token, {type: "bearer"}).send(data);
            expect(statusCode).toBe(404)
            expect(body).toEqual(expect.objectContaining({
                msg: expect.any(String)
            }))
        })
        test("Si se quiere pasar un ID que no es un numero, devuelve un status 500 y un mensaje", async() => {
            const token = await generateJWT({role: "god"});
            const idPicture = "cualquier cosa";
            const data = {
                description: "algo.com"
            }
            const {statusCode} = await request(app).put(`/api/v2/pictures/${idPicture}`).auth(token, {type: "bearer"}).send(data);
            expect(statusCode).toBe(500)
        })
    })
    describe("Usuarios con rol ADMIN", () => {
        test.skip("Edita la foto con la ID pasada por parametros. Devuelve un status 200 y la foto editada", async() => {
            const token = await generateJWT({role: "admin"});
            const idPicture = 3;
            const data = {
                "url": "panDuroEditado2.com"
            }
            const {statusCode, body} = await request(app).put(`/api/v2/pictures/${idPicture}`).auth(token, {type: "bearer"}).send(data);
            expect(statusCode).toBe(200)
            expect(body).toEqual(expect.objectContaining({
                foto_anterior: expect.any(Object),
                foto_editada: expect.any(Object)
            }))
        })
        test("Si se quiere editar una foto y poner una URL que ya esta en la base de datos, devuelve un status 400 y un mensaje", async() => {
            const token = await generateJWT({role: "admin"});
            const idPicture = 3;
            const data = {
                "url": "panDuro2.com"
            }
            const {statusCode, body} = await request(app).put(`/api/v2/pictures/${idPicture}`).auth(token, {type: "bearer"}).send(data);
            expect(statusCode).toBe(400)
            expect(body).toEqual(expect.objectContaining({
                errors: expect.any(Array)
            }))
        })
        test("Si se quiere editar una foto y poner una URL vacia, devuelve un status 400 y un mensaje", async() => {
            const token = await generateJWT({role: "admin"});
            const idPicture = 3;
            const data = {
                "url": "",
                "description": "nada"
            }
            const {statusCode, body} = await request(app).put(`/api/v2/pictures/${idPicture}`).auth(token, {type: "bearer"}).send(data);
            expect(statusCode).toBe(400)
            expect(body).toEqual(expect.objectContaining({
                errors: expect.any(Array)
            }))
        })
        test("Si se quiere pasar un ID que no existe, devuelve un status 404 y un mensaje", async() => {
            const token = await generateJWT({role: "admin"});
            const idPicture = 30;
            const data = {
                description: "algo.com"
            }
            const {statusCode, body} = await request(app).put(`/api/v2/pictures/${idPicture}`).auth(token, {type: "bearer"}).send(data);
            expect(statusCode).toBe(404)
        })
        test("Si se quiere pasar un ID que no es un numero, devuelve un status 500 y un mensaje", async() => {
            const token = await generateJWT({role: "admin"});
            const idPicture = "cualquier cosa";
            const data = {
                description: "algo.com"
            }
            const {statusCode} = await request(app).put(`/api/v2/pictures/${idPicture}`).auth(token, {type: "bearer"}).send(data);
            expect(statusCode).toBe(500)
        })
    })
    describe("Usuarios con rol GUEST", () => {
        test("un guest no puede editar fotos", async() => {
            const token = await generateJWT({role: "guest"});
            const idPicture = 2;
            const data = {
                description: "algo"
            }
            const {statusCode} = await request(app).put(`/api/v2/pictures/${idPicture}`).auth(token, {type: "bearer"}).send(data);
            expect(statusCode).toBe(401)
        })
    })
})

describe("DELETE /pictures/:id", () => {
    describe("Usuarios con rol GOD", () => {
        test.skip("Borra una foto y devuelve un status 200 y la foto eliminada", async() => {
            const token = await generateJWT({role: "god"});
            const idPicture = 15
            const {statusCode, body} = await request(app).delete(`/api/v2/pictures/${idPicture}`).auth(token, {type: "bearer"})
            expect(statusCode).toBe(200);
            expect(body).toEqual(expect.objectContaining({
                PictureDeleted: expect.any(Object)
            }))
        })
        test("Si el ID de la foto no existe, devuelve un status 404 y un mensaje de error", async() => {
            const token = await generateJWT({role: "god"});
            const idPicture = 50
            const {statusCode, body} = await request(app).delete(`/api/v2/pictures/${idPicture}`).auth(token, {type: "bearer"})
            expect(statusCode).toBe(404);
            expect(body).toEqual(expect.objectContaining({
                msg: expect.any(String)
            }))
        })
        test("Si el ID de la foto no es un numero, devuelve un status 500", async() => {
            const token = await generateJWT({role: "god"});
            const idPicture = "lo que sea menos un numero"
            const {statusCode} = await request(app).delete(`/api/v2/pictures/${idPicture}`).auth(token, {type: "bearer"})
            expect(statusCode).toBe(500);
        })
    })
    describe("Usuarios con rol ADMIN", () => {
        test.skip("Borra una foto y devuelve un status 200 y la foto eliminada", async() => {
            const token = await generateJWT({role: "admin"});
            const idPicture = 15
            const {statusCode, body} = await request(app).delete(`/api/v2/pictures/${idPicture}`).auth(token, {type: "bearer"})
            expect(statusCode).toBe(200);
            expect(body).toEqual(expect.objectContaining({
                PictureDeleted: expect.any(Object)
            }))
        })
        test("Si el ID de la foto no existe, devuelve un status 404 y un mensaje de error", async() => {
            const token = await generateJWT({role: "admin"});
            const idPicture = 50
            const {statusCode, body} = await request(app).delete(`/api/v2/pictures/${idPicture}`).auth(token, {type: "bearer"})
            expect(statusCode).toBe(404);
            expect(body).toEqual(expect.objectContaining({
                msg: expect.any(String)
            }))
        })
        test("Si el ID de la foto no es un numero, devuelve un status 500", async() => {
            const token = await generateJWT({role: "admin"});
            const idPicture = "lo que sea menos un numero"
            const {statusCode} = await request(app).delete(`/api/v2/pictures/${idPicture}`).auth(token, {type: "bearer"})
            expect(statusCode).toBe(500);
        })
    })
    describe("Usuarios con rol GUEST", () => {
        test("un usuario guest no puede eliminar fotos", async() => {
            const token = await generateJWT({role: "guest"});
            const idPicture = "lo que sea, sale antes";
            const {statusCode} = await request(app).delete(`/api/v2/pictures/${idPicture}`).auth(token, {type: "bearer"})
            expect(statusCode).toBe(401)
        })
    })
}) */

describe("Ciclo de test automatizado", () => {
    describe("Inicialmente la DB esta vacia. Creo pictures (POST /pictures)", () => {
        test("devuelve una foto creada y un status 201 (ROL GOD)", async() => {
            const token = await generateJWT({role: "god"})
            const data = {
                "url": "panDuro.com",
                "description": "foto de un pan duro",
                "fk_id_product": 3
                };
            const originalDB = await db.Picture.findAll();
            const {statusCode, body} = await request(app).post("/api/v2/pictures").send(data).auth(token, {type: "bearer"});
            const newDB = await db.Picture.findAll(); 
            expect(originalDB.length+1).toBe(newDB.length);
            expect(statusCode).toBe(201);
            expect(body).toEqual(expect.objectContaining({
                picture: expect.any(Object)
            }))
        })
        test("devuelve una foto creada y un status 201 (ROL ADMIN)", async() => {
            const token = await generateJWT({role: "admin"})
            const data = {
                "url": "panDuro2.com",
                "description": "foto de un pan duro 2",
                "fk_id_product": 3
                };
            const originalDB = await db.Picture.findAll();
            const {statusCode, body} = await request(app).post("/api/v2/pictures").send(data).auth(token, {type: "bearer"});
            const newDB = await db.Picture.findAll(); 
            expect(originalDB.length+1).toBe(newDB.length);
            expect(statusCode).toBe(201);
            expect(body).toEqual(expect.objectContaining({
                picture: expect.any(Object)
            }))
        })
        test("devuelve una foto creada y un status 201 (ROL GOD)", async() => {
            const token = await generateJWT({role: "god"})
            const data = {
                "url": "panDuro3.com",
                "description": "foto de un pan duro",
                "fk_id_product": 3
                };
            const originalDB = await db.Picture.findAll();
            const {statusCode, body} = await request(app).post("/api/v2/pictures").send(data).auth(token, {type: "bearer"});
            const newDB = await db.Picture.findAll(); 
            expect(originalDB.length+1).toBe(newDB.length);
            expect(statusCode).toBe(201);
            expect(body).toEqual(expect.objectContaining({
                picture: expect.any(Object)
            }))
        })
    })
    describe("Intento crear una foto con un GUEST (POST /pictures)", () => {
        test("el usuario guest no puede crear fotos", async() => {
            const token = await generateJWT({role: "guest"});
            const {statusCode} = await request(app).post("/api/v2/pictures").send().auth(token, {type: "bearer"});
            expect(statusCode).toBe(401)
        })
    })
    describe("Intento crear fotos con errores (POST /pictures)", () => {
        test("La foto a crear debe tener URL (ROL GOD)", async() => {
            const token = await generateJWT({role: "god"})
            const data = {
                "description": "foto de un pan duro",
                "fk_id_product": 3
            };
            const {statusCode, body} = await request(app).post("/api/v2/pictures").send(data).auth(token, {type: "bearer"});
            expect(statusCode).toBe(400);
            expect(body).toEqual(expect.objectContaining({
                errors: expect.any(Array)
            }))
        })
        test("La foto a crear debe tener URL (ROL ADMIN)", async() => {
            const token = await generateJWT({role: "god"})
            const data = {
                "description": "foto de un pan duro",
                "fk_id_product": 3
            };
            const {statusCode, body} = await request(app).post("/api/v2/pictures").send(data).auth(token, {type: "bearer"});
            expect(statusCode).toBe(400);
            expect(body).toEqual(expect.objectContaining({
                errors: expect.any(Array)
            }))
        })
        test("La foto a crear debe tener un producto a asociar (ROL GOD)", async() => {
            const token = await generateJWT({role: "god"})
            const data = {
                "url": "panDuro4.com",
                "description": "foto de un pan duro"
            };
            const {statusCode, body} = await request(app).post("/api/v2/pictures").send(data).auth(token, {type: "bearer"});
            expect(statusCode).toBe(400);
            expect(body).toEqual(expect.objectContaining({
                errors: expect.any(Array)
            }))
        })
        test("La foto a crear debe tener un producto a asociar (ROL ADMIN)", async() => {
            const token = await generateJWT({role: "admin"})
            const data = {
                "url": "panDuro4.com",
                "description": "foto de un pan duro podrido"
            };
            const {statusCode, body} = await request(app).post("/api/v2/pictures").send(data).auth(token, {type: "bearer"});
            expect(statusCode).toBe(400);
            expect(body).toEqual(expect.objectContaining({
                errors: expect.any(Array)
            }))
        })
        test("Debe de existir el Id de producto pasado en el body (ROL GOD)", async() => {
            const token = await generateJWT({role: "god"})
            const data = {
                "url": "panDuro4.com",
                "description": "foto de un pan duro podrido",
                "fk_id_product": 9
            };
            const {statusCode, body} = await request(app).post("/api/v2/pictures").send(data).auth(token, {type: "bearer"});
            expect(statusCode).toBe(400)
            expect(body).toEqual(expect.objectContaining({
                errors: expect.arrayContaining([
                    expect.objectContaining({
                        msg: expect.stringContaining(`el producto con id ${data.fk_id_product} no existe`)
                    })
                ])
            }))
        })
        test("Debe de existir el Id de producto pasado en el body (ROL ADMIN)", async() => {
            const token = await generateJWT({role: "admin"})
            const data = {
                "url": "panDuro4.com",
                "description": "foto de un pan duro podrido",
                "fk_id_product": 9
            };
            const {statusCode, body} = await request(app).post("/api/v2/pictures").send(data).auth(token, {type: "bearer"});
            expect(statusCode).toBe(400)
            expect(body).toEqual(expect.objectContaining({
                errors: expect.arrayContaining([
                    expect.objectContaining({
                        msg: expect.stringContaining(`el producto con id ${data.fk_id_product} no existe`)
                    })
                ])
            }))
        })
        test("Las URL no pueden repetirse (ROL GOD)", async() => {
            const token = await generateJWT({role: "god"});
            const data = {
                "url": "panDuro.com",
                "description": "foto de un pan duro",
                "fk_id_product": 3
                };
            const url = data.url
            const {statusCode, body} = await request(app).post("/api/v2/pictures").send(data).auth(token, {type: "bearer"});
            expect(statusCode).toBe(400);
            expect(body).toEqual(expect.objectContaining({
                errors: expect.arrayContaining([
                    expect.objectContaining({
                        msg: expect.stringContaining(`la url ${url} ya se encuentra en uso`)
                    })
                ])
            }))
        })
        test("Las URL no pueden repetirse (ROL ADMIN)", async() => {
            const token = await generateJWT({role: "god"});
            const data = {
                "url": "panDuro.com",
                "description": "foto de un pan duro",
                "fk_id_product": 3
                };
            const url = data.url
            const {statusCode, body} = await request(app).post("/api/v2/pictures").send(data).auth(token, {type: "bearer"});
            expect(statusCode).toBe(400);
            expect(body).toEqual(expect.objectContaining({
                errors: expect.arrayContaining([
                    expect.objectContaining({
                        msg: expect.stringContaining(`la url ${url} ya se encuentra en uso`)
                    })
                ])
            }))
        })
    })
    describe("Listado de fotos de un producto", () => {
        describe("Listado de fotos pasado el ID del producto por query (GET pictures?product=id)", () => {
            test("Lista todas las fotos de un producto, pasado su ID por query, devuelve un status 200 y las fotos (ROL GOD)", async() => {
                const token = await generateJWT({role: "god"});
                const idProducto = 3
                const {body,statusCode} = await request(app).get(`/api/v2/pictures?product=${idProducto}`).auth(token, {type: "bearer"});
                expect(statusCode).toBe(200)
                expect(body).toEqual(expect.objectContaining({
                    pictures: expect.any(Array)
                }))
            })
            test("Lista todas las fotos de un producto, pasado su ID por query, devuelve un status 200 y las fotos (ROL ADMIN)", async() => {
                const token = await generateJWT({role: "admin"});
                const idProducto = 3
                const {body,statusCode} = await request(app).get(`/api/v2/pictures?product=${idProducto}`).auth(token, {type: "bearer"});
                expect(statusCode).toBe(200)
                expect(body).toEqual(expect.objectContaining({
                    pictures: expect.any(Array)
                }))
            })
            test("Lista todas las fotos de un producto, pasado su ID por query, devuelve un status 200 y las fotos (ROL GUEST)", async() => {
                const token = await generateJWT({role: "guest"});
                const idProducto = 3
                const {body,statusCode} = await request(app).get(`/api/v2/pictures?product=${idProducto}`).auth(token, {type: "bearer"});
                expect(statusCode).toBe(200)
                expect(body).toEqual(expect.objectContaining({
                    pictures: expect.any(Array)
                }))
            })
        })
        describe("Errores del listado de fotos por query (GET pictures?product=id)", () => {
            test("Si el ID pasado por query no existe en la DB, devuelve un status 404 y un mensaje de que no existe el producto o no tiene fotos (ROL GOD)", async() => {
                const token = await generateJWT({role: "god"});
                const idProducto = 9;
                const {statusCode, body} = await request(app).get(`/api/v2/pictures?product=${idProducto}`).auth(token, {type: "bearer"});
                expect(statusCode).toBe(404)
                expect(body).toEqual(expect.objectContaining({
                    msg: expect.stringContaining("No existe el producto indicado o no hay fotos")
                }))
            })
            test("Si el ID pasado por query no es un numero, devuelve un status 404 y un mensaje de que no existe el producto o no tiene fotos (ROL GOD)", async() => {
                const token = await generateJWT({role: "god"});
                const idProducto = "noUnNumero";
                const {statusCode, body} = await request(app).get(`/api/v2/pictures?product=${idProducto}`).auth(token, {type: "bearer"});
                expect(statusCode).toBe(404)
                expect(body).toEqual(expect.objectContaining({
                    msg: expect.stringContaining("No existe el producto indicado o no hay fotos")
                }))
            })
            test("Si el ID pasado por query no existe en la DB, devuelve un status 404 y un mensaje de que no existe el producto o no tiene fotos (ROL ADMIN)", async() => {
                const token = await generateJWT({role: "admin"});
                const idProducto = 9;
                const {statusCode, body} = await request(app).get(`/api/v2/pictures?product=${idProducto}`).auth(token, {type: "bearer"});
                expect(statusCode).toBe(404)
                expect(body).toEqual(expect.objectContaining({
                    msg: expect.stringContaining("No existe el producto indicado o no hay fotos")
                }))
            })
            test("Si el ID pasado por query no es un numero, devuelve un status 404 y un mensaje de que no existe el producto o no tiene fotos (ROL ADMIN)", async() => {
                const token = await generateJWT({role: "admin"});
                const idProducto = "noUnNumero";
                const {statusCode, body} = await request(app).get(`/api/v2/pictures?product=${idProducto}`).auth(token, {type: "bearer"});
                expect(statusCode).toBe(404)
                expect(body).toEqual(expect.objectContaining({
                    msg: expect.stringContaining("No existe el producto indicado o no hay fotos")
                }))
            })
            test("Si el ID pasado por query no existe en la DB, devuelve un status 404 y un mensaje de que no existe el producto o no tiene fotos (ROL GUEST)", async() => {
                const token = await generateJWT({role: "guest"});
                const idProducto = 9;
                const {statusCode, body} = await request(app).get(`/api/v2/pictures?product=${idProducto}`).auth(token, {type: "bearer"});
                expect(statusCode).toBe(404)
                expect(body).toEqual(expect.objectContaining({
                    msg: expect.stringContaining("No existe el producto indicado o no hay fotos")
                }))
            })
            test("Si el ID pasado por query no es un numero, devuelve un status 404 y un mensaje de que no existe el producto o no tiene fotos (ROL GUEST)", async() => {
                const token = await generateJWT({role: "guest"});
                const idProducto = "noUnNumero";
                const {statusCode, body} = await request(app).get(`/api/v2/pictures?product=${idProducto}`).auth(token, {type: "bearer"});
                expect(statusCode).toBe(404)
                expect(body).toEqual(expect.objectContaining({
                    msg: expect.stringContaining("No existe el producto indicado o no hay fotos")
                }))
            })
            test("Si la key del query no es 'product', devuelve un status 500 y un mensaje de server error (ROL GOD)", async() => {
                const token = await generateJWT({role: "god"});
                const key = "cualquierCosa"
                const {statusCode, body} = await request(app).get(`/api/v2/pictures?${key}=3`).auth(token, {type: "bearer"});
                expect(body).toEqual(expect.objectContaining({
                    msg: expect.stringContaining("Server error")
                }))
                expect(statusCode).toBe(500)
            })
            test("Si la key del query no es 'product', devuelve un status 500 y un mensaje de server error (ROL ADMIN)", async() => {
                const token = await generateJWT({role: "admin"});
                const key = "cualquierCosa"
                const {statusCode, body} = await request(app).get(`/api/v2/pictures?${key}=3`).auth(token, {type: "bearer"});
                expect(body).toEqual(expect.objectContaining({
                    msg: expect.stringContaining("Server error")
                }))
                expect(statusCode).toBe(500)
            })
            test("Si la key del query no es 'product', devuelve un status 500 y un mensaje de server error (ROL GUEST)", async() => {
                const token = await generateJWT({role: "guest"});
                const key = "cualquierCosa"
                const {statusCode, body} = await request(app).get(`/api/v2/pictures?${key}=3`).auth(token, {type: "bearer"});
                expect(body).toEqual(expect.objectContaining({
                    msg: expect.stringContaining("Server error")
                }))
                expect(statusCode).toBe(500)
            })
            test("Si no hay fotos del producto, devuelve un status 404 y un mensaje de que no existe el producto indicado (ROL GOD)", async() => {
                const token = await generateJWT({role: "god"});
                const idProducto = 4;
                const {statusCode, body} = await request(app).get(`/api/v2/pictures?product=${idProducto}`).auth(token, {type: "bearer"});
                expect(statusCode).toBe(404);
                expect(body).toEqual(expect.objectContaining({
                    msg: expect.stringContaining("No existe el producto indicado o no hay fotos")
                }))
            })
            test("Si no hay fotos del producto, devuelve un status 404 y un mensaje de que no existe el producto indicado (ROL ADMIN)", async() => {
                const token = await generateJWT({role: "admin"});
                const idProducto = 4;
                const {statusCode, body} = await request(app).get(`/api/v2/pictures?product=${idProducto}`).auth(token, {type: "bearer"});
                expect(statusCode).toBe(404);
                expect(body).toEqual(expect.objectContaining({
                    msg: expect.stringContaining("No existe el producto indicado o no hay fotos")
                }))
            })
            test("Si no hay fotos del producto, devuelve un status 404 y un mensaje de que no existe el producto indicado (ROL GUEST)", async() => {
                const token = await generateJWT({role: "guest"});
                const idProducto = 4;
                const {statusCode, body} = await request(app).get(`/api/v2/pictures?product=${idProducto}`).auth(token, {type: "bearer"});
                expect(statusCode).toBe(404);
                expect(body).toEqual(expect.objectContaining({
                    msg: expect.stringContaining("No existe el producto indicado o no hay fotos")
                }))
            })
        })
        describe("Listado de fotos pasando el ID del producto asociado por parametros (GET product/:id/pictures)", () => {
            test("Lista todas las fotos de un producto, pasado su ID por parametros, devuelve un status 200 y las fotos (ROL GOD)", async() => {
                const token = await generateJWT({role: "god"});
                const idProducto = 1;
                const {body,statusCode} = await request(app).get(`/api/v2/products/${idProducto}/pictures`).auth(token, {type: "bearer"});
                expect(statusCode).toBe(200)
                expect(body).toEqual(expect.objectContaining({
                    pictures: expect.any(Array)
                }))
            })
            test("Lista todas las fotos de un producto, pasado su ID por parametros, devuelve un codigo 200 y las fotos (ROL ADMIN)", async() => {
                const token = await generateJWT({role: "admin"});
                const idProducto = 2;
                const {body,statusCode} = await request(app).get(`/api/v2/products/${idProducto}/pictures`).auth(token, {type: "bearer"});
                expect(statusCode).toBe(200)
                expect(body).toEqual(expect.objectContaining({
                    pictures: expect.any(Array)
                }))
            })
            test("Lista todas las fotos de un producto, pasado su ID por parametros, devuelve un codigo 200 y las fotos (ROL GUEST)", async() => {
                const token = await generateJWT({role: "guest"});
                const idProducto = 3;
                const {body,statusCode} = await request(app).get(`/api/v2/products/${idProducto}/pictures`).auth(token, {type: "bearer"});
                expect(statusCode).toBe(200)
                expect(body).toEqual(expect.objectContaining({
                    pictures: expect.any(Array)
                }))
            })
        })
        describe("Errores de listado de fotos pasando el ID del producto asociado por parametros (GET product/:id/pictures)", () => {
            test("Si el ID del producto pasado por parametros no existe , devuelve un status 404 y un mensaje de que no existe el producto (ROL GOD)", async() => {
                const token = await generateJWT({role: "god"});
                const idProducto = 10;
                const {statusCode, body} = await request(app).get(`/api/v2/products/${idProducto}/pictures`).auth(token, {type: "bearer"});
                expect(statusCode).toBe(404)
                expect(body).toEqual(expect.objectContaining({
                    msg: expect.stringContaining("No existe el producto indicado o no hay fotos")
                }))
            })
            test("Si el ID del producto pasado por parametros no existe , devuelve un status 404 y un mensaje de que no existe el producto (ROL ADMIN)", async() => {
                const token = await generateJWT({role: "admin"});
                const idProducto = 10;
                const {statusCode, body} = await request(app).get(`/api/v2/products/${idProducto}/pictures`).auth(token, {type: "bearer"});
                expect(statusCode).toBe(404)
                expect(body).toEqual(expect.objectContaining({
                    msg: expect.stringContaining("No existe el producto indicado o no hay fotos")
                }))
            })
            test("Si el ID del producto pasado por parametros no existe , devuelve un status 404 y un mensaje de que no existe el producto (ROL GUEST)", async() => {
                const token = await generateJWT({role: "guest"});
                const idProducto = 10;
                const {statusCode, body} = await request(app).get(`/api/v2/products/${idProducto}/pictures`).auth(token, {type: "bearer"});
                expect(statusCode).toBe(404)
                expect(body).toEqual(expect.objectContaining({
                    msg: expect.stringContaining("No existe el producto indicado o no hay fotos")
                }))
            })
            test("Si el ID del producto pasado por parametros no es un numero, devuelve un status 404 y un mensaje de que no existe el producto o no tiene fotos (ROL GOD)", async() => {
                const token = await generateJWT({role: "god"});
                const idProducto = "noUnNumero";
                const {statusCode, body} = await request(app).get(`/api/v2/pictures?product=${idProducto}`).auth(token, {type: "bearer"});
                expect(statusCode).toBe(404)
                expect(body).toEqual(expect.objectContaining({
                    msg: expect.stringContaining("No existe el producto indicado o no hay fotos")
                }))
            })
            test("Si el ID del producto pasado por parametros no es un numero, devuelve un status 404 y un mensaje de que no existe el producto o no tiene fotos (ROL ADMIN)", async() => {
                const token = await generateJWT({role: "admin"});
                const idProducto = "noUnNumero";
                const {statusCode, body} = await request(app).get(`/api/v2/pictures?product=${idProducto}`).auth(token, {type: "bearer"});
                expect(statusCode).toBe(404)
                expect(body).toEqual(expect.objectContaining({
                    msg: expect.stringContaining("No existe el producto indicado o no hay fotos")
                }))
            })
            test("Si el ID del producto pasado por parametros no es un numero, devuelve un status 404 y un mensaje de que no existe el producto o no tiene fotos (ROL GUEST)", async() => {
                const token = await generateJWT({role: "guest"});
                const idProducto = "noUnNumero";
                const {statusCode, body} = await request(app).get(`/api/v2/pictures?product=${idProducto}`).auth(token, {type: "bearer"});
                expect(statusCode).toBe(404)
                expect(body).toEqual(expect.objectContaining({
                    msg: expect.stringContaining("No existe el producto indicado o no hay fotos")
                }))
            })
            test("Si no hay fotos del producto, devuelve un status 404 y un mensaje de que no hay fotos del producto (ROL GOD)", async() => {
                const token = await generateJWT({role: "god"});
                const idProducto = 4;
                const {statusCode, body} = await request(app).get(`/api/v2/products/${idProducto}/pictures`).auth(token, {type: "bearer"});
                expect(statusCode).toBe(404);
                expect(body).toEqual(expect.objectContaining({
                    msg: expect.stringContaining("No existe el producto indicado o no hay fotos")
                }))
            })
            test("Si no hay fotos del producto, devuelve un status 404 y un mensaje de que no hay fotos del producto (ROL ADMIN)", async() => {
                const token = await generateJWT({role: "admin"});
                const idProducto = 4;
                const {statusCode, body} = await request(app).get(`/api/v2/products/${idProducto}/pictures`).auth(token, {type: "bearer"});
                expect(statusCode).toBe(404);
                expect(body).toEqual(expect.objectContaining({
                    msg: expect.stringContaining("No existe el producto indicado o no hay fotos")
                }))
            })
            test("Si no hay fotos del producto, devuelve un status 404 y un mensaje de que no hay fotos del producto (ROL GUEST)", async() => {
                const token = await generateJWT({role: "guest"});
                const idProducto = 4;
                const {statusCode, body} = await request(app).get(`/api/v2/products/${idProducto}/pictures`).auth(token, {type: "bearer"});
                expect(statusCode).toBe(404);
                expect(body).toEqual(expect.objectContaining({
                    msg: expect.stringContaining("No existe el producto indicado o no hay fotos")
                }))
            })
        })
    })
    describe("Listado de fotos por ID (GET /pictures/:id)", () => {
        test("Lista la foto con el ID pasado por parametro. Devuelve un status 200 y la foto (ROL GOD)", async() => {
            const token = await generateJWT({role: "god"});
            const picture = await db.Picture.findOne()
            const idPicture = picture.dataValues.id_picture;
            const {statusCode, body} = await request(app).get(`/api/v2/pictures/${idPicture}`).auth(token, {type: "bearer"})
            console.log(body);
            expect(statusCode).toBe(200);
            expect(body).toEqual(expect.objectContaining({
                picture: expect.any(Object)
            }))
        })
        test("Lista la foto con el ID pasado por parametro. Devuelve un status 200 y la foto (ROL ADMIN)", async() => {
            const token = await generateJWT({role: "admin"});
            const picture = await db.Picture.findOne()
            const idPicture = picture.dataValues.id_picture;
            console.log(idPicture);
            const {statusCode, body} = await request(app).get(`/api/v2/pictures/${idPicture}`).auth(token, {type: "bearer"})
            console.log(body);
            expect(statusCode).toBe(200);
            expect(body).toEqual(expect.objectContaining({
                picture: expect.any(Object)
            }))
        })
        test("Lista la foto con el ID pasado por parametro. Devuelve un status 200 y la foto (ROL GUEST)", async() => {
            const token = await generateJWT({role: "guest"});
            const picture = await db.Picture.findOne()
            const idPicture = picture.dataValues.id_picture;
            const {statusCode, body} = await request(app).get(`/api/v2/pictures/${idPicture}`).auth(token, {type: "bearer"})
            expect(statusCode).toBe(200);
            expect(body).toEqual(expect.objectContaining({
                picture: expect.any(Object)
            }))
        })
    })
    describe("Errores del listado de fotos por ID", () => {
        test("Si el ID de la foto no es un numero, devuelve un status 404 y un mensaje de que no existe la foto (ROL GOD)", async() => {
            const token = await generateJWT({role: "god"});
            const idPicture = "noUnNumero";
            const {statusCode, body} = await request(app).get(`/api/v2/pictures/${idPicture}`).auth(token, {type: "bearer"});
            expect(statusCode).toBe(404);
            expect(body).toEqual(expect.objectContaining({
                msg: expect.any(String)
            }))
        })
        test("Si el ID de la foto no es un numero, devuelve un status 404 y un mensaje de que no existe la foto (ROL ADMIN)", async() => {
            const token = await generateJWT({role: "admin"});
            const idPicture = "noUnNumero";
            const {statusCode, body} = await request(app).get(`/api/v2/pictures/${idPicture}`).auth(token, {type: "bearer"});
            expect(statusCode).toBe(404);
            expect(body).toEqual(expect.objectContaining({
                msg: expect.any(String)
            }))
        })
        test("Si el ID de la foto no es un numero, devuelve un status 404 y un mensaje de que no existe la foto (ROL GUEST)", async() => {
            const token = await generateJWT({role: "guest"});
            const idPicture = "noUnNumero";
            const {statusCode, body} = await request(app).get(`/api/v2/pictures/${idPicture}`).auth(token, {type: "bearer"});
            expect(statusCode).toBe(404);
            expect(body).toEqual(expect.objectContaining({
                msg: expect.any(String)
            }))
        })
        test("Si no existe la foto con dicho ID, devuelve un status 404 y un mensaje de que no existe la foto (ROL GOD)", async() => {
            const token = await generateJWT({role: "god"});
            const idPicture = 1000000;
            const {statusCode, body} = await request(app).get(`/api/v2/pictures/${idPicture}`).auth(token, {type: "bearer"});
            expect(statusCode).toBe(404);
            expect(body).toEqual(expect.objectContaining({
                msg: expect.any(String)
            }))
        })
        test("Si no existe la foto con dicho ID, devuelve un status 404 y un mensaje de que no existe la foto (ROL ADMIN)", async() => {
            const token = await generateJWT({role: "admin"});
            const idPicture = 1000000;
            const {statusCode, body} = await request(app).get(`/api/v2/pictures/${idPicture}`).auth(token, {type: "bearer"});
            expect(statusCode).toBe(404);
            expect(body).toEqual(expect.objectContaining({
                msg: expect.any(String)
            }))
        })
        test("Si no existe la foto con dicho ID, devuelve un status 404 y un mensaje de que no existe la foto (ROL GUEST)", async() => {
            const token = await generateJWT({role: "guest"});
            const idPicture = 100000;
            const {statusCode, body} = await request(app).get(`/api/v2/pictures/${idPicture}`).auth(token, {type: "bearer"});
            expect(statusCode).toBe(404);
            expect(body).toEqual(expect.objectContaining({
                msg: expect.any(String)
            }))
        })
    })
    describe("Edicion de fotos (PUT /pictures/:id)", () => {
        test("Edita la foto con la ID pasada por parametros. Devuelve un status 200 y la foto editada (ROL GOD)", async() => {
            const token = await generateJWT({role: "god"});
            const picture = await db.Picture.findOne()
            const idPicture = picture.dataValues.id_picture;
            const data = {
                "url": "panDuroEditado.com"
            }
            const {statusCode, body} = await request(app).put(`/api/v2/pictures/${idPicture}`).auth(token, {type: "bearer"}).send(data);
            expect(statusCode).toBe(200)
            expect(body).toEqual(expect.objectContaining({
                foto_anterior: expect.any(Object),
                foto_editada: expect.any(Object)
            }))
        })
        test("Edita la foto con la ID pasada por parametros. Devuelve un status 200 y la foto editada (ROL ADMIN)", async() => {
            const token = await generateJWT({role: "admin"});
            const picture = await db.Picture.findOne()
            const idPicture = picture.dataValues.id_picture;
            const data = {
                "url": "panDuroEditado2.com"
            }
            const {statusCode, body} = await request(app).put(`/api/v2/pictures/${idPicture}`).auth(token, {type: "bearer"}).send(data);
            expect(statusCode).toBe(200)
            expect(body).toEqual(expect.objectContaining({
                foto_anterior: expect.any(Object),
                foto_editada: expect.any(Object)
            }))
        })
    })
    describe("Errores en la edicion de fotos (PUT /pictures/:id)", () => {
        test("un guest no puede editar fotos", async() => {
            const token = await generateJWT({role: "guest"});
            const idPicture = 2;
            const data = {
                description: "algo"
            }
            const {statusCode} = await request(app).put(`/api/v2/pictures/${idPicture}`).auth(token, {type: "bearer"}).send(data);
            expect(statusCode).toBe(401)
        })
        test("Si se quiere editar una foto y poner una URL que ya esta en la base de datos, devuelve un status 400 y un mensaje de que la URL ya esta en la base de datos (ROL GOD)", async() => {
            const token = await generateJWT({role: "god"});
            const idPicture = 1;
            const data = {
                "url": "panDuro2.com"
            }
            const {statusCode, body} = await request(app).put(`/api/v2/pictures/${idPicture}`).auth(token, {type: "bearer"}).send(data);
            expect(statusCode).toBe(400)
            expect(body).toEqual(expect.objectContaining({
                errors: expect.any(Array)
            }))
        })
        test("Si se quiere editar una foto y poner una URL que ya esta en la base de datos, devuelve un status 400 y un mensaje de que la URL ya esta en la base de datos (ROL ADMIN)", async() => {
            const token = await generateJWT({role: "admin"});
            const idPicture = 1;
            const data = {
                "url": "panDuro2.com"
            }
            const {statusCode, body} = await request(app).put(`/api/v2/pictures/${idPicture}`).auth(token, {type: "bearer"}).send(data);
            expect(statusCode).toBe(400)
            expect(body).toEqual(expect.objectContaining({
                errors: expect.any(Array)
            }))
        })
        test("Si se quiere editar una foto y poner una URL vacia, devuelve un status 400 y un mensaje de que la URL no puede ser vacia (ROL GOD)", async() => {
            const token = await generateJWT({role: "god"});
            const idPicture = 3;
            const data = {
                "url": "",
                "description": "nada"
            }
            const {statusCode, body} = await request(app).put(`/api/v2/pictures/${idPicture}`).auth(token, {type: "bearer"}).send(data);
            expect(statusCode).toBe(400)
            expect(body).toEqual(expect.objectContaining({
                errors: expect.any(Array)
            }))
        })
        test("Si se quiere editar una foto y poner una URL vacia, devuelve un status 400 y un mensaje de que la URL no puede ser vacia (ROL ADMIN)", async() => {
            const token = await generateJWT({role: "admin"});
            const idPicture = 3;
            const data = {
                "url": "",
                "description": "nada"
            }
            const {statusCode, body} = await request(app).put(`/api/v2/pictures/${idPicture}`).auth(token, {type: "bearer"}).send(data);
            expect(statusCode).toBe(400)
            expect(body).toEqual(expect.objectContaining({
                errors: expect.any(Array)
            }))
        })
        test("Si se quiere editar una foto que no existe, devuelve un status 404 y un mensaje de que la foto no existe en la base de datos (ROL GOD)", async() => {
            const token = await generateJWT({role: "god"});
            const idPicture = 30;
            const data = {
                description: "algo.com"
            }
            const {statusCode, body} = await request(app).put(`/api/v2/pictures/${idPicture}`).auth(token, {type: "bearer"}).send(data);
            expect(statusCode).toBe(404)
            expect(body).toEqual(expect.objectContaining({
                msg: expect.any(String)
            }))
        })
        test("Si se quiere editar una foto que no existe, devuelve un status 404 y un mensaje de que la foto no existe en la base de datos (ROL ADMIN)", async() => {
            const token = await generateJWT({role: "admin"});
            const idPicture = 30;
            const data = {
                description: "algo.com"
            }
            const {statusCode, body} = await request(app).put(`/api/v2/pictures/${idPicture}`).auth(token, {type: "bearer"}).send(data);
            expect(statusCode).toBe(404)
            expect(body).toEqual(expect.objectContaining({
                msg: expect.any(String)
            }))
        })
        test("Si se quiere pasar un ID que no es un numero, devuelve un status 500 y un mensaje de error (ROL GOD)", async() => {
            const token = await generateJWT({role: "god"});
            const idPicture = "cualquier cosa";
            const data = {
                description: "algo.com"
            }
            const {statusCode} = await request(app).put(`/api/v2/pictures/${idPicture}`).auth(token, {type: "bearer"}).send(data);
            expect(statusCode).toBe(500)
        })
        test("Si se quiere pasar un ID que no es un numero, devuelve un status 500 y un mensaje de error (ROL ADMIN)", async() => {
            const token = await generateJWT({role: "god"});
            const idPicture = "cualquier cosa";
            const data = {
                description: "algo.com"
            }
            const {statusCode} = await request(app).put(`/api/v2/pictures/${idPicture}`).auth(token, {type: "bearer"}).send(data);
            expect(statusCode).toBe(500)
        })
    })
    describe("Eliminacion de fotos (DELETE /pictures/:id)", () => {
        test("Borra una foto y devuelve un status 200 y la foto eliminada (ROL GOD)", async() => {
            const token = await generateJWT({role: "god"});
            const picture = await db.Picture.findOne()
            const idPicture = picture.dataValues.id_picture;
            const {statusCode, body} = await request(app).delete(`/api/v2/pictures/${idPicture}`).auth(token, {type: "bearer"})
            expect(statusCode).toBe(200);
            expect(body).toEqual(expect.objectContaining({
                PictureDeleted: expect.any(Object)
            }))
        })
        test("Borra una foto y devuelve un status 200 y la foto eliminada (ROL GOD)", async() => {
            const token = await generateJWT({role: "god"});
            const picture = await db.Picture.findOne()
            const idPicture = picture.dataValues.id_picture;
            const {statusCode, body} = await request(app).delete(`/api/v2/pictures/${idPicture}`).auth(token, {type: "bearer"})
            expect(statusCode).toBe(200);
            expect(body).toEqual(expect.objectContaining({
                PictureDeleted: expect.any(Object)
            }))
        })
        test("Borra una foto y devuelve un status 200 y la foto eliminada (ROL ADMIN)", async() => {
            const token = await generateJWT({role: "admin"});
            const picture = await db.Picture.findOne()
            const idPicture = picture.dataValues.id_picture;
            const {statusCode, body} = await request(app).delete(`/api/v2/pictures/${idPicture}`).auth(token, {type: "bearer"})
            expect(statusCode).toBe(200);
            expect(body).toEqual(expect.objectContaining({
                PictureDeleted: expect.any(Object)
            }))
        })
    })
    describe("Errores en la eliminacion de fotos (DELETE /pictures/:id)", () => {
        test("un usuario guest no puede eliminar fotos, devuelve un status 401 y un mensaje de que no se tiene autorizacion", async() => {
            const token = await generateJWT({role: "guest"});
            const idPicture = "lo que sea, sale antes";
            const {statusCode} = await request(app).delete(`/api/v2/pictures/${idPicture}`).auth(token, {type: "bearer"})
            expect(statusCode).toBe(401)
        })
        test("Si el ID de la foto no existe, devuelve un status 404 y un mensaje de error (ROL GOD)", async() => {
            const token = await generateJWT({role: "god"});
            const idPicture = 5;
            const {statusCode, body} = await request(app).delete(`/api/v2/pictures/${idPicture}`).auth(token, {type: "bearer"})
            expect(statusCode).toBe(404);
            expect(body).toEqual(expect.objectContaining({
                msg: expect.any(String)
            }))
        })
        test("Si el ID de la foto no existe, devuelve un status 404 y un mensaje de error (ROL ADMIN)", async() => {
            const token = await generateJWT({role: "admin"});
            const idPicture = 6;
            const {statusCode, body} = await request(app).delete(`/api/v2/pictures/${idPicture}`).auth(token, {type: "bearer"})
            expect(statusCode).toBe(404);
            expect(body).toEqual(expect.objectContaining({
                msg: expect.any(String)
            }))
        })
        test("Si el ID de la foto no es un numero, devuelve un status 500 y un mensaje de error (ROL GOD)", async() => {
            const token = await generateJWT({role: "god"});
            const idPicture = "lo que sea menos un numero"
            const {statusCode} = await request(app).delete(`/api/v2/pictures/${idPicture}`).auth(token, {type: "bearer"})
            expect(statusCode).toBe(500);
        })
        test("Si el ID de la foto no es un numero, devuelve un status 500 y un mensaje de error (ROL ADMIN)", async() => {
            const token = await generateJWT({role: "admin"});
            const idPicture = "lo que sea menos un numero"
            const {statusCode} = await request(app).delete(`/api/v2/pictures/${idPicture}`).auth(token, {type: "bearer"})
            expect(statusCode).toBe(500);
        })
    })
});

describe("tests con la base de datos apagada", () => {
    beforeAll(() => {
        db.sequelize.close();
    })
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

describe("Tests de rutas indefinidas", () => {
    test("GET /products/:id/pictures/algo debe devolver un status 400 y un mensaje de bad request", async() => {
        const {statusCode, body} = await request(app).get(`/api/v2/products/3/pictures/algo/otracosa`);
        expect(statusCode).toBe(400);
        expect(body).toEqual(expect.objectContaining({
            Mensaje: expect.any(String)
        }))
    })
    test("PUT /pictures/:id/algo debe devolver un status 400 y un mensaje de bad request", async() => {
        const {statusCode, body} = await request(app).put(`/api/v2/pictures/3/algo`);
        expect(statusCode).toBe(400);
        expect(body).toEqual(expect.objectContaining({
            Mensaje: expect.any(String)
        }))
    })
    test("POST /pictures/algo/algomas debe devolver un status 400 y un mensaje de bad request", async() => {
        const {statusCode, body} = await request(app).post(`/api/v2/pictures/algo/algomas`);
        expect(statusCode).toBe(400);
        expect(body).toEqual(expect.objectContaining({
            Mensaje: expect.any(String)
        }))
    })
    test("DELETE /pictures/:id/algo debe devolver un status 400 y un mensaje de bad request", async() => {
        const {statusCode, body} = await request(app).delete(`/api/v2/pictures/3/algo/algomas`);
        expect(statusCode).toBe(400);
        expect(body).toEqual(expect.objectContaining({
            Mensaje: expect.any(String)
        }))
    })
})


