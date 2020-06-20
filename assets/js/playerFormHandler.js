$("#addplayerSubmit").click(function () {
    playerFormHandler(event);
});
var playerContainerEl = $("<div>").addClass("row s12 column").attr("id", "playerContainer");
var monsterContainerEl = $("<div>").addClass("row s12 column").attr("id", "monsterContainer");
var battleContainerEl = $("<div>").addClass("row s12 column").attr("id", "battleContainer");
$("#playerColumn .row.s12.center").append(playerContainerEl);
$("#monsterColumn .row.s12.center").append(monsterContainerEl);
$("#battleColumn .row.s12.center").append(battleContainerEl);


var playerFormHandler = function (event) {
    event.preventDefault();
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

    var rowEl = $("<div>").addClass("row draggable");
    var colEl = $("<div>").addClass("col s12");
    var cardEl = $("<div>").addClass("card player-card").attr('draggable', 'true');
    var cardContentEl = $("<div>").addClass("card-content white-text");
    var cardTitle = $("<span>").addClass("card-title").text(playerName).attr("id", playerName);
    var cardRaceClass = $("<p>").text(`${playerRace} ${playerClass}`);
    var cardHpInput = $('<input>').addClass('center').attr('placeholder', 'HP: ' + healthPoints);
    var cardAction = $("<div>").addClass("card-action");
    var cardHealthPoints = $("<a>").addClass("btn tooltipped").attr("data-position", "bottom").attr("data-tooltip", healthPoints).text("HP");
    var cardSpellButton = $("<a>").addClass("btn tooltipped").attr("data-position", "bottom").attr("data-tooltip", `${spellOne}, ${spellTwo}, ${spellThree}, ${spellFour}`).text("Spells");
    var cardStatsButton = $("<a>").addClass("btn tooltipped").attr("data-position", "bottom").attr("data-tooltip", `${strength}, ${dexterity}, ${intelligence}, ${wisdom}, ${constitution}, ${charisma}`).text("Stats");
    var cardWeapon = $("<a>").addClass("btn tooltipped").attr("data-position", "bottom").attr("data-tooltip", weapon).text("Weapon");
    var cardStatusEffect = $("<a>").addClass("btn tooltipped").attr("data-position", "bottom").attr("data-tooltip", statusEffect).text("Status");

    cardAction.append(cardHealthPoints, cardSpellButton, cardStatsButton, cardWeapon, cardStatusEffect);
    cardContentEl.append(cardTitle, cardRaceClass, cardHpInput, cardAction);
    cardEl.append(cardContentEl);
    colEl.append(cardEl);
    rowEl.append(colEl);
    playerContainerEl.append(rowEl);

    battleBtnHandler(cardContentEl);

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

    // var loadplayerInfo = function () {
    //     $("#playerInfo,#playerInfotwo").html("Player Name: " + "<u><b>" + playerName + "</u></b>" + "    Player Class: " + "<u><b>" + playerClass + "</u></b>" + "Player Race: " + "<u><b>" + playerRace + "       " + "</u></b>" + "         Player Health: " + "<u><b>" + healthPoints);

    // };
    // loadplayerInfo();

    // var loadText = function () {
    //     texttoEnter = JSON.parse(localStorage.getItem("addplayerSubmitLocalStorage"));
    //     $("#inbox").html(texttoEnter[4]);
    // };

    // var arrayForm = [playerName, playerClass, playerRace, healthPoints, strength, dexterity, intelligence, wisdom, constitution, charisma, weaponsOne, weaponsTwo, weaponsThree, weaponsFour, weaponsFive, weaponsSix, weaponsSeven, weaponsEight, spellOne, spellTwo, spellThree, spellFour, statusEffectOne, statusEffectTwo, statusEffectThree, statusEffectFour];

    // // var texttoEnter = arrayForm;
    // var texttoEnterJSON = JSON.stringify(arrayForm);
    // localStorage.setItem("addplayerSubmitLocalStorage", texttoEnterJSON);
    // loadText();
    // $(".column").sortable({
    //     connectWith: $(".column"),
    //     helper: "clone",
    //     tolerance: "pointer"
    // })

    // $(".draggable").draggable({
    //     helper: "clone",
    //     connectToSortable: ".column"
    // })
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

var battleBtnHandler = function(card) {
    $("<button>").addClass("btn battleBtn").text("Battle!").appendTo(card);
}


