// script.js
document.getElementById("tournamentForm").addEventListener("submit", function (event) {
    event.preventDefault();
  
    const tournamentData = {
      turnierName: document.getElementById("tournamentName").value,
      startDatum: document.getElementById("startDate").value,
      endDatum: document.getElementById("endDate").value,
      Standort: document.getElementById("standort").value,
    };
  
    fetch("/create-turnier", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tournamentData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Turnier erstellt:", data);
        alert("Turnier erfolgreich erstellt!");
      })
      .catch((error) => {
        console.error("Fehler beim Senden der Daten:", error);
        alert("Fehler beim Erstellen des Turniers. Bitte versuche es erneut.");
      });
  });
  