const express = require('express');
const path = require('path');
const router = express.Router();
const turnierController = require('../controllers/turnierController');

router.get('/create-turnier', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/html/create-turnier.html'));
});
//TODO wird nicht richitg anzeigt
router.get('/turniere',  (req, res) => {
    res.sendFile(path.join(__dirname, '../public/html/anzeige-turnier.html'));
});

router.get('/recent-turniere', turnierController.getRecentTurniere);

// Post Endpunkt für die Erstellung von Turnieren
router.post('/create-turnier', turnierController.createTurnier);

module.exports = router;