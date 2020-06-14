    var searchEl = document.getElementById('search-button');
    var searchHistory = JSON.parse(localStorage.getItem('monster')) || [];
    var inputEl = document.getElementById('monster-input');
    var monsterContainerEl = document.getElementById('monsterList-container')
    var queryURL = 'https://www.dnd5eapi.co/api/monsters/';
    console.log(searchHistory);

    //initialize search for given monster name
    searchEl.addEventListener('click', function () {
        var searchTerm = inputEl.value;
        getMonster(searchTerm);
        searchHistory.push(searchTerm);
        localStorage.setItem('monster', JSON.stringify(searchHistory));
    });

    function getMonster(name) {
        axios.get(queryURL + name)
            .then(function (response) {
                var monsterCardEl = document.createElement('div');
                monsterCardEl.classList = ('card');
                monsterCardEl.setAttribute('id', 'monsterList-container');

                var monsterContent = document.createElement('div');
                monsterContent.classList = ('card-content');
                monsterCardEl.appendChild(monsterContent);

                var monsterName = document.createElement('p');
                monsterName.classList = ('card-title monsterName');
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
            });
    }

    // generates content for the modal
    var modalHandler = function (playerEl) {
        var playerContainerEl = $("#monsterList-container") // #monsterList-container needs to be switched to player
        var playerList = playerContainerEl.find(".monsterName") || []; // .monsterName needs to be switched to player name
        console.log(playerList);

        // takes each player entered and makes their name into a button in the modal
        playerList.each(function () {
            var playerName = $(this).text().split(":")[1].trim();
            var modalButtonEl = $("<a>").addClass("waves-effect waves-light btn").text(playerName);
            var modalContentEl = $(".modal-content");
            modalContentEl.append(modalButtonEl); // buttons don't generate with spacing... idk why.
        });
    }

    $(document).ready(function () {
        $('.tooltipped').tooltip();
    });

    $(document).ready(function () {
        $('.modal').modal();
    });

    $("#startBtn").click(function () {
        modalHandler($(this).html())
    });
