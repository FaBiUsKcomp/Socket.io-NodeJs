//Defines

const port = 4000
const pageBaseUrl = __dirname + '/pages/' //Diretory base of all static pages

//Socket + Express

const express = require('express')
const app = express()
const http = require('http').createServer(app)
const io = require('socket.io')(http)

//Middlewares

const bodyparser = require('body-parser')
app.use(bodyparser.json())
app.use('/static', express.static(__dirname + '/pages/'))
app.use('/static', express.static(__dirname + '/static/'))

//REST functions

app.get('/', (req, res) => {
    res.sendFile(pageBaseUrl + 'chat.html')
})

//Socket.io functions

io.on('connection', (socket) => {
    
    //console.log('Um usuário conectou!')
    socket.broadcast.emit('user connected', `${socket.id} está conectado!`)
    socket.on('disconnect', () => io.emit('user disconnect', `${socket.id} se desconectou!`))
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg)
    })
})

http.listen(port, () => console.log(`Rodando na Porta ${port}`))