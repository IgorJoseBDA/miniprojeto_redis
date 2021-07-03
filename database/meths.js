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
    pool.query("SELECT * FROM usuario", (error, results) => {
        if(error){
            response.status(400).send(err);
        }
        else if (results.rowCount== 0) {
            response.status(200).json({message: "Não existe nenhum usuario cadastrado até o momento, tente adicionar um novo usuario"});

        } 
        else {
            response.status(200).json(results.rows);
        }
    })
}

const set_draft_user = (request, response) => {
    const id = request.params.id
    const draft = request.params.rascunho

    redis.setex(id, 7200, draft, (error, res) => {
        if(error){
            response.status(400).send(error)
        }
        else{
            response.status(200).json([{id: id, draft: draft}])
        }
    })
}

const get_draft_user = (request, response) => {
    const id = request.params.id 
    redis.get(id, (error, reply) => {
        if(reply != null){
            response.status(200).json({ id: id, draft: reply });
        }
        else {
            response.status(400).send({message: 'O Rascunho não foi encontrado'})
        }
    })
}

module.exports = {add_user,delete_user,update_user,search_user,set_draft_user,get_draft_user}