const request = require('supertest');
const {app} = require("../app");
const db = require('../database/models');
const generateJWT = require('../helpers/generateJWT');
const { sequelize } = require('../database/models')
const bcrypt = require("bcrypt");


//Preparar base de pruebas

test("Levanto el servidor", async () => {

    await sequelize.sync({ force: true });

    const token = await generateJWT({role:'god'});

    let password = "123456";
    const salt = await bcrypt.genSalt(10); 
    password = await bcrypt.hash(password, salt);
    const userGod = {email: "god@gmail.com", username: "god", password: password, firstname: "god", lastname: "GOD", profilepic: "micara", role: "god"};
    const userAdmin = {email: "admin@gmail.com", username: "admin", password: password, firstname: "admin", lastname: "ADMIN", profilepic: "paisaje", role: "admin"};
    const userGuest = {email: "guest@gmail.com", username: "guest", password: password, firstname: "guest", lastname: "GUEST", profilepic: "insulto", role: "guest"};
    await db.User.bulkCreate([userGod, userAdmin, userGuest]);

    const data2 = { "title": "Todo lo que venga"};
    await request(app).post('/api/v2/categories').auth(token, { type: 'bearer' }).send(data2);
    //const category = await db.Category.findOne({where: {title: "Jardineria"}});
    //const id = category.dataValues.id_category;

    const producto1 = {"title": "Iphone 13", "stock": 50, "description": "Gama alta", "price": 70000, "fk_id_category": 1, "mostwanted": 1};
    const producto2 = {"title": "Audi A3", "stock": 15, "description": "Nunca taxi", "price": 500100, "fk_id_category": 1, "mostwanted": 1};
    const producto3 = {"title": "Pan", "stock": 1000, "description": "Fresco", "price": 15, "fk_id_category": 1, "mostwanted": 0};
    const producto4 = {"title": "Mesa", "stock": 0, "description": "Calidad baja", "price": 1101, "fk_id_category": 1, "mostwanted": 0};
    const producto5 = {"title": "Reloj", "stock": 0, "description": "Cucu el del pajaro", "price": 10101, "fk_id_category": 1, "mostwanted": 0};
    const producto6 = {"title": "Chocolate", "stock": 50, "description": "Negro", "price": 10101, "fk_id_category": 1, "mostwanted": 1};
    
    await db.Product.bulkCreate([producto1, producto2, producto3, producto4, producto5, producto6]);

    const data=[{"fk_id_product": 1, "quantity": 2}];
    const { body, statusCode } = await request(app).put(`/api/v2/carts/2`).auth(token,{type: 'bearer'}).send(data);

    const categoriaProducto = await db.Product.findOne({where: {title: "chocolate"}});

    const idC = categoriaProducto.dataValues.fk_id_category;
    expect(1).toEqual(idC);
    expect(body).toEqual(expect.objectContaining({msg: expect.stringContaining('Total $'),
                                                msg1: expect.stringContaining('Total USD'),
                                                msg2: expect.stringContaining('Productos en Stock'),
                                                productos: expect.arrayContaining([expect.objectContaining(
                                                    {
                                                    title: expect.any(String),
                                                    quantity: expect.any(Number)
                                                    })
                                                ]),
                                                msg3: expect.stringContaining('Productos con stock limitado'),
                                                productos2: expect.any(Array),
                                                msg4: expect.any(String),
                                                productos3: expect.any(Array)}));

});

