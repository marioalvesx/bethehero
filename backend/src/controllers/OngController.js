const crypto = require('crypto');
const connection = require('../database/connection')

module.exports = {
    async index (request, response) {  // Listar ONGS
        const ongs = await connection('ongs').select('*');
    
        return response.json(ongs);
    },
    
    async create(request, response) {
        const { name, email, whatsapp, city, uf } = request.body; // Desestruturação de dados - Impede que o usuário insira mais do que foi solicitado.

        const id = crypto.randomBytes(4).toString('HEX');
    
        await connection('ongs').insert({
            id,
            name,
            email,
            whatsapp,
            city,
            uf,
        })
    
        return response.json({ id });
    }
}