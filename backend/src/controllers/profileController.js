const connection = require('../database/connection');

module.exports = {
    async index(request, response ){
        const organizador_id = request.headers.authorization;

        const evento = await connection('evento')
        .where('organizador_id', organizador_id)
        .select('*');

        return response.json(evento);
    }    
}