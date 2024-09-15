//query selectors

const hexcodeInput = document.querySelector('#hexcode');
const form = document.querySelector('form');
const submitBtn = document.querySelector('#submit');
const randomBtn = document.querySelector('#random');
const modal = document.querySelector('.modal');
const favoritesSection = document.querySelector('#favorites-section');
const modalFavorites = document.querySelector('#favorites-modal');
const noFavorites = document.querySelector('#no-favorites');
const notFavoriteButton = document.querySelector('#notFavorites-modal');

let currentColors = [];

// to randomize favorite or not favorite labels on modal 
const nolabels = [
    "It's A No From Me Dog", 
    "Color Me Unimpressed", 
    "They Can't All Be Winners", 
    "Bye, Felicia", 
    "Enough Color for Today", 
    "Nope, Next!"
];
const yesLabels = [
    "That'll Do", 
    "Saving This Masterpiece", 
    "Because Why Not", 
    "YOLO", 
    "Let's Pretend I Love It", 
    "Yes, 💖 that 💩"
];
let x = 0;
let n = 0;

// Event Listeners

modalFavorites.addEventListener('click', e => {
    storeFavorites(currentColors);
});
form.addEventListener('submit', submitHex);
randomBtn.addEventListener('click', generateRandom);

// Listener Functions

//  Submits Form Info
function submitHex(e) {
    e.preventDefault();
    updateNotFavoriteButton();
    updateModalFavorites();
    setPrimary(hexcodeInput.value);
    const hsl = RGBToHSL(hexToRGB(hexcodeInput.value));
    currentColors = setCSSVariables(generateColorPalette(hsl));
}

// Random and flavor text Functions

// Generates a random hexcode and updates form
function generateRandom() {
    let r = Math.floor(Math.random() * 255).toString(16);
    let g = Math.floor(Math.random() * 255).toString(16);
    let b = Math.floor(Math.random() * 255).toString(16);
    if (r.length == 1) {
        r = `0${r}`;
    }
    if (g.length == 1) {
        g = `0${g}`;
    }
    if (b.length == 1) {
        b = `0${b}`;
    }
    hexcodeInput.value = `#${r}${g}${b}`
}

// Updates text of Modal Buttons
const updateNotFavoriteButton = function () {
    notFavoriteButton.innerHTML = nolabels[n];
    n++;
    if (n == nolabels.length) {
        n = 0;
    }
}
const updateModalFavorites = function () {
    modalFavorites.innerHTML = yesLabels[x];
    x++;
    if (x == yesLabels.length) {
        x = 0;
    }
}

// Page Builders

// Builds a favorites card and adds it to the DOM
function buildFavoritesCard(colors) {
    const card = document.createElement('div');
    card.setAttribute('class', 'card')
    const cardBody = document.createElement('div');
    cardBody.setAttribute('class', 'card-body');
    const h5 = document.createElement('h5');
    h5.setAttribute('class', 'card-title text-center');
    const flexContainer = document.createElement('div');
    flexContainer.setAttribute('class', 'd-flex justify-content-center flex-wrap');
    favoritesSection.appendChild(card);
    card.appendChild(cardBody);
    cardBody.appendChild(h5);
    cardBody.appendChild(flexContainer);
    for (let i = 0; i < colors.length; i++) {
        const circle = document.createElement('div');
        circle.setAttribute('class', 'circle primary m-2');
        circle.setAttribute('style', `background-color: ${colors[i]}`);
        const p = document.createElement('p');
        p.setAttribute('class', 'hexcode-fav');
        p.textContent = colors[i];
        circle.appendChild(p);
        flexContainer.appendChild(circle);
    }
}

// Renders favorites section if it exists in local storage
function renderFavorites() {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites'));
    if (!storedFavorites) {
    }
    else {
        noFavorites.setAttribute('style', 'display: none');
        favoritesSection.innerHTML = '';
        let data = readFavorites();
        for (item of data) {
            buildFavoritesCard(item);
        }
    }
}

// Local Storage Functions

// Reads local storage and returns data
function readFavorites() {
    const favorites = JSON.parse(localStorage.getItem('favorites'));
    if (!favorites) {
        return [];
    } else {
        return favorites;
    }
}

// Appends current color data to local storage
function storeFavorites(colors) {
    let tempData = readFavorites();
    tempData.push(colors);
    localStorage.setItem('favorites', JSON.stringify(tempData));
    renderFavorites();
}

// Page load function calls

renderFavorites();