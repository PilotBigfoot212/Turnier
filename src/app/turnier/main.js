document.addEventListener("DOMContentLoaded", function () {
    const turnierController = new TurnierController();

    turnierController.fetchRecentTurniere();
    turnierController.fetchBeliebteTurniere();
    turnierController.fetchFreiePlaetze();
});