//Empiezan los test     
describe("GET /api/v2/carts/id  <<Correctos>>", () => {
    test("200,role: GOD// cartOfID, Debe devolver un carrito vacio", async () => {
        const token = await generateJWT({role:'god'});
        const { body, statusCode } = await request(app).get('/api/v2/carts/1').auth(token,{type: 'bearer'});
        expect(statusCode).toEqual(200);
        expect(body.msg).toEqual('Total $ 0');
        expect(body).toEqual(expect.objectContaining({ msg: expect.any(String),
                                                    msg1: expect.stringContaining('Total USD'),
                                                    cartOfUser: expect.objectContaining({username: expect.any(String),
                                                                                        carts: expect.any(Array)})
                                                    }))

    });

    test("200,role: GOD// cartOfID  devuelve el carrito de ID con productos ", async ()=>{

        const token = await generateJWT({role:'god'});

        const { body, statusCode } = await request(app).get('/api/v2/carts/2').auth(token,{type: 'bearer'});

        expect(statusCode).toEqual(200);
        expect(body.msg).toEqual("Total $ 140000");

    });


    test("200,role: admin// cartOfID  devuelve el carrito propio con productos ", async ()=>{

        const token = await generateJWT({role:'admin', id_user: 2});

        const { body, statusCode } = await request(app).get('/api/v2/carts/2').auth(token,{type: 'bearer'});
        
        expect(statusCode).toEqual(200);
        
        expect(body.cartOfUser.carts[0].Cart.quantity).toEqual(2);
    })

});

describe("GET /api/v2/carts/id  <<Incorrecto>>", () => {
    test("404,role: GOD// cartOfId, No encuentra al usuario por lo que retorna ", async () => {
        const token = await generateJWT({role:'god'});
    
        const { body, statusCode } = await request(app).get('/api/v2/carts/75').auth(token,{type: 'bearer'});;

        expect(statusCode).toEqual(404);
        expect(body.msg).toEqual('No encuentra el usuario');
        //expect(body).toMatchObject({ token: expect.any(String) });
    });

    test("401,role: guest// cartOfId, No tenes permiso de ver ese carro ", async () => {
        const token = await generateJWT({role:'guest', id_user: 3});
        const { body, statusCode } = await request(app).get('/api/v2/carts/2').auth(token,{type: 'bearer'});;
        expect(statusCode).toEqual(401);
        expect(body.Mensaje).toEqual('No tienes permisos para ver.');
        //expect(body).toMatchObject({ token: expect.any(String) });
    });

});

