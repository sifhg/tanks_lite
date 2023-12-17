"use strict";
let cromwell, kv2;
let tanks;
let ball;
let drive = false;
let steer = false;
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
    angleMode(DEGREES);
    tanks = new Group();
    world.gravity.y = 0;
    cromwell = new Tank(tanks, 100, 100);
}
let frameStart = 0;
function draw() {
    clear();
    if (keyIsDown(LEFT_ARROW)) {
        cromwell.steer(Direction.Left);
        if (frameStart == 0) {
            frameStart = frameCount;
        }
    }
    if (keyIsDown(RIGHT_ARROW)) {
        cromwell.steer(Direction.Right);
    }
    if (keyIsDown(UP_ARROW)) {
        cromwell.drive(Direction.Forwards);
    }
    if (keyIsDown(DOWN_ARROW)) {
        cromwell.drive(Direction.Backwards);
    }
    fill(255, 255, 0, 127);
    let speedDirection = cos(cromwell.motionDirection - cromwell.direction) * cromwell.speed / cromwell.maxSpeed;
    if (speedDirection < -world.velocityThreshold) {
        fill(255, 0, 0, 127);
    }
    else if (speedDirection > 0) {
        fill(0, 255, 0, 127);
    }
    circle(20, 20, 40);
    console.log(cromwell.direction);
    // if(cromwell.direction <= -270) {
    //     console.log(`Time for one wole turn: ${frameCount - frameStart} [frames]`);
    //     console.log(`Time for one wole turn: ${(frameCount - frameStart)/60} [seconds]`);
    //     noLoop();
    // }
}
