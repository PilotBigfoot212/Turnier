function formatCurrency(input) {
    input.value = parseFloat(input.value).toFixed(2);
}

function redirectToHomePage() {
    window.location.href = window.location.origin;
}

function reloadPage() {
    window.location.reload();
}

function validateForm() {
    const inputs = document.querySelectorAll('.example-container sd-lit-input');

    for (const input of inputs) {
        if (!input.value) {
            alert('Bitte füllen Sie alle Felder aus.');
            return false;
        }
    }

    return true;
}

async function createTurnier() {
        const tournamentData = {
        turnierName: document.getElementById("turnierName").value,
        startDatum: document.getElementById("startDatum").value,
        endDatum: document.getElementById("endDatum").value,
        veranstaltungsort: document.getElementById("veranstaltungsort").value,
        startZeit: document.getElementById("startZeit").value,
        kosten: document.getElementById("kosten").value,
        //TODO Solange die Smartwe-ID noch nicht verfügbar ist, wird die IP-Adresse des Hosts als Wert für turnierMaster verwendet.
        turnierMaster: window.location.hostname,
        //TODO Manuellesss Laden der Teilnehmer
        turnierTeilnehmer: ["Hans","Jürgen","Dieter"],
        //TODO Manuelles Laden der Teilnehmer ANzahö
        turnierTeilnehmerAnzahl: 8
        
    };

    try {
        const response = await fetch("/api/create-turnier", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(tournamentData),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Turnier erstellt:", data);
        alert("Turnier erfolgreich erstellt!");
        return false;
    } catch (error) {
        console.error("Fehler beim Senden der Daten:", error);
        alert("Fehler beim Erstellen des Turniers. Bitte versuche es erneut.");
    }
}


function submitForm() {
    if (validateForm()) {
        createTurnier();
    }
}
