document.addEventListener("DOMContentLoaded", function () {
    const turnierController = new TurnierController();

    // Hier kannst du die gewünschten Funktionen aufrufen
    turnierController.fetchRecentTurniere();
    turnierController.fetchBeliebteTurniere();
    turnierController.fetchFreiePlaetze();
});
