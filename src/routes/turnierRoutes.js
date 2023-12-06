const express = require('express');
const path = require('path');
const turnierController = require('../controller/turnierController');

class TurnierRoutes {
    constructor() {
        this.router = express.Router();
        this.initializeRoutes();
    }

    initializeRoutes() {
        this.router.get('/', (req, res) => {
            res.sendFile(path.join(__dirname, '../../index.html'));
        });

        this.router.get('/create-turnier', (req, res) => {
            res.sendFile(path.join(__dirname, '../app/turnier/create-turnier/create-turnier.html'));
        });
        this.router.get('/turniere', async (req, res) => {
            try {
                const turniere = await turnierController.getTurniere(req, res);
                res.sendFile(path.join(__dirname, '../app/turnier/suche-turnier/anzeige-turnier.html'), { turniere });
            } catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
        this.router.get('/spielplan', (req, res) => {
            res.sendFile(path.join(__dirname, '../app/turnier/perform-turnier/spielplan.html'));
        });
        
        this.router.get('/recent-turniere', async (req, res) => {
            try {
                const recentTurniere = await Turnier.find().sort({ _id: -1 }).limit(5);
                res.status(200).json(recentTurniere);
            } catch (error) {
                console.log(error.message);
                res.status(500).json({ message: error.message });
            }
        });
     
       // this.router.get('/turniere', turnierController.getTurniere);
        this.router.post('/create-turnier', turnierController.createTurnier);
    }

    getRouter() {
        return this.router;
    }
}

module.exports = TurnierRoutes;