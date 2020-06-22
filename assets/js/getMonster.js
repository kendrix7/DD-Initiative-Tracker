var searchEl = document.getElementById('search-button');
var searchHistory = JSON.parse(localStorage.getItem('monster')) || [];
var inputEl = document.getElementById('monster-input');
var monsterContainerEl = document.getElementById('monsterColumn');
var queryURL = 'https://www.dnd5eapi.co/api/monsters/';

searchEl.addEventListener('click', function () {
    var searchTerm = inputEl.value.toLowerCase();
    getMonster(searchTerm);
    newMonsterSearch(searchTerm);
    searchHistory.push(searchTerm);
    localStorage.setItem('monster', JSON.stringify(searchHistory));
});

async function getMonsterFromAPI(monsterName) {
    let monster = await axios.get(queryURL + monsterName);
    return monster;
};

function getMonsterCardsFromLocalstorage() {
    let monsterCards = JSON.parse(localStorage.getItem("monsterCards"));
    console.log('in get from local', monsterCards);
    return monsterCards;
};

function putMonsterCardsInLocalstorage(monsterCardsArray) {
    localStorage.setItem("monsterCards", JSON.stringify(monsterCardsArray));
};

function createMonsterCardObj(monsterResponse) {
    let monsterCard = {
        name: monsterResponse.data.name,
        givenName: "",
        size: monsterResponse.data.size,
        alignment: monsterResponse.data.alignment,
        hit_points: monsterResponse.data.hit_points,
        strength: monsterResponse.data.strength,
        dexterity: monsterResponse.data.dexterity,
        intelligence: monsterResponse.data.intelligence,
        wisdom: monsterResponse.data.wisdom,
        charisma: monsterResponse.data.charisma,
        armor_class: monsterResponse.data.armor_class,
        speed: monsterResponse.data.speed.walk
    };
    return monsterCard;
};

// async function saveOneMonster(monsterCardData) {

// }

async function newMonsterSearch(searchTerm) {
    let monsterCardsArray = getMonsterCardsFromLocalstorage() || [];
    console.log('=== monster cards array ===\n', monsterCardsArray);
    let newMonster = await getMonsterFromAPI(searchTerm);
    let newMonsterCardData = await createMonsterCardObj(newMonster);
    monsterCardsArray.push(newMonsterCardData);
    localStorage.setItem("monsterCards", JSON.stringify(monsterCardsArray));
};

function getMonster(name) {
    axios.get(queryURL + name)
        .then(function (response) {
            var monsterCardEl = document.createElement('div');
            monsterCardEl.classList = ('card monster-card draggable col s12 center');


            var monsterContent = document.createElement('div');
            monsterContent.classList = ('card-content');
            monsterCardEl.appendChild(monsterContent);

            var monsterName = document.createElement('p');
            monsterName.classList = ('card-title monsterName');
            monsterName.innerText = response.data.name;
            monsterCardEl.appendChild(monsterName);

            var monsterAttributes = document.createElement('p');
            monsterAttributes.classList = (' monsterAttributes');
            monsterAttributes.innerText = response.data.size + ', ' + response.data.alignment;
            monsterCardEl.appendChild(monsterAttributes);

            var monsterEditName = document.createElement('input');
            monsterEditName.classList = ('center');
            monsterEditName.setAttribute('placeholder', "Unique Monster Name");
            monsterCardEl.appendChild(monsterEditName);

            var monsterHpInput = document.createElement('input');
            monsterHpInput.classList = ('center');
            monsterHpInput.setAttribute('placeholder', 'HP: ' + response.data.hit_points);
            monsterCardEl.appendChild(monsterHpInput);

            var monsterHP = document.createElement('a');
            monsterHP.classList = ('tooltipped btn');
            monsterHP.setAttribute('data-position', 'right');
            monsterHP.setAttribute('data-tooltip', response.data.hit_points);
            monsterHP.innerText = 'HP';
            monsterCardEl.appendChild(monsterHP);

            M.Tooltip.init(monsterHP);

            var monsterStats = document.createElement('a');
            monsterStats.classList = ('tooltipped btn');
            monsterStats.setAttribute('data-position', 'right');
            monsterStats.setAttribute('data-tooltip', 'STR: ' + response.data.strength + ' | ' + 'DEX: ' + response.data.dexterity + ' | ' + 'INT: ' + response.data.intelligence + ' | ' + 'WIS: ' + response.data.wisdom + ' | ' + 'CON: ' + response.data.constitution + ' | ' + 'CHA: ' + response.data.charisma);
            monsterStats.innerText = 'STATS';
            monsterCardEl.appendChild(monsterStats);

            M.Tooltip.init(monsterStats);

            var monsterArmorClass = document.createElement('a');
            monsterArmorClass.classList = ('tooltipped btn');
            monsterArmorClass.setAttribute('data-position', 'right');
            monsterArmorClass.setAttribute('data-tooltip', response.data.armor_class);
            monsterArmorClass.innerText = 'Armor';
            monsterCardEl.appendChild(monsterArmorClass);

            M.Tooltip.init(monsterArmorClass);

            var monsterSpeed = document.createElement('a');
            monsterSpeed.classList = ('tooltipped btn');
            monsterSpeed.setAttribute('data-position', 'right');
            monsterSpeed.setAttribute('data-tooltip', response.data.speed.walk);
            monsterSpeed.innerText = 'Speed';
            monsterCardEl.appendChild(monsterSpeed);

            M.Tooltip.init(monsterSpeed);

            // TODO: what is this supposed to do?
            // battleBtnHandler(monsterCardEl);

            monsterContainerEl.append(monsterCardEl);

            $(".battleBtn").off();
            $(".battleBtn").on("click", function () {

                if ($(this).parents("#playerColumn").html() || $(this).parents("#monsterColumn").html()) {
                    $(this).closest(".draggable").appendTo("#battleContainer");
                    $(this).text("Remove");
                }
                else if ($(this).parents("#battleColumn").html()) {
                    if ($(this).parents(".player-card").html()) {
                        $(this).closest(".draggable").appendTo("#playerContainer");
                        $(this).text("Battle!")
                    }
                    else if ($(this).parents(".monster-card").html()) {
                        $(this).closest(".draggable").appendTo("#monsterContainer");
                        $(this).text("Battle!")
                    }

                }
            })


        });
};
