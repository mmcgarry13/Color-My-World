//  create variables for the css root selector and body element, reference to primary css variable
const root = document.querySelector(':root');
let primary = getComputedStyle(root).getPropertyValue('--primary');
const body = document.querySelector('body');

// converts hex color values 00-FF into r, g, b values 0-255. 
function hexToRGB(hex){
    // split string into array
   const colors = hex.split('');

   // remove the #
   if (colors[0] == '#'){
    colors.shift();
   }

   // initialize r,g,b values
   let r = 0;
   let g = 0;
   let b = 0;

   // determine whether the hex code is 3 digit or 6, assign r,g,b accordingly
   if (colors.length === 3){
    r = colors[0]+colors[0];
    g = colors[1]+colors[1];
    b = colors[2]+colors[2];
   }
   else if (colors.length === 6){
    r = colors[0]+colors[1];
    g = colors[2]+colors[3];
    b = colors[4]+colors[5];
   }

   //  returns object with r,g,b values 0-255
   return {
    r: parseInt(r, 16), 
    g: parseInt(g, 16), 
    b: parseInt(b, 16)
    };
}

function rgbToHSL(rgbObj){
    // assigns r,g,b from object, then converts it to a number between 0-1
    let { r,g,b } = rgbObj;
    r /= 255;
    g /= 255;
    b /= 255;
    
    // finds min and max value and the difference between, initializes h,s,l
    const min = Math.min(r,g,b);
    const max = Math.max(r,g,b);
    const delta = max - min;
    let h = 0;
    let s = 0;
    let l = 0;
    
    // finds quadrant of color circle to start from and calculates hue using light trig, provided by css-tricks.com
    if (delta == 0){
        h = 0;
    }
    else if (max == r){
        h = ( (g - b) / delta) % 6;
    }
    else if (max == g){
        h = ( (b - r) / delta) + 2;
    }
    else {
        h = (r - g) / delta + 4;
    }

    h = Math.round(h*60);
    if (h<0){
        h += 360;
    }

    // calculate lightness
    l = (max + min) / 2;

    //calculate saturation using some magic math provided my css-tricks.com
    if (delta == 0){
        s = 0;
    }
    else {
        s = delta / (1 - Math.abs(2 * l - 1));
    }

    //  returns object with hue, saturation, and lightness
    return {
        hue: h,
        saturation: s * 100, // this will be a percentage
        lightness: l * 100  // this will be a percentage
    };

}

// takes a hex color code as a string ('#000' or '#000000') and changes the css variable and global reference
function setPrimary(hexColor){
    root.style.setProperty('--primary', hexColor);
    primary = hexColor;
}

// takes the hslObject from rgbToHSL and returns a color palette object
function generateColorPalette(hslObject){
    const { h,s,l } = hslObject;
    const phi = 30; //degrees
    const colorPalette = {
        primary: {
            hue: h,
            saturation: s,
            lightness: l
        },
        adjacent1: {
            // if h + phi is less than or equal to 360, hue equals h + phi, 
            // else subtract 360 to get the correct angle
            hue: (h + phi) <= 360 ? h + phi : h + phi - 360,
            saturation: s,
            lightness: l
        },
        adjacent2: {
            // same deal but other direction
            hue: (h - phi) >= 0 ? h - phi : h - phi + 360,
            saturation: s,
            lightness: l
        },
        complimentary: {
            hue: (h + 180) <= 360 ? h + 180 : h + 180 - 360,
            saturation: s,
            lightness: l
        },
        triad1: {
            hue: (h + 180 + phi) <= 360 ? h + 180 + phi : h + 180 + phi - 360,
            saturation: s,
            lightness: l
        },
        triad2: {
            hue: (h + 180 - phi) >= 0 ? h + 180 - phi : h + 180 -phi + 360,
            saturation: s,
            lightness: l
        },
        light: {
            hue: h,
            saturation: s,
            lightness: (l + 20) <= 100 ? l + 20 : 100 
        },
        dark: {
            hue: h,
            saturation: s,
            lightness: (l - 20) >= 0 ? l - 20 : 0
        }
    }
    return colorPalette;
}



// **********************TESTING************************** //

//  sets primary color
setPrimary('#880');

//  calls the function, assigns HSL object to hsl,  changes the body background color to the primary css variable. 
let hsl = rgbToHSL(hexToRGB(primary));
body.style.setProperty('background-color', `hsl(${hsl.hue}, ${hsl.saturation}%, ${hsl.lightness}%)`);

// *********************TODOS***************************** //

// create function that converts hsl to hex code string

// create function that sets all css variables to new hexcodes