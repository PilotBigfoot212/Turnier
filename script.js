/*script.js

// Funktion zum Sammeln der Eingaben und zum Auslösen der Submit-Anfrage
function create_turnier() {
    const tournamentData = {
       tournamentName: document.getElementById('tournamentName').value,
        startDate: document.getElementById('startDate').value,
        endDate: document.getElementById('endDate').value,
        location: document.getElementById('location').value,
    };

    // Fetch-API verwenden, um die Daten an den Server zu senden
    fetch('/turnier', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(tournamentData),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        // Hier kannst du mit der Server-Antwort (data) weiterarbeiten
        console.log('Turnier erstellt:', data);
        alert('Turnier erfolgreich erstellt!');
    })
    .catch(error => {
        console.error('Fehler beim Senden der Daten:', error);
        alert(`Fehler beim Erstellen des Turniers. Bitte versuche es erneut. Fehlermeldung: ${error.message}`);
    });
}    */
