const request = require('supertest');
const {app} = require("../app");
const generateJWT = require('../helpers/generateJWT');


describe('Bad request de main class', () => {

    test("400, GET bad request en el endpoint", async ()=>{
        const token = await generateJWT({role:'god'});
        
        const {statusCode } = await request(app).get('/dsad/sa#$%').auth(token,{type: 'bearer'});
        
        expect(statusCode).toEqual(400);
        
    });
    test("400, POST bad request en el endpoint", async ()=>{
        const token = await generateJWT({role:'god'});
        
        const {statusCode } = await request(app).post('/dsad/sa#$%').auth(token,{type: 'bearer'});
        
        expect(statusCode).toEqual(400);
        
    });
    test("400, PUT bad request en el endpoint", async ()=>{
        const token = await generateJWT({role:'god'});
        
        const {statusCode } = await request(app).put('/dsad/sa#$%').auth(token,{type: 'bearer'});
        
        expect(statusCode).toEqual(400);
        
    });
    test("400, DELETE bad request en el endpoint", async ()=>{
        const token = await generateJWT({role:'god'});
        
        const {statusCode } = await request(app).delete('/dsad/sa#$%').auth(token,{type: 'bearer'});
        
        expect(statusCode).toEqual(400);
        
    });
});
