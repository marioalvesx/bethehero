const knex = require('knex');
const configuration = require('../../knexfile');

const connection = knex(configuration.development); // Ambiente de Development dentro do knexfile.js

module.exports = connection;