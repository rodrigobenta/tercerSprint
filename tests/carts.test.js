const request = require('supertest');
const {app} = require("../app");
const db = require('../database/models');
const generateJWT = require('../helpers/generateJWT');


describe("GET /api/v2/carts/id  <<Correctos>>", () => {
    test("200, cartOfID, Debe devolver un carrito vacio", async () => {
        
        const token = await generateJWT({role:'god'});

        const { body, statusCode } = await request(app).get('/api/v2/carts/1').auth(token,{type: 'bearer'});
        
        expect(statusCode).toEqual(200);
        expect(body.msg).toEqual('Total $ 0');

    });

    test("200, cartOfID  devuelv el carrito de ID con productos", async ()=>{

        const token = await generateJWT({role:'god'});

        const { body, statusCode } = await request(app).get('/api/v2/carts/2').auth(token,{type: 'bearer'});
        
        console.log(body);
        expect(statusCode).toEqual(200);
        expect(body.msg).toEqual("Total $ 140000");

        
        //expect(body.msg).toEqual('Total $ 0');

    })

});

describe("GET /api/v2/carts/id  <<Incorrecot>>", () => {
    test("404, cartOfId, No encuentra al usuario por lo que retorna", async () => {
        const token = await generateJWT({role:'god'});
    
        const { body, statusCode } = await request(app).get('/api/v2/carts/75').auth(token,{type: 'bearer'});;
        
        //console.log(body);
        expect(statusCode).toEqual(404);
        expect(body.msg).toEqual('No encuentra el usuario');
        //expect(body).toMatchObject({ token: expect.any(String) });
    });


    test("401, cartOfId, No tenes permiso de ver ese carro", async () => {
        const token = await generateJWT({role:'guest', id_user: 3});

    
        const { body, statusCode } = await request(app).get('/api/v2/carts/2').auth(token,{type: 'bearer'});;
        
        //console.log(body);
        expect(statusCode).toEqual(401);
        expect(body.Mensaje).toEqual('No tienes permisos para ver.');
        //expect(body).toMatchObject({ token: expect.any(String) });
    });



});


