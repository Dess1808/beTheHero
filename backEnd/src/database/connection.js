const knex = require('knex');
const configuration = require('../../knexfile');

//criando uma conexão no banco atraves do arquivo knexfile.js, com a variavel que consta o caminho do arquivo "configuration"
const connection = knex(configuration.development)

/**
 * 
 * Depos de feito isso, basta exportar nossa conexão com o "module.export"
 */

 module.exports = connection;