//Chamdno o crypto do node
const crypto = require('crypto');
//Conectando com o banco
const connection = require('../database/connection');

//exportanto um objeto
module.exports = {

    //linstando ongs
    async index(request, response){
        //listando tudo e armazenando em ongs
        const ongs = await connection('ongs').select('*');

        return response.json(ongs);
    },

    //criando ongs
    async create(request, response){
        
        //Enviando uma requisição para nosso servre em json, modo de desestruturação
        const {name, email, whatsapp, city, uf} = request.body;

        //criando um numero aleatorio de 4 bytes, transformando em string do tipo hexadecimal??? armezena na variavel "id"
        const id = crypto.randomBytes(4).toString('HEX');

        //nome da tabela que eu quero inserir dados e logo depois utilizar o "insert({}) para inserir os dados"
        await connection('ongs').insert({
            id,
            name,
            email,
            whatsapp,
            city,
            uf
        });

        /**
         * 
         * E necessario retornar para o usuario somente quando o insert for finalizado!!
         * 
         * como fazemos isso? aparentemente utilizando o async na função  e o await na nossa connection
         * 
         *
         */

        //response em JSON
        return response.json({ id });
    }
    
};