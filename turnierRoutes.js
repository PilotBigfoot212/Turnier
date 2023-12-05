const express = require('express');
const TurnierController = require('./src/controllers/turnierController.js');

class TurnierRouter {
    constructor() {
        this.router = express.Router();
        this.turnierController = new TurnierController();
        this.initializeRoutes();
    }

    initializeRoutes() {
        this.router.get('/', this.turnierController.getTurniere.bind(this.turnierController));
        this.router.get('/', (req, res) => {
            res.sendFile(path.join(__dirname, '..', 'index.html'));
        });

        this.router.get('/turnier', this.turnierController.getTurniere.bind(this.turnierController));


       
        this.router.get('/create-turnier', (req, res) => {
            res.sendFile(path.join(__dirname, 'app', 'turnier', 'create-turnier', 'create-turnier.html'));
        });

        this.router.post('/create-turnier', (req, res) => {
            res.sendFile(path.join(__dirname, 'app', 'turnier', 'create-turnier', 'create-turnier.html'));
        });
    }

    getRouter() {
        return this.router;
    }
}

module.exports = TurnierRouter;