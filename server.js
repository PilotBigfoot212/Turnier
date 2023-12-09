const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const turnierController = require('./controllers/turnierController');


require('dotenv').config();

const app = express();

app.use(express.json());

app.use(express.static('public'));

app.use('/node_modules', express.static(path.join(__dirname, 'node_modules')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'html', 'index.html'));
});

app.get('/recent-turniere', async (req, res) => {
     await turnierController.getRecentTurniere(req, res);
});

app.post('/api/create-turnier', async (req, res) => {
   await turnierController.createTurnier(req,res);
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
