//Colours from style
let backgroundColour;
let textColour;
let allyWeakColour;
let allyStrongColour;
let enemyWeakColour;
let enemyStrongColour;

document.addEventListener("DOMContentLoaded", (event)=> {
    let rootStyle = getComputedStyle(document.documentElement);
    
    backgroundColour = rootStyle.getPropertyValue("--background-colour: #f7f4f3;");
    textColour = rootStyle.getPropertyValue("--text-colour: #2a2927;");
    allyWeakColour = rootStyle.getPropertyValue("--ally-weak-colour: #20dfbc;");
    allyStrongColour = rootStyle.getPropertyValue("--ally-strong-colour: #3d5c52;");
    enemyWeakColour  = rootStyle.getPropertyValue("--enemy-weak-colour: #f3c3bf;");
    enemyStrongColour = rootStyle.getPropertyValue("--enemy-strong-colour: #ff6b64;");
});