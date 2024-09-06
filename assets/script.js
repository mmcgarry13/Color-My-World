const hexcodeInput = document.querySelector('#hexcode');
const form = document.querySelector('form');
const submitBtn = document.querySelector('#submit');
const randomBtn = document.querySelector('#random');

form.addEventListener('submit', submitHex);
randomBtn.addEventListener('click', generateRandom)

function submitHex(e){
    e.preventDefault();
    setPrimary(hexcodeInput.value);
    const hsl = RGBToHSL(hexToRGB(hexcodeInput.value));
    setCSSVariables(generateColorPalette(hsl));
}

function generateRandom(){

}