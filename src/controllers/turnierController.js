const Turnier = require('../models/turnierModel');

class TurnierController {
    async getTurniere(req, res) {
        try {
            const turniere = await Turnier.find();
            res.status(200).json(turniere);
        } catch (error) {
            console.error(error.message);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    async createTurnier(req, res) {
        try {
            console.log('Received data:', req.body);
            const turnier = await Turnier.create(req.body);
            res.status(200).json(turnier);
        } catch (error) {
            console.error(error.message);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }
}

module.exports = TurnierController;
