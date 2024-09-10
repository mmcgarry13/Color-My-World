//  create variables for the css root selector and body element, reference to primary css variable
const root = document.querySelector(':root');
const body = document.querySelector('body');
let primary = getComputedStyle(root).getPropertyValue('--primary');
let adjacent1 = getComputedStyle(root).getPropertyValue('--adjacent1');
let adjacent2 = getComputedStyle(root).getPropertyValue('--adjacent2');
let complimentary = getComputedStyle(root).getPropertyValue('--complimentary');
let triad1 = getComputedStyle(root).getPropertyValue('--triad1');
let triad2 = getComputedStyle(root).getPropertyValue('--triad2');
let light = getComputedStyle(root).getPropertyValue('--light');
let dark = getComputedStyle(root).getPropertyValue('--dark');
const swatchHex = document.querySelectorAll('.hexcode')


// converts hex color values 00-FF into r, g, b values 0-255. 
function hexToRGB(hex) {
    // split string into array
    const colors = hex.split('');

    // remove the #
    if (colors[0] == '#') {
        colors.shift();
    }

    // initialize r,g,b values
    let r = 0;
    let g = 0;
    let b = 0;

    // determine whether the hex code is 3 digit or 6, assign r,g,b accordingly
    if (colors.length === 3) {
        r = colors[0] + colors[0];
        g = colors[1] + colors[1];
        b = colors[2] + colors[2];
    }
    else if (colors.length === 6) {
        r = colors[0] + colors[1];
        g = colors[2] + colors[3];
        b = colors[4] + colors[5];
    }

    //  returns object with r,g,b values 0-255
    return {
        r: parseInt(r, 16),
        g: parseInt(g, 16),
        b: parseInt(b, 16)
    };
}

function RGBToHSL(rgbObj) {
    // assigns r,g,b from object, then converts it to a number between 0-1
    let { r, g, b } = rgbObj;
    r /= 255;
    g /= 255;
    b /= 255;

    // finds min and max value and the difference between, initializes h,s,l
    const min = Math.min(r, g, b);
    const max = Math.max(r, g, b);
    const delta = max - min;
    let h = 0;
    let s = 0;
    let l = 0;

    // finds quadrant of color circle to start from and calculates hue using math provided by css-tricks.com
    if (delta == 0) {
        h = 0;
    }
    else if (max == r) {
        h = ((g - b) / delta) % 6;
    }
    else if (max == g) {
        h = ((b - r) / delta) + 2;
    }
    else {
        h = (r - g) / delta + 4;
    }

    h = Math.round(h * 60);
    if (h < 0) {
        h += 360;
    }

    // calculate lightness
    l = (max + min) / 2;

    //calculate saturation using some magic math provided my css-tricks.com
    if (delta == 0) {
        s = 0;
    }
    else {
        s = delta / (1 - Math.abs(2 * l - 1));
    }

    //  returns object with hue, saturation, and lightness
    return {
        hue: h,
        saturation: (s * 100).toFixed(1), // this will be a percentage
        lightness: (l * 100).toFixed(1)  // this will be a percentage
    };

}

// takes a hex color code as a string ('#000' or '#000000') and changes the css variable and global reference
function setPrimary(hexColor) {
    root.style.setProperty('--primary', hexColor);
    primary = hexColor;
}

