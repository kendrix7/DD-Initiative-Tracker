// generates content for the modal
var modalHandler = function (playerEl) {
    var playerContainerEl = $("#monsterList-container") // #monsterList-container needs to be switched to player
    var playerList = playerContainerEl.find(".card-title") || []; // .monsterName needs to be switched to player name

    // takes each player entered and makes their name into a button in the modal
    playerList.each(function() {
        var playerName = $(this).text().split(":")[1].trim();
        var modalButtonEl = $("<a>").addClass("waves-effect waves-light btn modalButton").text(playerName);
        var modalContentEl = $(".modal-content");
        modalContentEl.append(modalButtonEl); // buttons don't generate with spacing... idk why.
    });
}

// on click of buttons in modal removes that button and formats <p> in .modal-content
var initiativeHandler = function(buttonEl) {
    // remove button clicked, save to list
    var searchHistory = JSON.parse(localStorage.getItem("monster")) || [];
    var orderNum = 0;
    monster = searchHistory.find(function(i) {
        i.id === buttonEl.dataset.id;
    })
    monster.orderNum = orderNum;
    searchHistory.push(monster);
    localStorage.setItem(JSON.stringify(searchHistory));
    buttonEl.remove();

    // reformat <p> in .modal-content
    var modalContent = $(".modal-content").children().eq(1).text().trim();
    modalContent = modalContent.split(" ")
    modalContent.pop()
    modalContent = `${modalContent.join(" ")} next?`;
    $(".modal-content p").text(modalContent);
}

export { modalHandler, initiativeHandler }
