$("#addplayerSubmit").click(function () {
    playerFormHandler(event);
});

var playerContainerEl = $("<ul>").addClass("row s12 contain").attr("id", "playerContainer");
var monsterContainerEl = $("<ul>").addClass("row s12 contain").attr("id", "monsterContainer");
var battleContainerEl = $("<ul>").addClass("row s12 contain").attr("id", "battleContainer");
$("#playerColumn .row").append(playerContainerEl);
$("#monsterColumn .row").append(monsterContainerEl);
$("#battleColumn .row").append(battleContainerEl);

$(".contain").sortable({
    connectWith: $(".contain"),
    scroll: true,
    helper: "clone"
})

var createPlayerCard = function (playerData) {
    if (playerData.isplayer) {
        var rowEl = $("<li>").addClass("row draggable");
        var colEl = $("<div>").addClass("col s12");
        var cardEl = $("<div>").addClass("card player-card s12").attr('draggable', 'true');
        var cardContentEl = $("<div>").addClass("card-content white-text");
        var cardTitle = $("<span>").addClass("card-title").text(playerData.playerName).attr("id", playerData.playerName);
        var cardRaceClass = $("<p>").text(`${playerData.playerRace} ${playerData.playerClass}`);
        var cardHpInput = $('<input>').addClass('center').attr('placeholder', 'HP: ' + playerData.healthPoints);
        var cardAction = $("<div>").addClass("card-action");
        var cardHealthPoints = $("<a>").addClass("btn tooltipped").attr("data-position", "bottom").attr("data-tooltip", playerData.healthPoints).text("HP");
        var cardSpellButton = $("<a>").addClass("btn tooltipped").attr("data-position", "bottom").attr("data-tooltip", `${playerData.spellOne}, ${playerData.spellTwo}, ${playerData.spellThree}, ${playerData.spellFour}`).text("Spells");
        var cardStatsButton = $("<a>").addClass("btn tooltipped").attr("data-position", "bottom").attr("data-tooltip", `${playerData.strength}, ${playerData.dexterity}, ${playerData.intelligence}, ${playerData.wisdom}, ${playerData.constitution}, ${playerData.charisma}`).text("Stats");
        var cardWeapon = $("<a>").addClass("btn tooltipped").attr("data-position", "bottom").attr("data-tooltip", playerData.weapon).text("Weapon");
        var cardStatusEffect = $("<a>").addClass("btn tooltipped").attr("data-position", "bottom").attr("data-tooltip", playerData.statusEffect).text("Status");

        cardAction.append(cardHealthPoints, cardSpellButton, cardStatsButton, cardWeapon, cardStatusEffect);
        cardContentEl.append(cardTitle, cardRaceClass, cardHpInput, cardAction);
        cardEl.append(cardContentEl);
        colEl.append(cardEl);
        rowEl.append(colEl);
        playerContainerEl.append(rowEl);

        $("<button>").addClass("btn battleBtn").text("Battle!").appendTo(cardContentEl);
    }
}

var createOldPlayerCard = function () {
    persistencyData = JSON.parse(localStorage.getItem("persistencyData"));
    if (!persistencyData) {
        persistencyData = [];
    }

    persistencyData.forEach(player => {
        if (player.isPlayer) {
            playerData = {
                "playerName": player.playerName,
                "playerClass": player.playerClass,
                "playerRace": player.playerRace,
                "healthPoints": player.healthPoints,
                "strength": player.strength,
                "dexterity": player.dexterity,
                "intelligence": player.intelligence,
                "wisdom": player.wisdom,
                "constitution": player.constitution,
                "charisma": player.charisma,
                "weapon": player.weapon,
                "spellOne": player.spellOne,
                "spellTwo": player.spellTwo,
                "spellThree": player.spellThree,
                "spellFour": player.spellFour,
                "statusEffect": player.statusEffect,
                "isplayer": true
            }
            createPlayerCard(playerData);
        }
    })
}

var createNewPlayerCard = function () {
    var playerName = $("#playerName").val();
    var playerClass = $("#playerClass").text();
    var playerRace = $("#playerRace").text();
    var healthPoints = $("#healthPoints").val();
    var strength = $("#strength").val();
    var dexterity = $("#dexterity").val();
    var intelligence = $("#intelligence").val();
    var wisdom = $("#wisdom").val();
    var constitution = $("#constitution").val();
    var charisma = $("#charisma").val();
    var weapon = $("#weapon").val();
    var spellOne = $("#spellOne").val();
    var spellTwo = $("#spellTwo").val();
    var spellThree = $("#spellThree").val();
    var spellFour = $("#spellFour").val();
    var statusEffect = $("#playerStatus").text();

    var playerData = {
        "playerName": playerName,
        "playerClass": playerClass,
        "playerRace": playerRace,
        "healthPoints": healthPoints,
        "strength": strength,
        "dexterity": dexterity,
        "intelligence": intelligence,
        "wisdom": wisdom,
        "constitution": constitution,
        "charisma": charisma,
        "weapon": weapon,
        "spellOne": spellOne,
        "spellTwo": spellTwo,
        "spellThree": spellThree,
        "spellFour": spellFour,
        "statusEffect": statusEffect,
        "isPlayer": true
    }

    createPlayerCard(playerData);

    persistencyData.push(playerData);

    localStorage.setItem("persistencyData", JSON.stringify(persistencyData));
}

var playerFormHandler = function (event) {
    event.preventDefault();
    debugger;
    createNewPlayerCard()

    M.Dropdown.init(playerFormHandler);

    $(document).ready(function () {
        $('.tooltipped').tooltip();
    });

    $(document).ready(function () {
        $('.modal').modal();
    });

    $("#startBtn").click(function () {
        modalHandler($(this).html())
    });

    $(document).ready(function () {
        $('.tabs').tabs();
    });

    $('.dropdown-trigger').dropdown();

    $(".classOption").click(function () {
        $("#playerClass").text($(this).text());
    })

    $(".raceOption").click(function () {
        $("#playerRace").text($(this).text());
    })

    $(".statusOption").click(function () {
        $("#playerStatus").text($(this).text());
    })

    $(".battleBtn").off("click");
    $(".battleBtn").on("click", function () {
        if ($(this).parents("#playerColumn").html() || $(this).parents("#monsterColumn").html()) {
            $(this).closest(".row.draggable").appendTo("#battleContainer");
            $(this).text("Remove");
        }
        else if ($(this).parents("#battleColumn").html()) {
            if ($(this).parents(".player-card").html()) {
                $(this).closest(".draggable").appendTo("#playerContainer");
                $(this).text("Battle!")
            }
            else if ($(this).parents(".monster-card").html()) {
                $(this).closest(".row.draggable").appendTo("#monsterContainer");
                $(this).text("Battle!")
            }

        }
    })
}

createOldPlayerCard();
