const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser'); 

require('dotenv').config();

const TurnierRouter = require('./src/app/turnier/turnierRoutes');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.log('Error connecting to MongoDB:', error);
    });

const turnierRouter = new TurnierRouter();
app.use('/api', turnierRouter.getRouter()); 

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
