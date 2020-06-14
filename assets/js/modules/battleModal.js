// generates content for the modal
var modalHandler = function (playerEl) {
    var playerContainerEl = $("#monsterList-container") // #monsterList-container needs to be switched to player
    var playerList = playerContainerEl.find(".monsterName") || []; // .monsterName needs to be switched to player name
    
    // takes each player entered and makes their name into a button in the modal
    playerList.each(function() {
        var playerName = $(this).text().split(":")[1].trim();
        var modalButtonEl = $("<a>").addClass("waves-effect waves-light btn modalButton").text(playerName);
        var modalContentEl = $(".modal-content");
        modalContentEl.append(modalButtonEl); // buttons don't generate with spacing... idk why.
    });
}


export { modalHandler }