// takes the hslObject from rgbToHSL and returns a color palette object
function generateColorPalette(hslObject) {
    const h = hslObject.hue;
    const s = hslObject.saturation;
    const l = hslObject.lightness
    const phi = 30; //degrees
    const colorPalette = [
        {
            name: 'primary',
            hue: h,
            saturation: s,
            lightness: l,
        },
        {
            // if h + phi is less than or equal to 360, hue equals h + phi, 
            // else subtract 360 to get the correct angle
            name: 'adjacent1',
            hue: (h + phi) <= 360 ? h + phi : h + phi - 360,
            saturation: s,
            lightness: l
        },
        {
            // same deal but other direction
            name: 'adjacent2',
            hue: (h - phi) >= 0 ? h - phi : h - phi + 360,
            saturation: s,
            lightness: l
        },
        {
            name: 'complimentary',
            hue: (h + 180) <= 360 ? h + 180 : h + 180 - 360,
            saturation: s,
            lightness: l
        },
        {
            name: 'triad1',
            hue: (h + 180 + phi) <= 360 ? h + 180 + phi : h + 180 + phi - 360,
            saturation: s,
            lightness: l
        },
        {
            name: 'triad2',
            hue: (h + 180 - phi) <= 360 ? h + 180 - phi : h + 180 - phi - 360,
            saturation: s,
            lightness: l
        },
        {
            name: 'light',
            hue: h,
            saturation: (s - 20) <= 100 ? (s - 20).toFixed(1) : 100,
            lightness: l
        },
        {
            name: 'dark',
            hue: h,
            saturation: s,
            lightness: (l - 20) <= 100 ? (l - 20).toFixed(1) : 0
        }
    ]
    return colorPalette;
}

function HSLToHex(hslObject) {
    let h = hslObject.hue;
    let s = hslObject.saturation;
    let l = hslObject.lightness;

    // s and l need to be between 0 and 1
    s /= 100;
    l /= 100;

    //  This next bit of code is some magic math from css-tricks.com
    // c is chroma, or color intensity.  x is the second largest component. m the amount to add to each to match lightness.
    let c = (1 - Math.abs(2 * l - 1)) * s;
    let x = c * (1 - Math.abs((h / 60) % 2 - 1));
    let m = l - c / 2;
    // initialize r,g,b
    let r = 0;
    let g = 0;
    let b = 0;

    //  basically find the 60 degree section of the color wheel hue is pointing to, then assign r,g,b accordingly

    if (h >= 0 && h < 60) {
        r = c;
        g = x;
        b = 0;
    }
    else if (h >= 60 && h < 120) {
        r = x;
        g = c;
        b = 0;
    }
    else if (h >= 120 && h < 180) {
        r = 0;
        g = c;
        b = x;
    }
    else if (h >= 180 && h < 240) {
        r = 0;
        g = x;
        b = c;
    }
    else if (h >= 240 && h < 300) {
        r = x;
        g = 0;
        b = c;
    }
    else if (h >= 300 && h < 360) {
        r = c;
        g = 0;
        b = x;
    }
    r = (Math.round((r + m) * 255)).toString(16);
    g = (Math.round((g + m) * 255)).toString(16);
    b = (Math.round((b + m) * 255)).toString(16);

    if (r.length == 1) {
        r = `0${r}`;
    }
    if (g.length == 1) {
        g = `0${g}`;
    }
    if (b.length == 1) {
        b = `0${b}`;
    }

    return `#${r}${g}${b}`;
}

// takes an array of hsl color objects and changes the css variables accordingly, resets the global reference variables
function setCSSVariables(colorPalette) {
    colorPalette.forEach(color => {
        root.style.setProperty(`--${color.name}`, `${HSLToHex(color)}`);
    });
    primary = getComputedStyle(root).getPropertyValue('--primary');
    adjacent1 = getComputedStyle(root).getPropertyValue('--adjacent1');
    adjacent2 = getComputedStyle(root).getPropertyValue('--adjacent2');
    complimentary = getComputedStyle(root).getPropertyValue('--complimentary');
    triad1 = getComputedStyle(root).getPropertyValue('--triad1');
    triad2 = getComputedStyle(root).getPropertyValue('--triad2');
    light = getComputedStyle(root).getPropertyValue('--light');
    dark = getComputedStyle(root).getPropertyValue('--dark');

    let colors = [primary, adjacent1, adjacent2, complimentary, triad1, triad2, dark, light];
    for (let i = 0; i < swatchHex.length; i++) {
        swatchHex[i].textContent = colors[i];
    }
    return colors;
}
//  sets new primary color
// setPrimary('#595085');

//  calls the function, assigns HSL object to hsl
// let hsl = RGBToHSL(hexToRGB(primary));

//  takes hsl, generates color palette array of hsl objects, sets css variables with Hex color codes.
// setCSSVariables(generateColorPalette(hsl));

//  changes the body background color to the primary css variable. 
// body.style.setProperty('background-color', `${dark}`);