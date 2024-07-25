"use strict";
let backgroundColour;
let textColour;
let allyWeakColour;
let allyStrongColour;
let enemyWeakColour;
let enemyStrongColour;
document.addEventListener("DOMContentLoaded", () => {
    let rootStyle = getComputedStyle(document.documentElement);
    backgroundColour = rootStyle.getPropertyValue("--background-colour");
    textColour = rootStyle.getPropertyValue("--text-colour");
    allyWeakColour = rootStyle.getPropertyValue("--ally-weak-colour");
    allyStrongColour = rootStyle.getPropertyValue("--ally-strong-colour");
    enemyWeakColour = rootStyle.getPropertyValue("--enemy-weak-colour");
    enemyStrongColour = rootStyle.getPropertyValue("--enemy-strong-colour");
    const DISPLAYS = document.getElementsByClassName("display");
    DISPLAYS[0].style.display = "block";
    for (let i = 1; i < DISPLAYS.length; i++) {
        DISPLAYS[i].style.display = "none";
    }
});
const NAV = document.getElementsByTagName("nav")[0];
NAV.addEventListener("click", () => {
    const DISPLAYS = document.getElementsByClassName("display");
    for (let i = 0; i < DISPLAYS.length; i++) {
        const navChild = NAV.children[i];
        if (!(navChild && navChild.firstElementChild instanceof HTMLInputElement)) {
            throw new Error("'navChild.firstElementChild' does not exist.");
        }
        if (navChild.firstElementChild.checked) {
            DISPLAYS[i].style.display = "block";
        }
        else {
            DISPLAYS[i].style.display = "none";
        }
    }
});
//# sourceMappingURL=events.js.map