describe("PUT /api/v2/carts/id  <<Correctos>>", () => {
    
    test("200,role: GOD// Update VACIO a un usuario existente SIN carro ", async () => {
        const token = await generateJWT({role:'god'});
        
        const data={};
        
        const { body, statusCode } = await request(app).put(`/api/v2/carts/1`).auth(token,{type: 'bearer'}).send(data);
        
        expect(statusCode).toEqual(200);
        expect(body.msg).toEqual('Total $ 0');


    });

    test("200,role: GOD// Update a un carrito, se actualiza con 1 producto existente ", async () => {
        const token = await generateJWT({role:'god'});
        
        const data=[{
                "fk_id_product": 1,
                "quantity": 2
        }];
        
        const { body, statusCode } = await request(app).put(`/api/v2/carts/1`).auth(token,{type: 'bearer'}).send(data);

        expect(statusCode).toEqual(200);

    });

    test("200,role: GOD// Update Vacio, a usuario CON carro ", async () => {
        const token = await generateJWT({role:'god'});
        
        const data={};
        
        const { body, statusCode } = await request(app).put(`/api/v2/carts/1`).auth(token,{type: 'bearer'}).send(data);
        
        expect(statusCode).toEqual(200);
        expect(body.msg).toEqual('Total $ 0');


    });

    test("200,role: GOD// Update a un carrito con un producto con stock LIMITADO ", async () => {
        const token = await generateJWT({role:'god'});
        
        const data=[{
                "fk_id_product": 2,
                "quantity": 357
        }];
        
        const { body, statusCode } = await request(app).put(`/api/v2/carts/1`).auth(token,{type: 'bearer'}).send(data);

        

        expect(statusCode).toEqual(200);
        expect(body.productos2.length).toBeGreaterThan(0);

    });

    test("200,role: GOD// Update Vacio, a usuario CON carro ", async () => {
        const token = await generateJWT({role:'god'});
        
        const data={};
        
        const { body, statusCode } = await request(app).put(`/api/v2/carts/1`).auth(token,{type: 'bearer'}).send(data);
        
        expect(statusCode).toEqual(200);
        expect(body.msg).toEqual('Total $ 0');


    });

    test("200,role: GOD// Update a un carrito con un producto con SIN stock(0)", async () => {
        const token = await generateJWT({role:'god'});
        
        const data=[{
                "fk_id_product": 4,
                "quantity": 17
        }];
        
        const { body, statusCode } = await request(app).put(`/api/v2/carts/1`).auth(token,{type: 'bearer'}).send(data);

        expect(statusCode).toEqual(200);
        expect(body.productos3.length).toBeGreaterThan(0);

    });

    test("200,role: GOD// Update a un carrito con mas de un producto ", async () => {
        const token = await generateJWT({role:'god'});
        
        const data=[{
                "fk_id_product": 1,
                "quantity": 2 },
                {
                "fk_id_product": 2,
                "quantity": 3 },
        ];
        
        const { body, statusCode } = await request(app).put(`/api/v2/carts/1`).auth(token,{type: 'bearer'}).send(data);
        
        expect(statusCode).toEqual(200);
        expect(body.productos.length).toBeGreaterThan(1);

    });
    
    test("200,role: GOD// Update Vacio, a usuario CON carro ", async () => {
        const token = await generateJWT({role:'god'});
        
        const data={};
        
        const { body, statusCode } = await request(app).put(`/api/v2/carts/1`).auth(token,{type: 'bearer'}).send(data);
        
        expect(statusCode).toEqual(200);
        expect(body.msg).toEqual('Total $ 0');


    });

    test("200,role: GOD// Update a un carrito con productos con DISTINTOS stocks ", async () => {
        const token = await generateJWT({role:'god'});
        
        const data=[{
                "fk_id_product": 1,
                "quantity": 5 },
                {
                "fk_id_product": 2,
                "quantity": 35 },
                {
                "fk_id_product": 3,
                "quantity": 170 },
                {
                "fk_id_product": 4,
                "quantity": 25 },
                {
                "fk_id_product": 5,
                "quantity": 54 },
                {
                "fk_id_product": 6,
                "quantity": 70 }
        ];
        
        const { body, statusCode } = await request(app).put(`/api/v2/carts/1`).auth(token,{type: 'bearer'}).send(data);

        expect(statusCode).toEqual(200);
        expect(body.productos.length).toBeGreaterThan(1);
        expect(body.productos2.length).toBeGreaterThan(1);
        expect(body.productos3.length).toBeGreaterThan(1);

    });
    
    test("200,role: GOD// Update Vacio, a usuario CON carro ", async () => {
        const token = await generateJWT({role:'god'});
        
        const data={};
        
        const { body, statusCode } = await request(app).put(`/api/v2/carts/1`).auth(token,{type: 'bearer'}).send(data);
        
        expect(statusCode).toEqual(200);
        expect(body.msg).toEqual('Total $ 0');


    });

    test("200,role: guest// Update and Get of guest /role: guest", async () => {/////cuidado
        const token = await generateJWT({role:'guest', id_user: 3});
        ///las dos juntas                      guest
        
        const data=[
            {
                "fk_id_product": 2,
                "quantity": 25 },
                {
                "fk_id_product": 3,
                "quantity": 17 },
                
        ];

        
        const { body, statusCode } = await request(app).put(`/api/v2/carts/3`).auth(token,{type: 'bearer'}).send(data);
        
        expect(statusCode).toEqual(200);
        expect(body.productos.length).toBeGreaterThan(0);
        expect(body.productos2.length).toBeGreaterThan(0);
        expect(body.productos3.length).toBe(0);



    });
    test("200,role: GOD// Update Vacio, a usuario CON carro /role: guest", async () => {
        const token = await generateJWT({role:'guest', id_user: 3});
        
        const data={};
        
        const { body, statusCode } = await request(app).put(`/api/v2/carts/3`).auth(token,{type: 'bearer'}).send(data);
        
        expect(statusCode).toEqual(200);
        expect(body.msg).toEqual('Total $ 0');


    });

    test("200,role: guest// Update de un producto que no existe, lo descarta", async () => {

        const token = await generateJWT({role:'guest', id_user: 3});
        ///las dos juntas                      guest
        
        const data=[
            {
                "fk_id_product": 652,
                "quantity": 25 },
                {
                "fk_id_product": 3,
                "quantity": 7 },
                
        ];

        
        const { body, statusCode } = await request(app).put(`/api/v2/carts/3`).auth(token,{type: 'bearer'}).send(data);
        
        expect(statusCode).toEqual(200);
        expect(body.productos.length).toBeGreaterThan(0);
        expect(body.productos2.length).toBe(0);
        expect(body.productos3.length).toBe(0);


    });

    test("200,role: GOD// Update Vacio, a usuario CON carro /role: guest", async () => {
        const token = await generateJWT({role:'guest', id_user: 3});
        
        const data={};
        
        const { body, statusCode } = await request(app).put(`/api/v2/carts/3`).auth(token,{type: 'bearer'}).send(data);
        
        expect(statusCode).toEqual(200);
        expect(body.msg).toEqual('Total $ 0');


    });

});


