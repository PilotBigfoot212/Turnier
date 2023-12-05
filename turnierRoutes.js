const express = require('express');
const TurnierController = require('../../controllers/turnierController');

class TurnierRouter {
    constructor() {
        this.router = express.Router();
        this.turnierController = new TurnierController();
        this.initializeRoutes();
    }

    initializeRoutes() {
        this.router.get('/turnier', this.turnierController.getTurniere.bind(this.turnierController));
        this.router.post('/create-turnier', this.turnierController.createTurnier.bind(this.turnierController));
        this.router.get('/create-turnier', this.turnierController.getTurniere.bind(this.turnierController))
    }

    getRouter() {
        return this.router;
    }
}

module.exports = TurnierRouter;
