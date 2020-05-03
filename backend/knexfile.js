// Update with your config settings.

module.exports = {

  development: {  // AMBIENTE DE DESENVOLVIMENTO
    client: 'sqlite3',
    connection: {
      filename: './src/database/db.sqlite' // Arquivo que vai armazenar os dados da minha base
    },
    migrations: {
      directory: './src/database/migrations'
    },
    useNullAsDefault: true,
  },

  test: {  // AMBIENTE DE TESTE
    client: 'sqlite3',
    connection: {
      filename: './src/database/test.sqlite' // Arquivo de TESTE que vai armazenar os dados da minha base
    },
    migrations: {
      directory: './src/database/migrations'
    },
    useNullAsDefault: true,
  },

  staging: {  // AMBIENTE DE PRODUÇÃO PARA A EQUIPE DE DESENVOLVIMENTO
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: { // AMBIENTE DE PRODUÇÃO
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
