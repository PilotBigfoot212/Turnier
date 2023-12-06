class TurnierController {
  async fetchRecentTurniere() {
    try {
      const response = await fetch("https://turniersystem.onrender.com/recent-turniere");
      const turniere = await response.json();
      this.displayTurniere(turniere);
    } catch (error) {
      console.error('Fehler beim Abrufen der Turnierliste:', error);
    }
  }

  async fetchBeliebteTurniere() {
    // Fügen Sie hier den Code hinzu, um beliebige Turniere abzurufen (z.B., die ersten 5)
    // Verwenden Sie einen ähnlichen Ansatz wie bei fetchRecentTurniere
  }

  async fetchFreiePlaetze() {
    // Fügen Sie hier den Code hinzu, um weitere beliebige Turniere abzurufen (z.B., die nächsten 5)
    // Verwenden Sie einen ähnlichen Ansatz wie bei fetchRecentTurniere
  }

  displayTurniere(turniere) {
    const turnierListe = document.querySelector('sd-list');
    
    // Füge die Überschrift für die Turnierliste hinzu
    const headingElement = document.createElement('div');
    headingElement.classList.add('sd-content-heading');
    headingElement.textContent = 'Kürzlich hinzugefügt';
    turnierListe.appendChild(headingElement);

    turniere.forEach(turnier => {
      const listItem = document.createElement('sd-list-item');
      listItem.caption = turnier.turnierName;
      listItem.description = `Startdatum: ${turnier.startDatum}, Enddatum: ${turnier.endDatum}, Veranstaltungsort: ${turnier.veranstaltungsort}`;
      turnierListe.appendChild(listItem);
    });
  }
}

// Erstellen Sie eine Instanz der Klasse und verwenden Sie diese, um die Funktionen aufzurufen
const turnierController = new TurnierController();

document.addEventListener("DOMContentLoaded", function () {
  turnierController.fetchRecentTurniere();
  turnierController.fetchBeliebteTurniere();
  turnierController.fetchFreiePlaetze();
});
