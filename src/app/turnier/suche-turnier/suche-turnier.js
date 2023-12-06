document.addEventListener("DOMContentLoaded", function() {
    // Füge hier gegebenenfalls Initialisierungslogik hinzu
  });
  
  function sucheTurniere() {
    const suchbegriff = document.getElementById("suchbegriff").value;
  
    if (!suchbegriff) {
      alert("Bitte gib einen Suchbegriff ein.");
      return;
    }
  
    // Hier rufe deine API auf, um nach Turnieren zu suchen
    fetch(`"https://turniersystem.onrender.com/alle-turniere`)
      .then(response => response.json())
      .then(turniere => {
        // Rufe eine Funktion auf, um die Suchergebnisse anzuzeigen
        zeigeTurniereAn(turniere);
      })
      .catch(error => console.error('Fehler bei der Turniersuche:', error));
  }
  
  function zeigeTurniereAn(turniere) {
    const ergebnisContainer = document.getElementById("ergebnisContainer");
    ergebnisContainer.innerHTML = ""; // Leere den Container
  
    if (turniere.length === 0) {
      ergebnisContainer.innerHTML = "<p>Keine passenden Turniere gefunden.</p>";
      return;
    }
  
    // Durchlaufe die gefundenen Turniere und füge sie zum Container hinzu
    turniere.forEach(turnier => {
      const turnierElement = document.createElement("div");
      turnierElement.innerHTML = `<p>${turnier.turnierName} - ${turnier.veranstaltungsort}</p>`;
      ergebnisContainer.appendChild(turnierElement);
    });
  }
  