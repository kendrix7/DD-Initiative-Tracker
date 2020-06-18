import { playerFormHandler } from "./modules/playerFormHandler.js"
import { getMonster } from "./modules/getMonster.js"
import { modalHandler} from "./modules/battleModal.js"

var searchEl = document.getElementById('search-button');
var searchHistory = JSON.parse(localStorage.getItem('monster')) || [];
var inputEl = document.getElementById('monster-input');
var monsterContainerEl = document.getElementById('monsterList-container')

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

$("#addplayerSubmit").click(function () {
    playerFormHandler(event);
});




//initialize search for given monster name
searchEl.addEventListener('click', function () {
    var searchTerm = inputEl.value;
    getMonster(searchTerm);
    searchHistory.push(searchTerm);
    localStorage.setItem('monster', JSON.stringify(searchHistory));
});



// generates content for the modal
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

$(".classOption").click(function() {
    $("#playerClass").text($(this).text());
})

$(".raceOption").click(function() {
    $("#playerRace").text($(this).text());
})

$(".statusOption").click(function() {
    $("#playerStatus").text($(this).text());
})

