const redis = require('redis');

const bd_redis = redis.createClient({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT
});

bd_redis.on("connect", () => {
    console.log("=-=-= Banco redis conectado! =-=-=")
});

bd_redis.on("error", function(error){
    console.log(error)
})

module.exports = bd_redis