describe("PUT /api/v2/carts/id  <<Incorrecto>>", () => {


    test("404,role: GOD// Update a un usuario que no existe", async () => {
        const token = await generateJWT({role:'god'});
        
        const data={};
        
        const { body, statusCode } = await request(app).put(`/api/v2/carts/342`).auth(token,{type: 'bearer'}).send(data);
        
        expect(statusCode).toEqual(404);
        expect(body.msg).toEqual('No encuentra el usuario');


    });
    test("401,role: guest// Update, No tenes permiso de modificar este carro", async () => {
        const token = await generateJWT({role:'guest', id_user: 3});

    
        const { body, statusCode } = await request(app).put('/api/v2/carts/2').auth(token,{type: 'bearer'});;
        
        expect(statusCode).toEqual(401);
        expect(body.Mensaje).toEqual('No tienes permisos');
    });

    

});

describe("Errores en endpoints", () => {
    
    test("400, GET bad request en el endpoint", async ()=>{
        const token = await generateJWT({role:'god'});
        const {statusCode } = await request(app).get('/api/v2/carts/3/asdd/dsad/sa#$%').auth(token,{type: 'bearer'});
        expect(statusCode).toEqual(400);
        ;
    });
    
    test("400, PUT bad request en el endpoint", async ()=>{
        const token = await generateJWT({role:'god'});
        let data={};
        
        const {statusCode } = await request(app).put('/api/v2/carts/76/sda/sd*&&^^').auth(token,{type: 'bearer'}).send(data);
        expect(statusCode).toEqual(400);
    });
    
    test("400, POST bad request en el endpoint", async ()=>{
        const token = await generateJWT({role:'god'});
        let data={};
        
        const {statusCode } = await request(app).post('/api/v2/carts/300/asdd/qwe/uim/LMAO').auth(token,{type: 'bearer'}).send(data);
        expect(statusCode).toEqual(400);
    });
    
    test("400, DELETE bad request en el endpoint", async ()=>{
        const token = await generateJWT({role:'god'});
        
        const { body, statusCode } = await request(app).delete('/api/v2/carts/3/que/cosa').auth(token,{type: 'bearer'});
        
        expect(statusCode).toEqual(400);
        expect(body.Mensaje).toEqual('Bad Request.');
    });
    
}) 

test("Limpio el servidor ", async()=>{
    await sequelize.sync({ force: true });
    const pro = await db.Product.findOne({where: {id_product: 1}});
    expect(null).toEqual(pro);
}); 





