const express = require('express')
const mongoose = require('mongoose');
require('dotenv').config()

const Turnier = require('./models/turnierModel')
const app = express()

app.use (express.json())

//routes

app.get('/', (req, res) => {
    res.send('Hello NODE API')
}) 

app.get('/blog', (req, res) => {
res.send('Hello Blog my name is Amanda')
})

app.post('/turnier',async(req, res) => {
     try{
        const turnier = await Turnier.create (req.body)
        res.status(200).json(turnier);

   } catch (error){
       console.log (error.message);
       res.status(500).json({message: error.message})
    }
 })

mongoose.
connect(process.env.DATABASE_URL)
.then (() => {
    app.listen(3000, ()=> {
        console.log('Node API app is running on port 3000')
    })

    console.log('connected to MongoDB')
}).catch ((error) => {
    console.log(error)
})

