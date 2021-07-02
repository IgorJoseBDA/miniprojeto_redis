require('dotenv').config()              //Camuflar a porta
const express = require('express')      
const app = express()

//Criando Rota
app.get('/', (req,res) => {
    res.send("Igor José")
})

//Abrindo a Porta
app.listen(process.env.PORT,() => {
    console.log("=-=-= Servidor Ativo =-=-=")
})