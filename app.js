require('dotenv').config()
let Express = require('express')
let Router = require('./routes') 

let BodyParser = require('body-parser')

let app = Express()
const path = require('path')
const server = require("http").createServer(app)
const io = require("socket.io")(server)

const Port = process.env.PORT || 5000

io.on("connection",(socket)=>{

    socket.on("nick",(nick)=>{
        // console.log(nick)
        socket.username = nick;
    })

    socket.on("chat",(message)=>{
        // console.log(message);
        io.sockets.emit("chat",{msg:message,user:socket.username});
    })

})


app.use(Express.static(__dirname+'/public'))
app.set('view engine', 'ejs')
app.set('views', './public/views')
app.use(BodyParser.urlencoded({extended:false}))
app.use(BodyParser.json())
app.use(Router)   
server.listen(Port,()=>{
    console.log("Server is listening on : http://localhost:"+Port)
})
