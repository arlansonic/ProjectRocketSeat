import "dotenv/config"
import express from "express";
import { router } from './routes'

const app = express()
app.use(express.json())
app.use(router)

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

app.listen(4000, () => console.log('Server is Running PORT 4000'))