const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const turnierRoutes = require('./routes/turnierRoutes'); 


require('dotenv').config();

const app = express();

app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));


app.use('/node_modules/@smartdesign', express.static(
    path.join(__dirname, 'node_modules', '@smartdesign'),
    {
        setHeaders: (res) => {
            res.type('application/javascript');
        },
    }
));

app.use('/src/style', express.static(
    path.join(__dirname, 'src', 'style'),
    {
        setHeaders: (res) => {
            res.type('text/css');
        },
    }
));
app.use('/turnier', turnierRoutes);

const Turnier = require('./models/turnierModel');

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,'public','html', 'index.html'));
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
