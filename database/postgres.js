const Pool = require('pg').Pool

const pool = new Pool({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT
    // user: 'postgres',
    // host: 'localhost',
    // database: 'banco',
    // password: 'postgres',
    // port: 5432
})

pool.connect().then(() => {
    console.log('=-=-= Conectado com sucesso =-=-=')
}).catch((error) => {
    console.log(error)
})

module.exports = pool