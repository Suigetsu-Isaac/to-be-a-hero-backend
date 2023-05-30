import request from 'supertest';
import app from '../../src/app';
import connection from '../../src/database/connection';
describe('ONG', () => {
    beforeEach( async () => {
        await connection.migrate.rollback();
        await connection.migrate.latest();
    });

    afterAll(async() => {
        await connection.destroy();
    } )

    it('shold be able to create a new ONG', async () => {
        const response = await request(app)
        .post('/ongs')
        .send({
            name : "APAE2",
            email : "apadapad@contatos.com.br",
            whatsapp: "+5587981222625",
            city : "Salgueiro",
            uf : "PE"
        });
        expect(response.body).toHaveProperty('id');
        expect(response.body.id).toHaveLength(8);
    } )
} );