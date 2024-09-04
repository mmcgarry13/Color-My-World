const root = document.querySelector(':root');
let primary = getComputedStyle(root).getPropertyValue('--primary');

function hexToRGB(hex){
   const colors = hex.split('');
   colors.shift();
   let r = 0;
   let g = 0;
   let b = 0;
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
   return [parseInt(r, 16), parseInt(g, 16), parseInt(b, 16)];
}

console.log(hexToRGB(primary));