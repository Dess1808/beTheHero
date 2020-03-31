const connection = require ('../database/connection');

module.exports = {
    async create(request, response){
        //pegando o id no corpo da requisição
        const { id } = request.body;

        //Buscando ong no banco
        const ong = await connection('ongs').where('id', id).select('name').first();

        //se não existir??? 
        if(!ong){
            return response.status(400).json({erro: 'Não foi encontrado ONG com esse nome'});
        };

        return response.json(ong);
    }
}