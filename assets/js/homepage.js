var searchEl = document.getElementById('search-button');
var searchHistory = JSON.parse(localStorage.getItem('monster')) || [];
var inputEl = document.getElementById('monster-input');
var monsterContainerEl = document.getElementById('monster-container')    
var queryURL = 'https://www.dnd5eapi.co/api/monsters/';


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



