const express = require('express')
const { Socket } = require('dgram')
const app = express()
const http = require('http').createServer(app)

const PORT = process.env.PORT || 3000

http.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})


app.use(express.static(__dirname + '/public'))

app.get('/',(req,res) => {
    res.sendFile(__dirname + '/index.html')
})

//Socket.io

const io = require('socket.io')(http)

io.on('connection',(socket) => {
    console.log('Connected...')

    socket.on('message',(msg)=>{
socket.broadcast.emit('message',msg)
    })
})


/*const user =  {};
io.on('connection', socket =>  {

    socket.on('new-user-joined', name => {
 
        user[socket.id]=name;
        socket.broadcast.emit('user-joined' , name)
        console.log("New User" , name)
    })

})*/