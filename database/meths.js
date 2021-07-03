const pool = require('./postgres')
const { request, response } = require("express");


const add_user = (request,response) => {
    const query = 'insert into usuario (nome,email) values ($1,$2)'
    const user = [request.params.nome,request.params.email]
    pool.query(query,user,(error,res) => {
        if(error) throw error
        console.log(`${res.command} ${res.rowCount}`)
        response.status(200).json({ query: `${res.command} ${res.rowCount}` })
    })
}

module.exports = {add_user}