//Importando o modulo express no nosso index
const express = require('express'); //e variavel 'express' contem todas as funcionalidade do framework express!!!! UM PACOTE
const cors = require('cors');
const routes = require('./routes');

//armazenado aplicação, para dar a possibilidade de utilização de seus metodos como o "get" & "listen"
const aplicacao = express(); //de onde vem esta função?????, criando uma aplicação, responsavel pelas funcionalidades, "rotas"

//define seguranças de acesso 
aplicacao.use(cors());

//fazendo com que o express entendo formato JSON
aplicacao.use(express.json());
aplicacao.use(routes);


/**
 *  Métodos HTTP
 * 
 * GET - Buscar uma informação no back-end
 * POST - Criar uma informação no back-end
 * PUT - Alterar uma informção no back-end
 * DELETE - Deletar uma informação no back-end
 * 
 * Tipos de parametros 
 * 
 * Query params: Parametros nomeados enviados na rota apos o "?" (paginação, filtro)
 * Route params: Parametros utilizados para identificar recursos
 * Requeste body: corpo da requisição, utilizado para alterar ou criar recuros
 * 
 * 
 */


//app ira ouvir a porta 3333, porta de acesso do nosso server, ouvindo as requisoções do navagador padrão
aplicacao.listen(3333);