const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

require('dotenv').config();

const app = express();

app.use(express.json());

const Turnier = require('./src/models/turnierModel');

//Ge
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});


// GET-Endpunkt für die Erstellung von Turnieren
app.get('/create-turnier', (req, res) => {
    res.sendFile(path.join(__dirname, './src/app/turnier/create-turnier/create-turnier.html'));
});

// Post Endpunkt für die Erstellung von Turnieren
app.post('/create-turnier', async (req, res) => {
    try {
        console.log('Received data:', req.body)
        const turnier = await Turnier.create(req.body);
        res.status(200).json(turnier);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
});




mongoose
    .connect(process.env.DATABASE_URL)
    .then(() => {
     app.listen(3000, () => {
            console.log('Server is Running on port 3000');
        });

        console.log('connected to MongoDB');
    })
    .catch((error) => {
        console.log('Error connecting to MongoDB:', error);
    });
