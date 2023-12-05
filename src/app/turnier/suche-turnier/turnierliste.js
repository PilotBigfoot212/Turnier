/* const Turnier = require("../../../models/turnierModel");
document.addEventListener("DOMContentLoaded", function() {
    fetchTurniere();
  });
  
  function fetchTurniere() {
    fetch("https://turniersystem.onrender.com/turniere")
    .then(response => response.json())
    .then(turniere => {
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
    })
    .catch(error => console.error('Fehler beim Abrufen der Turnierliste:', error));
}

  