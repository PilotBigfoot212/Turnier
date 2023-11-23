const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

require('dotenv').config();

const app = express();

app.use(express.json());

const Turnier = require('./models/turnierModel');

app.post('/erstellen-turnier', async (req, res) => {
    try {
        console.log('Received data:', req.body)
        const turnier = await Turnier.create(req.body);
        res.status(200).json(turnier);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
});
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// GET-Endpunkt für die HTML-Seite
app.get('/erstellen-turnier', (req, res) => {
    res.sendFile(path.join(__dirname, 'erstellen-turnier.html'));
});

mongoose
    .connect(process.env.DATABASE_URL)
    .then(() => {
        app.listen(3000, () => {
            console.log('Node API app is running on port 3000');
        });

        console.log('connected to MongoDB');
    })
    .catch((error) => {
        console.log(error);
    });
