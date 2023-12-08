const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

require('dotenv').config();

const app = express();

app.use(express.json());
app.use(cors());

app.use(express.static('public'));

app.use('/node_modules', express.static(path.join(__dirname, 'node_modules')));


const Turnier = require('./models/turnierModel');

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'html', 'index.html'));
});

app.get('/recent-turniere', async (req, res) => {
    try {
        const recentTurniere = await Turnier.find().sort({ _id: -1 }).limit(5);
        res.status(200).json(recentTurniere);
      } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: error.message });
      };
});

app.post('/api/create-turnier', async (req, res) => {
    try {
        const tournamentData = req.body;
        const createdTurnier = await Turnier.create(tournamentData);
        res.status(201).json(createdTurnier);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Fehler beim Erstellen des Turniers' });
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
