const Turnier = require('./models/turnierModel');

async function fetchTurniereFromAPI() {
    try {
        const response = await fetch("https://turniersystem.onrender.com/turniere");
        const turniere = await response.json();
        return turniere;
    } catch (error) {
        throw new Error('Error fetching turniere from API:', error);
    }
}

function renderTurniere(turniere) {
    const turnierListeBody = document.getElementById('turnierListeBody');
    turniere.forEach(turnier => {
        const row = turnierListeBody.insertRow();
        row.insertCell(0).textContent = turnier.turnierName;
        row.insertCell(1).textContent = turnier.startDatum;
        row.insertCell(2).textContent = turnier.endDatum;
        row.insertCell(3).textContent = turnier.veranstaltungsort;
        row.insertCell(4).textContent = turnier.startZeit;
        row.insertCell(5).textContent = turnier.kosten;
    });
}

async function fetchAndRenderTurniere() {
    try {
        const apiTurniere = await fetchTurniereFromAPI();
        renderTurniere(apiTurniere);
    } catch (error) {
        console.error(error.message);
    }
}

const getTurnierStatus = (turnier) => {
    const currentDate = new Date();
    const startDatum = new Date(turnier.startDatum);
    const endDatum = new Date(turnier.endDatum);

    if (currentDate < startDatum) {
        return 'Upcoming';
    } else if (currentDate >= startDatum && currentDate <= endDatum) {
        return 'Ongoing';
    } else {
        return 'Completed';
    }
};

async function fetchAndLogTurnierStatus() {
    try {
        const tournaments = await Turnier.find();
        tournaments.forEach((turnier) => {
            const status = getTurnierStatus(turnier);
            console.log(`Turnier "${turnier.turnierName}" is ${status}`);
        });
    } catch (error) {
        console.error('Error fetching tournaments:', error);
    }
}