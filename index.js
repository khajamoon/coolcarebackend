import express from 'express'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import  cors  from 'cors'
import user from './routes/routes.js'
import admin from './routes/adminroutes.js'

dotenv.config()

const app = express()

app.use(bodyParser.json())
app.use(cors())

app.get("/", (req, res)=>{
    res.json({"Hi":"Hello World"})
})

app.use('/api', user)
app.use('/api', admin)

const PORT = 8000

app.listen(PORT, () => {
    console.log(`Port listening on ${PORT}`)
})

