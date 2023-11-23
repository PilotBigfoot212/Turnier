const express = require('express')
const mongoose = require('mongoose');
require('dotenv').config()

const app = express()


//routes

app.get('/', (req, res) => {
    res.send('Hello NODE API')
}) 

app.get('/blog', (req, res) => {
res.send('Hello Blog my name is Amanda')
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

