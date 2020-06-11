var searchEl = document.getElementById('search-button');
var searchHistory = JSON.parse(localStorage.getItem('monster')) || [];
var inputEl = document.getElementById('monster-input');
var monsterContainerEl = document.getElementById('monsters')

//initialize search for given city name
searchEl.addEventListener('click',function() {
    var searchTerm = inputEl.value;
    getMonster(searchTerm);
    searchHistory.push(searchTerm);
    localStorage.setItem('monster',JSON.stringify(searchHistory));
    // renderSearchHistory();
});

function getMonster(monsterName) {
    var queryURL = 'https://www.dnd5eapi.co/api/monsters/' + monsterName;
    axios.get(queryURL)
    .then (function(response) {
        var monsterEl = document.createElement ('div');
        monsterEl.classList = 'list-item flex-row';
        monsterEl.setAttribute ('id', 'monster-container');

        var monsterStats = document.createElement('span');
        monsterStats.textContent = response.data;
        console.log(response.data);

        monsterEl.appendChild(monsterStats);

        monsterContainerEl.appendChild(monsterEl);




  })
}

