const connection = require('../database/connection');

module.exports = {
    async index(request, response) {
        const { page = 1 } = request.query;

        const [count] = await connection('incidents')
            .count();

        console.log(count)

        const incidents = await connection('incidents')
            .join('ongs', 'ongs.id', '=', 'incidents.ong_id')   // Busco o ID na tabela ong IGUAL ao id na tabela Incidents
            .limit(5)
            .offset((page - 1) * 5) // Mostra sempre 5 registros na página
            .select([
                'incidents.*', 
                'ongs.name',
                'ongs.email', 
                'ongs.whatsapp',
                'ongs.city', 
                'ongs.uf'
            ]);

        response.header('X-Total-Count', count['count(*)']);

        return response.json(incidents);
    },

    async create(request, response) {
        const { title, description, value } = request.body;
        const ong_id = request.headers.authorization; // Código gerado no cadastro da ONG, no Header dos Incidents

        const [id] = await connection('incidents').insert({
            title,
            description,
            value,
            ong_id,
        });

        return response.json({ id });
    },

    async delete(request, response) {
        const { id } = request.params;
        const ong_id = request.headers.authorization;

        const incident = await connection('incidents')
            .where('id', id)
            .select('ong_id')
            .first();

        if (incident.ong_id !== ong_id) {
            return response.status(401).json({ error: 'Operation not permitted.' }); // Código de "não autorizado", quando o usuário não tem autorização na ação
        }

        await connection('incidents').where('id', id).delete();

        return response.status(204).send(); // Código para quando não tem resposta nenhuma, incidente excluido com sucesso.
    }
};