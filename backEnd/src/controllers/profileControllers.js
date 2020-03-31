const connection = require('../database/connection');

module.exports = {
    async index(request, response){

        //buscando uma ong especifica, ou seja, logada
        const ongsId = request.headers.autorizacao;

        //Buscando todos os incidente que um ong especifica criou!! Buscando todos os campos
        const incidents = await connection('incidents').where('ongsId', ongsId).select('*');

        return response.json(incidents);
    }
};