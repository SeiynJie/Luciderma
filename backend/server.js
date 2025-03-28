import express from 'express'
import cors from 'cors'
import "dotenv/config"

// App config
const app = express()
const port = process.env.PORT || 4000 // Port from .env OR port 4000

// middlewares
app.use(express.json())
app.use(cors())

// API Endpoints 
app.get("/", (request, response)=>{
    response.send("API working Great")
})

// Start express app
app.listen(port, ()=>console.log("Server Started", port))