import { modalHandler } from "./modules/battleModal.js";

var searchEl = document.getElementById('search-button');
var searchHistory = JSON.parse(localStorage.getItem('monster')) || [];
var inputEl = document.getElementById('monster-input');
<<<<<<< HEAD
var monsterContainerEl = document.getElementById('monsterList-container')
=======
var monsterContainerEl = document.getElementById('monster-container')    
var queryURL = 'https://www.dnd5eapi.co/api/monsters/';
>>>>>>> 37136f1ca76a9cf45fdfb52301bdc6a93cb53c03


//initialize search for given monster name
searchEl.addEventListener('click',function() {
    var searchTerm = inputEl.value;
    getMonster(searchTerm);
    searchHistory.push(searchTerm);
    localStorage.setItem('monster',JSON.stringify(searchHistory));
});

function getMonster(name) {
    axios.get(queryURL + name)
    .then (function(response) {
        var monsterCardEl = document.createElement ('div');
        monsterCardEl.classList = ('card');
        monsterCardEl.setAttribute ('id', 'monster-container');

        var monsterContent = document.createElement ('div');
        monsterContent.classList = ('card-content');
        monsterCardEl.appendChild(monsterContent);

        var monsterName = document.createElement('p');
        monsterName.classList = ('card-title');
        monsterName.innerText = 'Name: ' + response.data.name;
<<<<<<< HEAD
        monsterName.setAttribute("class", "monsterName");
        monsterEl.appendChild(monsterName);

        var monsterHP = document.createElement('li');
        monsterHP.innerText = 'HP: ' + response.data.hit_points;
        monsterHP.setAttribute("id", "monsterHP");
        monsterEl.appendChild(monsterHP);
=======
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
>>>>>>> 37136f1ca76a9cf45fdfb52301bdc6a93cb53c03

        var monsterStats = document.createElement('button');
        monsterStats.innerText = 'STATS';
        monsterCardEl.appendChild(monsterStats);

        monsterContainerEl.appendChild(monsterCardEl);
    });
<<<<<<< HEAD
}
$(document).ready(function(){
    $('.modal').modal();
});

$("#startBtn").click(function () {
    modalHandler($(this).html())
});
=======
} 



>>>>>>> 37136f1ca76a9cf45fdfb52301bdc6a93cb53c03
