require('dotenv').config()                          //Camuflar a porta
const express = require('express')
const connection = require('./database/postgres')   //Conectando o banco  
const app = express()
const meths = require('./database/meths')

//Criando Rota
app.get('/cadastrar/:nome/:email',meths.add_user)

//Abrindo Porta
app.listen(process.env.PORT,() => {
    console.log("=-=-= Servidor Ativo =-=-=")
})