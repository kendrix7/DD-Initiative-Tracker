import { modalHandler, initiativeHandler } from "./modules/battleModal.js";

var searchEl = document.getElementById('search-button');
var searchHistory = JSON.parse(localStorage.getItem('monster')) || [];
var inputEl = document.getElementById('monster-input');
var monsterContainerEl = document.getElementById('monsterList-container')    
var queryURL = 'https://www.dnd5eapi.co/api/monsters/';
if (!searchHistory.length) {
    var id = 0;
}
else {
    var id = searchHistory[searchHistory.length - 1].id; // set id to last id saved
}

//initialize search for given monster name
searchEl.addEventListener('click',function() {
    id++
    var searchTerm = inputEl.value;
    getMonster(searchTerm);
    var searchTermObj = {"id": id, "name": searchTerm} // save an id with the name for persistency
    searchHistory.push(searchTermObj);
    localStorage.setItem('monster',JSON.stringify(searchHistory));
});

function getMonster(name) {
    axios.get(queryURL + name)
    .then (function(response) {
        var monsterCardEl = document.createElement ('div');
        monsterCardEl.classList = ('card');
        monsterCardEl.setAttribute ('id', 'monster-container');
        monsterCardEl.dataset.id = id

        var monsterContent = document.createElement ('div');
        monsterContent.classList = ('card-content');
        monsterCardEl.appendChild(monsterContent);

        var monsterName = document.createElement('p');
        monsterName.classList = ('card-title');
        monsterName.innerText = 'Name: ' + response.data.name;
        monsterCardEl.appendChild(monsterName);

        var monsterHP = document.createElement('a');
        monsterHP.classList = ('dropdown-button btn');
        monsterHP.setAttribute ('href','#');
        // monsterHP.setAttribute ('data-target', 'dropdown1');
        monsterHP.setAttribute ('data-activates', 'dropdown');
        monsterHP.innerText = 'HP';
        monsterCardEl.appendChild(monsterHP);

        var hpDropdown = document.createElement('ul');
        hpDropdown.classList = ('dropdown-content');
        hpDropdown.setAttribute = ('id', 'dropdown');
        monsterCardEl.appendChild(hpDropdown);

        var hpContent = document.createElement('li');
        hpDropdown.appendChild(hpContent);

        var hpAnchor = document.createElement('a');
        hpAnchor.setAttribute ('href', '#');
        hpAnchor.innerText = response.data.hit_points;
        hpContent.appendChild(hpAnchor);

        var monsterStats = document.createElement('button');
        monsterStats.innerText = 'STATS';
        monsterCardEl.appendChild(monsterStats);

        monsterContainerEl.appendChild(monsterCardEl);
    });
}
$(document).ready(function(){
    $('.modal').modal();
});

$("#startBtn").click(function () {
    modalHandler($(this).html())
    $(".modalButton").click(function () {
        initiativeHandler($(this));
    });
});
