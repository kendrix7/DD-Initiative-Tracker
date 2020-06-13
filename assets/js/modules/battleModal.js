

var modalHandler = function (playerEl) {
    var playerContainerEl = $("#playerList-container")
    var playerList = playerContainerEl.find(".playerName") || [];
    console.log(playerList);
    
    
    playerList.each(function() {
        var playerName = $(this).text().split(":")[1].trim();
        debugger;
        var modalButtonEl = $("<a>").addClass("waves-effect waves-light btn player").text(playerName);
        var modalContentEl = $(".modal-content");
        modalContentEl.append(modalButtonEl);
    });

}

export { modalHandler }
