document.addEventListener("DOMContentLoaded", function () {
    fetchRecentTurniere();
    fetchBeliebteTurniere();
    fetchFreiePlaetze();
  });

  function fetchRecentTurniere() {
    //TODO geht das auch ohne zwischenseite? als Fkt?
    fetch("https://turniersystem.onrender.com/recent-turniere")
            .then(response => response.json())
            .then(turniere => {
              displayTurniere(turniere);
            })
            .catch(error => console.error('Fehler beim Abrufen der Turnierliste:', error));
  }

  function fetchBeliebteTurniere() {
    // Fügen Sie hier den Code hinzu, um beliebige Turniere abzurufen (z.B., die ersten 5)
    // Verwenden Sie einen ähnlichen Ansatz wie bei fetchRecentTurniere
  }

  function fetchFreiePlaetze() {
    // Fügen Sie hier den Code hinzu, um weitere beliebige Turniere abzurufen (z.B., die nächsten 5)
    // Verwenden Sie einen ähnlichen Ansatz wie bei fetchRecentTurniere
  }

  function displayTurniere(turniere) {
    const turnierListe = document.querySelector('sd-list');
    const headingElement = document.createElement('div');
    headingElement.classList.add('sd-content-heading');
    turnierListe.appendChild(headingElement);

    turniere.forEach(turnier => {
      const listItem = document.createElement('sd-list-item');
      listItem.caption = turnier.turnierName;
      listItem.description = `Startdatum: ${turnier.startDatum}, Enddatum: ${turnier.endDatum}, Veranstaltungsort: ${turnier.veranstaltungsort}`;
      turnierListe.appendChild(listItem);
    });
  }