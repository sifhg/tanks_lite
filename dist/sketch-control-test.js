"use strict";
let cromwell, kv2;
let tanks;
let ball;
let drive = false;
function setup() {
    const DISPLAY = document.getElementById("display-control-test");
    if (DISPLAY === null) {
        throw new Error("DISPLAY === null: Element with id 'display-control-test' not found.");
    }
    let canvas = createCanvas(DISPLAY.offsetWidth, DISPLAY.offsetHeight);
    canvas.parent("display-control-test");
    addEventListener("resize", () => {
        canvas.resize(DISPLAY.offsetWidth, DISPLAY.offsetHeight);
        background(backgroundColour);
    });
    tanks = new Group();
    world.gravity.y = 0;
    cromwell = new Tank(tanks, 100, 100);
}
function draw() {
    clear();
    if (drive) {
        cromwell.forwards();
    }
    if (cromwell.velocity.y != 0) {
        console.log(cromwell.speed);
    }
}
