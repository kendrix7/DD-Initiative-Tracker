var searchEl = document.getElementById('search-button');
var searchHistory = JSON.parse(localStorage.getItem('monster')) || [];
var inputEl = document.getElementById('monster-input');
var monsterContainerEl = document.getElementById('monsterList-container')
var queryURL = 'https://www.dnd5eapi.co/api/monsters/';
var searchHistory = JSON.parse(localStorage.getItem("monster")) || [];
if (!searchHistory.length) {
    var id = 0;
}
else {
    var id = searchHistory[searchHistory.length - 1].id; // set id to last id saved
}
if (Number.isInteger(searchHistory[searchHistory.length - 1])) {
    var orderNum = searchHistory.pop() + 1;
}
else {
    var orderNum = 1;
}

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
    var texttoEnter = JSON.parse(localStorage.getItem("addplayerSubmitLocalStorage"));
    $("#inbox").html(texttoEnter[4]);
};

function getMonster(name) {
    axios.get(queryURL + name)
    .then (function(response) {
        var monsterCardEl = document.createElement ('div');
        monsterCardEl.classList = ('card monster-container');
        monsterCardEl.setAttribute ('id', '');
        monsterCardEl.dataset.id = id

        var monsterContent = document.createElement ('div');
        monsterContent.classList = ('card-content');
        monsterCardEl.appendChild(monsterContent);

        var monsterName = document.createElement('p');
        monsterName.classList = ('card-title');
        monsterName.innerText = 'Name: ' + response.data.name;
        monsterCardEl.appendChild(monsterName);

        var monsterHP = document.createElement('a');
        monsterHP.classList = ('tooltipped btn');
        // monsterHP.setAttribute ('href','#');
        monsterHP.setAttribute('data-position', 'right');
        monsterHP.setAttribute('data-tooltip', response.data.hit_points);
        monsterHP.innerText = 'HP';
        monsterCardEl.appendChild(monsterHP);

        M.Tooltip.init(monsterHP);

        // var hpDropdown = document.createElement('ul');
        // hpDropdown.classList = ('dropdown-content');
        // hpDropdown.setAttribute = ('id', 'dropdown1');
        // monsterCardEl.appendChild(hpDropdown);

        // var hpContent = document.createElement('li');
        // hpDropdown.appendChild(hpContent);

        // var hpAnchor = document.createElement('a');
        // hpAnchor.setAttribute ('href', '#!');
        // hpAnchor.innerText = response.data.hit_points;
        // hpContent.appendChild(hpAnchor);

        var monsterStats = document.createElement('a');
        monsterStats.classList = ('tooltipped btn');
        // monsterHP.setAttribute ('href','#');
        monsterStats.setAttribute('data-position', 'right');
        monsterStats.setAttribute('data-tooltip', 'STR: ' + response.data.strength +' | ' + 'DEX: ' + response.data.dexterity +' | ' + 'INT: ' + response.data.intelligence+' | ' + 'WIS: ' + response.data.wisdom+' | ' + 'CON: ' + response.data.constitution+' | ' + 'CHA: ' + response.data.charisma);
        monsterStats.innerText = 'STATS';
        monsterCardEl.appendChild(monsterStats);

        M.Tooltip.init(monsterStats);

        monsterContainerEl.appendChild(monsterCardEl);
    }
)}

//initialize search for given monster name
searchEl.addEventListener('click',function() {
    id++
    var searchTerm = inputEl.value;
    getMonster(searchTerm);
    var searchTermObj = {"id": id, "name": searchTerm, "orderNum": 0} // save an id with the name for persistency
    searchHistory.push(searchTermObj);
    localStorage.setItem('monster',JSON.stringify(searchHistory));
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