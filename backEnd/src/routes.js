//pacote express
const express = require('express');

//importanto o nosso ongsControllers no routes.js
const ongsControllers = require('./controllers/ongsControllers');

//importando os nossos incidentsControllers no routes.js
const incidentsControllers = require('./controllers/incidentsControllers');

//Importando os nosso profileControllers
const profileControllers = require('./controllers/profileControllers');

//Importando o nosso sessionControllers
const sessionControllers = require('./controllers/sessionControllers');

//Desacoplando o modulo do express e armazenando as rotas na costante "routes"
const routes = express.Router();

//logando no sistema, rota de sessão, rota de login
routes.post('/session', sessionControllers.create);

//Listando ongs
routes.get('/ongs', ongsControllers.index);

//Criando ongs
routes.post('/ongs', ongsControllers.create);

//listando casos
routes.get('/incidents', incidentsControllers.index);

//listando casos especificos de um ong
routes.get('/profile', profileControllers.index);

//Criando casos
routes.post('/incidents', incidentsControllers.create);

//Deletando um caso
routes.delete('/incidents/:id', incidentsControllers.delete);



//exportando uma variavel de dentro de um arquivo, para ser utilizada no nosoo arquivo de index
module.exports = routes;