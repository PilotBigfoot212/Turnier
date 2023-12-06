document.addEventListener("DOMContentLoaded", function () {
  const turnierController = new TurnierController();
  turnierController.fetchRecentTurniere();
  turnierController.fetchBeliebteTurniere();
  turnierController.fetchFreiePlaetze();
});

class TurnierController {
  async fetchRecentTurniere() {
    try {
      const response = await fetch("https://turniersystem.onrender.com/recent-turniere");
      const turniere = await response.json();
      this.displayTurniere(turniere, 'Kürzlich hinzugefügt');
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

  displayTurniere(turniere, heading) {
    const turnierListe = document.querySelector('sd-list');

    // Leere vorhandene Inhalte
    turnierListe.innerHTML = '';

    // Füge die Überschrift für jedes Set von Turnieren hinzu
    const headingElement = document.createElement('div');
    headingElement.classList.add('sd-content-heading');
    headingElement.textContent = heading;
    turnierListe.appendChild(headingElement);

    turniere.forEach(turnier => {
      const listItem = document.createElement('sd-list-item');
      listItem.caption = turnier.turnierName;
      listItem.description = `Startdatum: ${turnier.startDatum}, Enddatum: ${turnier.endDatum}, Veranstaltungsort: ${turnier.veranstaltungsort}`;
      turnierListe.appendChild(listItem);
    });
  }
}
