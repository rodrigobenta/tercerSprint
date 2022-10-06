const {app} = require("../app");
const request = require("supertest");
const jwt = require('../helpers/generateJWT');

describe('Tests de token', () => {
    test('Token invalido', async () => {
        const {statusCode, body} = await request(app).get('/api/v2/users').auth(null, { type: 'bearer' }); 
        expect(statusCode).toEqual(401);
        expect(body).toEqual(expect.objectContaining({
            ok: expect.any(Boolean),
            msg: expect.any(String)
        }));
    });
    // test('rejects to No se pudo crear el token', async () => {
    //     try{
    //         await jwt();
    //     }catch(error){
    //         expect(error).toEqual(expect.any(String))
    //     }
        
    // }); 
})
