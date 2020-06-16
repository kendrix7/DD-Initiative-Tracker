var searchEl = document.getElementById('search-button');
var searchHistory = JSON.parse(localStorage.getItem('monster')) || [];
var inputEl = document.getElementById('monster-input');
var monsterContainerEl = document.getElementById('monsterList-container')
var queryURL = 'https://www.dnd5eapi.co/api/monsters/';
console.log(searchHistory);

$("#addplayerSubmit").click(function (event) {
    event.preventDefault();

    var playerName = $("#playerName").val();
    var playerClass = $("#playerClass").val();
    var playerRace = $("#playerRace").val();
    var healthPoints = $("#healthPoints").val();
    var strength = $("#strength").val();
    var dexterity = $("#dexterity").val();
    var intelligence = $("#intelligence").val();
    var wisdom = $("#wisdom").val();
    var constitution = $("#constitution").val();
    var charisma = $("#charisma").val();
    var weaponsOne = $("#weaponsOne").val();
    var weaponsTwo = $("#weaponsTwo").val();
    var weaponsThree = $("#weaponsThree").val();
    var weaponsFour = $("#weaponsFour").val();
    var weaponsFive = $("#weaponsFive").val();
    var weaponsSix = $("#weaponsSix").val();
    var weaponsSeven = $("#weaponsSeven").val();
    var weaponsEight = $("#weaponsEight").val();
    var spellOne = $("#spellOne").val();
    var spellTwo = $("#spellTwo").val();
    var spellThree = $("#spellThree").val();
    var spellFour = $("#spellFour").val();
    var statusEffectOne = $("#statusEffectOne").val();
    var statusEffectTwo = $("#statusEffectTwo").val();
    var statusEffectThree = $("#statusEffectThree").val();

    var loadplayerInfo = function () {
        $("#playerInfo,#playerInfotwo").html("Player Name: " + "<u><b>"+ playerName + "</u></b>" + "    Player Class: " + "<u><b>"+ playerClass + "</u></b>" + "Player Race: " + "<u><b>"+ playerRace + "       "+ "</u></b>" + "         Player Health: " + "<u><b>"+ healthPoints);

    };
    loadplayerInfo();


    var arrayForm = [playerName, playerClass,playerRace,healthPoints,strength,dexterity,intelligence,wisdom,constitution,charisma,weaponsOne,weaponsTwo,weaponsThree,weaponsFour,weaponsFive,weaponsSix,weaponsSeven,weaponsEight,spellOne,spellTwo,spellThree,spellFour,statusEffectOne,statusEffectTwo,statusEffectThree,statusEffectFour];

    // var texttoEnter = arrayForm;
    var texttoEnterJSON = JSON.stringify(arrayForm);
    localStorage.setItem("addplayerSubmitLocalStorage", texttoEnterJSON);
    loadText();
});
    
    
// recall local storage
var loadText = function () {
    texttoEnter = JSON.parse(localStorage.getItem("addplayerSubmitLocalStorage"));
    $("#inbox").html(texttoEnter[4]);
};
    


//initialize search for given monster name
searchEl.addEventListener('click', function () {
    var searchTerm = inputEl.value;
    getMonster(searchTerm);
    searchHistory.push(searchTerm);
    localStorage.setItem('monster', JSON.stringify(searchHistory));
});

$(document).ready(function () {
    $('.tooltipped').tooltip();
});

$(document).ready(function () {
    $('.modal').modal();
});

$("#startBtn").click(function () {
    modalHandler()
    $(".modalButton").click(function () {
        initiativeHandler($(this));
    });

    $(document).ready(function(){
        $('.tabs').tabs();
    });
})