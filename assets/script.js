const hexcodeInput = document.querySelector('#hexcode');
const form = document.querySelector('form');
const submitBtn = document.querySelector('#submit');
const randomBtn = document.querySelector('#random');
const modal = document.querySelector('.modal');
const favoritesSection = document.querySelector('#favorites-section');
const favoritesButton = document.querySelector('#favorites');
const modalFavorites = document.querySelector('#favorites-modal');
let currentColors = [];

favoritesButton.addEventListener('click', renderFavorites);
form.addEventListener('submit', submitHex);
randomBtn.addEventListener('click', generateRandom);


function submitHex(e){
    e.preventDefault();
    setPrimary(hexcodeInput.value);
    const hsl = RGBToHSL(hexToRGB(hexcodeInput.value));
    console.log(hsl)
    currentColors = setCSSVariables(generateColorPalette(hsl));
    openModal();
}
function openModal(){
    modal.ariaHidden='false'
}

function generateRandom(){
    let r = Math.floor(Math.random() * 255).toString(16);
    let g = Math.floor(Math.random() * 255).toString(16);
    let b = Math.floor(Math.random() * 255).toString(16);
    if (r.length == 1){
        r = `0${r}`;
    }
    if (g.length == 1){
        g = `0${g}`;
    }
    if (b.length == 1){
        b = `0${b}`;
    }

    hexcodeInput.value = `#${r}${g}${b}`
}

console.log(swatchHex)



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
        circle.style.setAttribute('background-color', colors[i]);
        const p = document.createElement('p');
        p.setAttribute('class', 'hexcode-fav');
        p.textContent = colors[i];
        circle.appendChild(p);
        flexContainer.appendChild(circle);
    }
}

function readFavorites() {
    const favorites = JSON.parse(localStorage.getItem('favorites'));
    if (!favorites) {
        return []
    } else {
    return favorites
    }
}

function storeFavorites(colors) {
    let tempData = readFavorites();
    tempData.push(colors);
    JSON.stringify(localStorage.setItem('favorites', tempData));
}




function renderFavorites() {}