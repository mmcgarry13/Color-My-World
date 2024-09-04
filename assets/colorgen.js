//  create variables for the css root selector and body element, reference to primary css variable
const root = document.querySelector(':root');
const primary = getComputedStyle(root).getPropertyValue('--primary');
const body = document.querySelector('body');

// converts hex color values 00-FF into r, g, b values 0-255. 
function hexToRGB(hex){
    // split string into array
   const colors = hex.split('');

   // remove the #
   colors.shift();

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

// **********************TESTING************************** //
//  calls the function, assigns HSL object to hsl,  changes the body background color to the primary css variable. 
let hsl = rgbToHSL(hexToRGB(primary));
body.style.setProperty('background-color', `hsl(${hsl.hue}, ${hsl.saturation}%, ${hsl.lightness}%)`);