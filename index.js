require('dotenv').config()                          //Camuflar a porta
const express = require('express')
const connection = require('./database/postgres')   //Conectando o banco  
const redis = require('./database/redis')
const app = express()
const meths = require('./database/meths')

//Criando Rota
app.get('/cadastrar/:nome/:email',meths.add_user)
app.get('/deletar/:id',meths.delete_user)
app.get('/editar/:id/:nome',meths.update_user)
app.get('/usuario/:id/:rascunho',meths.draft_user)

//Abrindo Porta
app.listen(process.env.PORT,() => {
    console.log("=-=-= Servidor Ativo =-=-=")
})