const Turnier = require('../models/turnierModel');

class TurnierController {
    async getRecentTurniere(req, res) {
        try {
            const recentTurniere = await Turnier.find().sort({ _id: -1 }).limit(5);
            res.status(200).json(recentTurniere);
        } catch (error) {
            console.log(error.message);
            res.status(500).json({  message: 'Fehler beim Erstellen des Turniers' });
        }
    }

    async createTurnier(req, res) {
        try {
            console.log('Received data:', req.body);
            const turnier = await Turnier.create(req.body);
            res.status(200).json(turnier);
        } catch (error) {
            console.log(error.message);
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = new TurnierController();
