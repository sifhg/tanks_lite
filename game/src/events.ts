//Colours from style
let backgroundColour: string;
let textColour: string;
let allyWeakColour: string;
let allyStrongColour: string;
let enemyWeakColour: string;
let enemyStrongColour: string;

document.addEventListener("DOMContentLoaded", () => {
    let rootStyle: CSSStyleDeclaration = getComputedStyle(document.documentElement);
    
    backgroundColour = rootStyle.getPropertyValue("--background-colour");
    textColour = rootStyle.getPropertyValue("--text-colour");
    allyWeakColour = rootStyle.getPropertyValue("--ally-weak-colour");
    allyStrongColour = rootStyle.getPropertyValue("--ally-strong-colour");
    enemyWeakColour  = rootStyle.getPropertyValue("--enemy-weak-colour");
    enemyStrongColour = rootStyle.getPropertyValue("--enemy-strong-colour");

    const DISPLAYS: any = document.getElementsByClassName("display");
    DISPLAYS[0].style.display = "block";
    for(let i: number = 1; i < DISPLAYS.length; i++) {
        DISPLAYS[i].style.display = "none";
    }
})

const NAV: any = document.getElementsByTagName("nav")[0];
NAV.addEventListener("click", () => {
    const DISPLAYS: any = document.getElementsByClassName("display");

    for (let i: number = 0; i < DISPLAYS.length; i++) {
        const navChild = NAV.children[i];
        
        if (!(navChild && navChild.firstElementChild instanceof HTMLInputElement)){
            throw new Error("'navChild.firstElementChild' does not exist.");
        }

        if (navChild.firstElementChild.checked) {
            DISPLAYS[i].style.display = "block";
        } else {
            DISPLAYS[i].style.display = "none";
        }
    }
});
