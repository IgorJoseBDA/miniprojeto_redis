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
app.get('/usuarios',meths.search_user)
app.get('/rascunho/:id/:rascunho',meths.set_draft_user)
app.get('/rascunho/:id',meths.get_draft_user)

//Abrindo Porta
app.listen(process.env.PORT,() => {
    console.log("=-=-= Servidor Ativo =-=-=")
})