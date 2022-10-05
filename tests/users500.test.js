const {app} = require("../app");
const request = require("supertest");
const db = require("../database/models");
const babel = require("../babel.config");
const jwt = require('../helpers/generateJWT');
const { sequelize, QueryTypes} = require('sequelize');


describe("Chequeo 500 Server error", () => {
    beforeAll(() => {
        db.sequelize.close();
    });
    
    test("Server error 500 Login", async () => {
        const user = {username:"god", password: "123456"};
        const{statusCode, body} = await request(app).post('/api/v2/users/login').send(user);
        expect(statusCode).toBe(500);
        expect(body).toEqual(expect.objectContaining({msg: 'Server error.'}));
    })

    test("Server error 500 listar Usuarios", async () => {
        const token = await jwt({ role: 'god' });
        const {statusCode, body} = await request(app).get('/api/v2/users').auth(token, { type: 'bearer' });
        expect(statusCode).toBe(500);
        expect(body).toEqual(expect.objectContaining({msg: 'Server error.'}));
    });

    test("Server error 500 listar Usuarios por ID", async () => {
        const idUrl = 1;
        const token = await jwt({ role: 'god', id_user: idUrl});
        const {statusCode, body} = await request(app).get('/api/v2/users/'+idUrl).auth(token, { type: 'bearer' });

        expect(statusCode).toBe(500);
        expect(body).toEqual(expect.objectContaining({msg: 'Server error.'}));
    });

    test("Server error 500 crear Usuario", async () => {
        let random = parseInt(Math.random() * (1000000 - 0) + 0)
        const user = {
            email: "usuario"+random+"@gmail.com",
            username: "usuario"+random,
            password: "password"+random,
            firstname: "primernombre"+random,
            lastname: "segundonombre"+random,
            role: "god",
            profilepic: "nopic"
        }
        const {statusCode, body} = await request(app).post('/api/v2/users').send(user);
        console.log(body);
        expect(statusCode).toBe(400);
    });

    test("Server error 500 editar Usuario", async () => {
        const token = await jwt({ role: 'god', id_user: 1});
        let random = parseInt(Math.random() * (1000000 - 0) + 0);
        const userData = {
            firstname: "primernombre"+random,
            lastname: "segundonombre"+random
        }
        const {statusCode, body} = await request(app).put(`/api/v2/users/1`).auth(token, { type: 'bearer' }).send(userData);
        expect(statusCode).toBe(500);
        expect(body).toEqual(expect.objectContaining({msg: 'Server error.'}));
    });

    test("Server error 500 eliminar Usuario", async () => {
        const userId = 1; //un usuario god con id 1.
        const token = await jwt({ role: 'god', id_user: userId});
        let {statusCode, body} = await request(app).delete(`/api/v2/users/${userId}`).auth(token, {type: 'bearer'});
        expect(statusCode).toBe(500);
        expect(body).toEqual(expect.objectContaining({msg: 'Server error.'}));
    });

});