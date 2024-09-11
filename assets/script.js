const hexcodeInput = document.querySelector('#hexcode');
const form = document.querySelector('form');
const submitBtn = document.querySelector('#submit');
const randomBtn = document.querySelector('#random');
const modal = document.querySelector('.modal');


form.addEventListener('submit', submitHex);
randomBtn.addEventListener('click', generateRandom)

function submitHex(e) {
    e.preventDefault();
    setPrimary(hexcodeInput.value);
    const hsl = RGBToHSL(hexToRGB(hexcodeInput.value));
    console.log(hsl)
    setCSSVariables(generateColorPalette(hsl));
    // openModal();
}
// function openModal()
// modal.ariaHidden = 'false'

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

console.log(swatchHex)