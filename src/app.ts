import "dotenv/config"
import express from "express";
import { router } from './routes'
import http from 'http'
import cors from 'cors'
import { Server, Socket } from "socket.io"

const app = express()
app.use(express.json())
app.use(router)
app.use(cors)

const serverHttp = http.createServer(app)

const io = new Server(serverHttp, {
    cors: {
        origin: '*'
    }
})

io.on('connection', (socket) => {
    console.log(`Usuário conectado no Socket ${socket.id}`)
})

app.get('/github', (req, res) => {
    res.redirect(`http://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}`)
})

app.get('/signin/callback', (req, res) => {
    const { code } = req.query

    return res.json(code)
})

app.get('/', (req, res) => {
    res.send('Api is Running on: 4000')
})

export { serverHttp, io }