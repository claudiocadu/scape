const connection = require('../database/connection');

module.exports = {

    async index(request,response){
        const {page = 1} = request.query;
        
        const [count] = await connection('evento').count();

        
        const evento = await connection('evento')
        .join('organizador','organizador_id','=', 'evento.organizador_id' )
        .limit(5)
        .offset((page -1)*5)
        .select([
            'evento.*',
            'organizador.name as nome', 
            'organizador.email',
            'organizador.whatsapp',
            'organizador.city',
            'organizador.uf'
        ]);
        
        response.header('X-Total-Count', count['count(*)']); 

        return response.json(evento);
    },

    async create(request,response) {
        const {name, description, value } = request.body;
        const organizador_id = request.headers.autorization;

        const [id] = await connection('evento').insert({
            name,
            description,
            value,
            organizador_id,
        });


        return response.json({id});
    },

    async delete(request, response) {
        const{id} = request.params;
        const organizador_id = request.headers.autorization;

        const evento = await connection('evento')
         .where('id',id)
         .select('organizador_id')
         .first();
        if(evento.organizador_id != organizador_id){
            return response.status(401).json({error:'Operation not permitted '});
        }
        await connection('evento').where('id',id).delete();

        return response.status(204).send();

    }
}