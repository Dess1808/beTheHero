const connection = require('../database/connection');

module.exports = {

    //lista os casos
    async index(request, response){
        //esquema de paginação
        const {page = 1} = request.query;

        //contando todos os campos da tabela, e armazenar em "count", metodo count(), conta todos os campos da nossa tabela
        const [count] = await connection('incidents').count();


        //listando tudo e atribuindo incidents, controlando o fluxo de conteudo, "offset() -> pular conteudo por pagina"
        const incidents = await connection('incidents')
        .join('ongs', 'ongs.id' , '=', 'incidents.ongsId') //Utilizando relacionamento para contruir informação
        .limit(5) //limiteando o conteundo por pagina em "5" itens
        .offset((page -1) * 5) //controlando o fluxo desse 5 conteudos
        .select('incidents.*',
        'ongs.name',
        'ongs.email',
        'ongs.whatsapp',
        'ongs.city',
        'ongs.uf'); 

        //Enviando o total pelo cabeçalho da response
        response.header('X-Total-Count', count['count(*)']);

        return response.json(incidents);
    },

    //Criando os casos
    async create(request, response) {

        const {title, description, value} = request.body;

        //pegando as informações do cabeçalho da requisição
        const ongsId = request.headers.autorizacao;

        //inserir as informações de title, description and value, desestruturando e retornando as informações em um array
        const [id] = await connection('incidents').insert({
            title,
            description,
            value,
            ongsId
        });
       
        return response.json({ id });
    },


    //Deletando um caso
    async delete(request, response){
        //buscando o id da ong
        const { id } = request.params;//Pegando o id na url
        const ongsId = request.headers.autorizacao; //pegando o id da ong

        //verificando se a ong que esta deletando um caso e realmente ela
        const incidents = await connection('incidents').where('id', id).select('ongsId').first(); //onde id for in ???

        if(incidents.ongsId !== ongsId){
            //retornando um erro em codigo http
            return response.status(401).json({erro: 'Operação não permitida'}); //401 não autorizado!q
        }

        //se users não for igual, então autorizada a operação de delete
        await connection('incidents').where('id', id).delete();// deletando registro

        return response.status(204).send(); //send() apenas envia a reposta sem corpo nenhum
    }
};