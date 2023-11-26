document.addEventListener("DOMContentLoaded", function() {
    fetchTurniere();
  });
  
  function fetchTurniere() {
    fetch("https://turniersystem.onrender.com/turniere") 
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        renderTurniere(data);
      })
      .catch(error => {
        console.error("Fehler beim Laden der Turniere:", error);
      });
  }
  
  function renderTurniere(turniere) {
    const turnierListe = document.getElementById("turnierListe");
  
    turniere.forEach(turnier => {
      const li = document.createElement("li");
      li.textContent = `${turnier.turnierName} - ${turnier.startDatum} bis ${turnier.endDatum}, Ort: ${turnier.location}`;
      turnierListe.appendChild(li);
    });
  }
  