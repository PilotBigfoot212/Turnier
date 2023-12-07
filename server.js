const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const turnierRoutes = require('./routes/turnierRoutes'); 

require('dotenv').config();

const app = express();

app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

// Serve files from node_modules
app.use('/node_modules', express.static(path.join(__dirname, 'node_modules')));

app.use('/public/styles', express.static(
    path.join(__dirname, 'public', 'styles'),
    {
        setHeaders: (res) => {
            res.type('text/css');
        },
    }
));
app.use(turnierRoutes);

const Turnier = require('./models/turnierModel');

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'html', 'index.html'));
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
