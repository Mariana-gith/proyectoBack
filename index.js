const express = require('express')

const app = express()
const reouters = require("./routes/index")
const http = require('http')
const server = http.createServer(app)
const io = require('socket.io')(server) 

const port = process.env.PORT || 3001


let msj= [] 


//configuracion

app.use(express.static(__dirname+ "/public"))


// websocket

io.on("connection",(socket)=>{

    console.log('cliente conectado')

    socket.on("menssege_back", (data)=>{
        console.log(data)
    })

    socket.on("msn__client",(data)=>{
        console.log(data)
        msj.push(data)
        console.log(msj)
       // socket.emit("menssenge_client", msj)
       io.sockets.emit("menssenge_client",msj)
    })

});

//Router

app.use("/api", reouters)



server.listen(port,()=>{
    console.log('server ok!!',port)
})