describe("PUT /api/v2/carts/id  <<Correctos>>", () => {
    
    test("200, Update VACIO a un usuario existente SIN carro", async () => {
        const token = await generateJWT({role:'god'});
        
        const data={};
        
        const { body, statusCode } = await request(app).put(`/api/v2/carts/1`).auth(token,{type: 'bearer'}).send(data);
        
        expect(statusCode).toEqual(200);
        expect(body.msg).toEqual('Total $ 0');


    });

    test("200, Update a un carrito, se actualiza con 1 producto existente", async () => {
        const token = await generateJWT({role:'god'});
        
        const data=[{
                "fk_id_product": 1,
                "quantity": 2
        }];
        
        const { body, statusCode } = await request(app).put(`/api/v2/carts/1`).auth(token,{type: 'bearer'}).send(data);
        console.log("sadmmasmdkasdmlkjds");
        
        console.log(body);
        expect(statusCode).toEqual(200);
        //expect(body.msg).toEqual('Total $ 140000.00');

    });

    test("200, Update Vacio, a usuario CON carro", async () => {
        const token = await generateJWT({role:'god'});
        
        const data={};
        
        const { body, statusCode } = await request(app).put(`/api/v2/carts/1`).auth(token,{type: 'bearer'}).send(data);
        
        expect(statusCode).toEqual(200);
        expect(body.msg).toEqual('Total $ 0');


    });

    test("200, Update a un carrito con un producto con stok LIMITADO", async () => {
        const token = await generateJWT({role:'god'});
        
        const data=[{
                "fk_id_product": 2,
                "quantity": 357
        }];
        
        const { body, statusCode } = await request(app).put(`/api/v2/carts/1`).auth(token,{type: 'bearer'}).send(data);

        

        expect(statusCode).toEqual(200);
        expect(body.productos2.length).toBeGreaterThan(0);

    });

    test("200, Update Vacio, a usuario CON carro", async () => {
        const token = await generateJWT({role:'god'});
        
        const data={};
        
        const { body, statusCode } = await request(app).put(`/api/v2/carts/1`).auth(token,{type: 'bearer'}).send(data);
        
        expect(statusCode).toEqual(200);
        expect(body.msg).toEqual('Total $ 0');


    });

    test("200, Update a un carrito con un producto con SIN stok(0)", async () => {
        const token = await generateJWT({role:'god'});
        
        const data=[{
                "fk_id_product": 4,
                "quantity": 17
        }];
        
        const { body, statusCode } = await request(app).put(`/api/v2/carts/1`).auth(token,{type: 'bearer'}).send(data);

        expect(statusCode).toEqual(200);
        expect(body.productos3.length).toBeGreaterThan(0);

    });

    test("200, Update a un carrito con mas de un producto", async () => {
        const token = await generateJWT({role:'god'});
        
        const data=[{
                "fk_id_product": 1,
                "quantity": 2 },
                {
                "fk_id_product": 2,
                "quantity": 3 },
        ];
        
        const { body, statusCode } = await request(app).put(`/api/v2/carts/1`).auth(token,{type: 'bearer'}).send(data);
        console.log("sadmmasmdkasdmlkjds");
        
        console.log(body);
        expect(statusCode).toEqual(200);
        expect(body.productos.length).toBeGreaterThan(1);

    });
    
    test("200, Update Vacio, a usuario CON carro", async () => {
        const token = await generateJWT({role:'god'});
        
        const data={};
        
        const { body, statusCode } = await request(app).put(`/api/v2/carts/1`).auth(token,{type: 'bearer'}).send(data);
        
        expect(statusCode).toEqual(200);
        expect(body.msg).toEqual('Total $ 0');


    });

    test("200, Update a un carrito con productos con DISTINTOS stocks", async () => {
        const token = await generateJWT({role:'god'});
        
        const data=[{
                "fk_id_product": 1,
                "quantity": 5 },
                {
                "fk_id_product": 2,
                "quantity": 15 },
                {
                "fk_id_product": 3,
                "quantity": 17 },
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
        console.log("sadmmasmdkasdmlkjds");
        
        console.log(body);
        expect(statusCode).toEqual(200);
        expect(body.productos.length).toBeGreaterThan(1);
        expect(body.productos2.length).toBeGreaterThan(1);
        expect(body.productos3.length).toBeGreaterThan(1);

    });
    
    test("200, Update Vacio, a usuario CON carro", async () => {
        const token = await generateJWT({role:'god'});
        
        const data={};
        
        const { body, statusCode } = await request(app).put(`/api/v2/carts/1`).auth(token,{type: 'bearer'}).send(data);
        
        expect(statusCode).toEqual(200);
        expect(body.msg).toEqual('Total $ 0');


    });

    test("200, Update and Get of guest diaa wat,que decia", async () => {/////cuidado
        const token = await generateJWT({role:'guest', id_user: 3});
        ///las dos juntas                      guest
        
        const data=[
            {
                "fk_id_product": 2,
                "quantity": 15 },
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
    test("200, Update Vacio, a usuario CON carro", async () => {
        const token = await generateJWT({role:'god'});
        
        const data={};
        
        const { body, statusCode } = await request(app).put(`/api/v2/carts/3`).auth(token,{type: 'bearer'}).send(data);
        
        expect(statusCode).toEqual(200);
        expect(body.msg).toEqual('Total $ 0');


    });

});



describe("PUT /api/v2/carts/id  <<Incorrecto>>", () => {


    test("404, Update a un usuario que no existe", async () => {
        const token = await generateJWT({role:'god'});
        
        const data={};
        
        const { body, statusCode } = await request(app).put(`/api/v2/carts/342`).auth(token,{type: 'bearer'}).send(data);
        
        expect(statusCode).toEqual(404);
        expect(body.msg).toEqual('No encuentra el usuario');


    });
    test("401, Update, No tenes permiso de modificar este carro", async () => {
        const token = await generateJWT({role:'guest', id_user: 3});

    
        const { body, statusCode } = await request(app).put('/api/v2/carts/2').auth(token,{type: 'bearer'});;
        
        //console.log(body);
        expect(statusCode).toEqual(401);
        expect(body.Mensaje).toEqual('No tienes permisos');
        //expect(body).toMatchObject({ token: expect.any(String) });
    });

    

});


describe("Base de datos apagada para los endpoint", () => {

    
    test("500, Falla la base de datos", async ()=>{
        const token = await generateJWT({role:'god'});
        
        await db.sequelize.close();
        const { body, statusCode } = await request(app).get('/api/v2/carts/3').auth(token,{type: 'bearer'});
        
        expect(statusCode).toEqual(500);
        expect(body.Mensaje).toEqual('Server error');
    });
    
    
    
    
    test("500, Falla la base de datos", async ()=>{
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

describe("Errores en endpoints", () => {

    test("400, GET bad request en el enpoint", async ()=>{
        const token = await generateJWT({role:'god'});
        
        const {statusCode } = await request(app).get('/api/v2/carts/3/asdd/dsad/sa#$%').auth(token,{type: 'bearer'});
        
        expect(statusCode).toEqual(400);
        ;
    });

    test("400, PUT bad request en el enpoint", async ()=>{
        const token = await generateJWT({role:'god'});
        data={};

        const {statusCode } = await request(app).put('/api/v2/carts/76/sda/sd*&&^^').auth(token,{type: 'bearer'}).send(data);
        
        expect(statusCode).toEqual(400);
        
    });

    test("400, POST bad request en el enpoint", async ()=>{
        const token = await generateJWT({role:'god'});
        data={};

        const {statusCode } = await request(app).post('/api/v2/carts/300/asdd/qwe/uim/LMAO').auth(token,{type: 'bearer'}).send(data);
        
        expect(statusCode).toEqual(400);
        
    });

    test("400, DELETE bad request en el enpoint", async ()=>{
        const token = await generateJWT({role:'god'});
        
        const { body, statusCode } = await request(app).delete('/api/v2/carts/3/que/cosa').auth(token,{type: 'bearer'});
        
        expect(statusCode).toEqual(400);
        expect(body.Mensaje).toEqual('Bad Request.');
    });

})