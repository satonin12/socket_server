const express = require('express')
// const config = require('config')
// const mongoose = require('mongoose')
const socket = require('socket.io')
// const proxy = require('http-proxy-middleware')
const _http = require('http')
const cors = require('cors')
// const path = require('path')

const PORT = 5000

// server
const app = express()

// app.use(proxy('/api/*', { target: 'http://localhost:5000' }))

const server = _http.createServer(app)
//
// if (process.env.NODE_ENV == 'production') {
//   app.use(express.static(path.resolve(__dirname, 'client', 'build')))
//
//   app.get('*', (req, res) => {
//     console.log('зашли в путь /*')
//     res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
//   })
// }

server.listen(PORT, () =>
  console.log(`App has been started on port ${PORT}...`)
)

// socket
const io = socket(server, {
  allowEIO3: true, // false by default
  cors: {
    origin: 'http://localhost:3002',
    methods: ['GET', 'POST'],
    credentials: true,
  },
})

app.use(cors())

const users = {}
const socketToRoom = {}

io.on('connection', (socket) => {
  console.log(`${socket.id} is connected...`)
  
  socket.on('typing', (keyCode) => {
    console.log('keyCode: ', keyCode);
  })
})
