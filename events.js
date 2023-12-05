//Colours from style
let backgroundColour;
let textColour;
let allyWeakColour;
let allyStrongColour;
let enemyWeakColour;
let enemyStrongColour;

document.addEventListener("DOMContentLoaded", (event)=> {
    let rootStyle = getComputedStyle(document.documentElement);
    
    backgroundColour = rootStyle.getPropertyValue("--background-colour");
    textColour = rootStyle.getPropertyValue("--text-colour");
    allyWeakColour = rootStyle.getPropertyValue("--ally-weak-colour");
    allyStrongColour = rootStyle.getPropertyValue("--ally-strong-colour");
    enemyWeakColour  = rootStyle.getPropertyValue("--enemy-weak-colour");
    enemyStrongColour = rootStyle.getPropertyValue("--enemy-strong-colour");

    const DISPLAYS = document.getElementsByClassName("display");
    DISPLAYS[0].style.display = "block";
    for(let i = 1; i < DISPLAYS.length; i++) {
        DISPLAYS[i].style.display = "none";
    }
});

const NAV = document.getElementsByTagName("nav")[0];
NAV.addEventListener("click", (event)=> {
    const DISPLAYS = document.getElementsByClassName("display");
    for(let i = 0; i < DISPLAYS.length; i++) {
        if(NAV.children[i].firstElementChild.checked) {
            DISPLAYS[i].style.display = "block";
        }else{
            DISPLAYS[i].style.display = "none";
        }
    }
})