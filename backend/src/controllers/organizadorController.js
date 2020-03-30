const crypto = require('crypto');
const connection = require('../database/connection');

module.exports = {
    async index(request,response){
        const organizador = await connection('organizador').select('*');
        return response.json(organizador);
    },

    async create(request,response) {
        const {name, email, whatsapp, city, uf} = request.body;

        const id = crypto.randomBytes(4).toString('HEX');
        
        await connection('organizador').insert({
            id,
            name,
            email,
            whatsapp,
            city,
            uf,
        })
    
        return response.json({id});
    }
}