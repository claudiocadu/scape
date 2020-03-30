const connection = require('../database/connection');

module.exports = {

    async create(request,response){
        const {id} = request.body;

        const organizador = await connection('organizador')
        .where('id', id)
        .select('name')
        .first();

        if(!organizador) {
            return response.status(400),json({error:'Organizador nçao entrontrado'});
        }
        return response.json(organizador);
    }
}