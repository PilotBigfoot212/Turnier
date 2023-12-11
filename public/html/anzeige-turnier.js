document.addEventListener("DOMContentLoaded", async function () {
  try {
    await fetchRecentTurniere();
    displayMeineTurniereHeading();
    await fetchMeineTurniere();
    displayFreiePlaetzeHeading();
    await fetchFreiePlaetze();
} catch (error) {
    console.error('Fehler:', error);
}
});

async function fetchRecentTurniere() {
  try {
      const response = await fetch("/recent-turniere");
      const turniere = await response.json();

      const turnierListe = document.querySelector('sd-list');
      displayTurniere(turniere, turnierListe);
  } catch (error) {
      throw new Error('Fehler beim Abrufen der Turnierliste:' + error);
  }
}

function displayMeineTurniereHeading() {
  const turnierListe = document.querySelector('sd-list');
  const meineTurniereHeading = document.createElement('div');
  meineTurniereHeading.classList.add('sd-content-heading');
  meineTurniereHeading.innerText = 'Meine Turniere';
  turnierListe.appendChild(meineTurniereHeading);
}

async function fetchMeineTurniere() {
  try {
    //TODO auch hier solange nicht die UserID von Smartwe übernommen wird 
      const hostname = window.location.hostname;
      const response = await fetch(`/recent-turniereMaster?hostname=${hostname}`);
      const meineTurniere = await response.json();

      const turnierListe = document.querySelector('sd-list');
      displayTurniere(meineTurniere, turnierListe);
  } catch (error) {
      throw new Error('Fehler beim Abrufen der Turnierliste:' + error);
  }
}

function fetchFreiePlaetze() {

}

function displayTurniere(turniere, turnierListe) {
  turniere.forEach(turnier => {
      const listItem = document.createElement('sd-list-item');
      listItem.caption = turnier.turnierName;
      listItem.description = `Startdatum: ${turnier.startDatum}, Enddatum: ${turnier.endDatum}, Veranstaltungsort: ${turnier.veranstaltungsort}`;
      turnierListe.appendChild(listItem);
  });
}
function displayFreiePlaetzeHeading() {
  const turnierListe = document.querySelector('sd-list');
  const freiePlaetzeHeading = document.createElement('div');
  freiePlaetzeHeading.classList.add('sd-content-heading');
  freiePlaetzeHeading.innerText = 'Freie Plätze';
  turnierListe.appendChild(freiePlaetzeHeading);
}

async function fetchFreiePlaetze() {
  try {
    // Ändern Sie den Fetch-Aufruf für 'freie-turniere'
    const response = await fetch('/freie-turniere');
    const freiePlaetze = await response.json();

    const turnierListe = document.querySelector('sd-list');
    displayTurniere(freiePlaetze, turnierListe);
  } catch (error) {
      throw new Error('Fehler beim Abrufen der freien Plätze:' + error);
  }}
