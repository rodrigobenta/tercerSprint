
const {app} = require("../app");
const request = require("supertest");
const db = require("../database/models");
const babel = require("../babel.config");
const {generateJWT} = require('../helpers/generateJWT');
const bcrypt = require("bcrypt");
const { sequelize } = require('../database/models');
const jwt = require('jsonwebtoken');



describe('probando', () => {
    // test("Listar usuarios con token roto" , async() => {
    //     const token3 = await jwt(null);

    //     console.log(token3);
    //     expect(token3).rejects(expect.any(String));
        
    // });

    test('rejects to No se pudo crear el token', async () => {
        await expect(jwt.reject(new Error('No se pudo crear el token'))).rejects.toThrow('No se pudo crear el token');
      });
})
