const pool = require('./postgres')
const redis = require('./redis')
const { request, response } = require("express");
const e = require('express');


const add_user = (request,response) => {
    const query = 'insert into usuario (nome,email) values ($1,$2)'
    const user = [request.params.nome,request.params.email]
    pool.query(query,user,(error,res) => {
        if(error) throw error
        console.log(`${res.command} ${res.rowCount}`)
        response.status(200).json({ query: `${res.command} ${res.rowCount}` })
    })
}

const delete_user = (request, response) => {
    const query = 'DELETE FROM usuario WHERE id = ($1)' 
    const user = [request.params.id]
    pool.query(query,user, (error,res) => {
        if(error) throw error 
        console.log(`${res.command} ${res.rowCount}`)
        response.status(200).json({ query: `${res.command} ${res.rowCount}` })
    })
}

const update_user = (request, response) => {
    const query = 'UPDATE usuario SET nome = ($1) WHERE id = ($2)'
    const user = [request.params.nome, request.params.id]
    pool.query(query,user, (error,res) => {
        if(error) throw error
        console.log(`${res.command} ${res.rowCount}`)
        response.status(200).json({ query: `${res.command} ${res.rowCount}` })
    })
}

const search_user = (request, response) => {
    const user = [request.params.id]
    redis.get(user, (error,reply) => {
        if(reply != null){
            console.log("O usuario foi encontrado no banco REDIS!")
            response.status(200).json([{user: parseInt(user), nome: reply}])
        }
        else{
            pool.query("SELECT * FROM usuario WHERE id = ($1)", user, (error, results) => {
                if(error) throw error
                else if(results.rows.length > 0){
                    console.log("O usuario já estava cadastrado no banco POSTGRES")
                    response.status(200).json(results.rows)
                    redis.setex(results.rows[0].id,7200,results.rows[0].nome , (err,res) => {
                        if(err) throw err;
                        console.log('O usuario foi encontrado no banco do postgres e foi adicionado no banco redis com tempo de 2 horas')
                    })
                }
            })
        }
    })
}

module.exports = {add_user,delete_user,update_user,search_user}