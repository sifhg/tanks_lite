"use strict";
let cromwell, kv2;
let aim;
let tankSprites;
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
    aim = new Sprite(mouse.x, mouse.y, 5);
    aim.collider = 'none';
    aim.visible = false;
    tankSprites = new Group();
    world.gravity.y = 0;
    cromwell = new Tank(tankSprites, 100, 100);
}
function draw() {
    //clear();
    background(backgroundColour + "10");
    if (keyIsDown(LEFT_ARROW)) {
        cromwell.steer(Direction.Left);
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
    aim.moveTo({ x: mouse.x, y: mouse.y }, 10);
    const DIRECTION = cromwell.decideTurretTurningDirection(aim.x, aim.y);
    if (DIRECTION == Direction.NONE) {
        cromwell.breakTurret();
        console.log("break");
    }
    else {
        cromwell.turnTurret({ x: aim.x, y: aim.y });
        console.log("move");
    }
    //console.log(DIRECTION);
    fill(255, 255, 0, 127);
    let speedDirection = cos(cromwell.motionDirection - cromwell.direction) * cromwell.speed;
    if (speedDirection < -world.velocityThreshold) {
        fill(255, 0, 0, 127);
    }
    else if (speedDirection > 0) {
        fill(0, 255, 0, 127);
    }
    circle(20, 20, 40);
    //console.log(cromwell.relativeTurretDirection(mouseX, mouseY));
    //noLoop();
}
