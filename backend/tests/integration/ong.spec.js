const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');

describe('ONG', () => {
    beforeEach(async () => {    
        await connection.migrate.roolback();
        await connection.migrate.latest();
    });    
    
    afterAll(async () => {
        await connection.destroy();
    }); // Executa após tudo. Após realizar a conexão e realizar a inserção da ONG

    it('should be able to create a new ONG', async () => {
        const response = await request(app)
        .post('/ongs')
        .send({
            name: "APAD 2",
            email: "contato@apad.com.br",
            whatsapp: "4700000000",
            city: "Gravatai",
            uf: "RS"
        });

        expect(response.body).toHaveProperty('id');
        expect(response.body.id).toHaveLength(8);
    });
});