import p5Tanks, { Tank } from "classes";
const ctSketch = (p) => {
    let tankSprites;
    let cromwell;
    let kv2;
    p.preload = () => {
        tankSprites = new p.Group();
        p.world.gravity.y = 0;
        cromwell = new p.Tank(p, tankSprites, 100, 100);
        kv2 = new p.Tank(p, tankSprites, 50, 50, 3.35, 6.67, 52, 7.78, 3.57, 51.5, "kv-2", 0.7);
        console.log(cromwell.dimensions);
    };
    p.setup = () => {
        p.angleMode(p.DEGREES);
        const DISPLAY = document.getElementById("display-control-test");
        if (DISPLAY === null) {
            throw new Error("DISPLAY === null: Element with id 'display-control-test' not found.");
        }
        let canvas = p.createCanvas(DISPLAY.offsetWidth, DISPLAY.offsetHeight);
        addEventListener("resize", () => {
            canvas.resize(DISPLAY.offsetWidth, DISPLAY.offsetHeight);
            p.background(backgroundColour);
        });
        new p.Barrier(p, 250, 250, 50);
        p.camera.x = cromwell.x;
        p.camera.y = cromwell.y;
    };
    let lowest = 10;
    let highest = -10;
    p.draw = () => {
        p.clear();
        //p.background(backgroundColour + "10");
        if (p.keyIsDown(65)) {
            //LEFT
            cromwell.steer(Tank.Direction.Left);
        }
        if (p.keyIsDown(68)) {
            //RIGHT
            cromwell.steer(Tank.Direction.Right);
        }
        if (p.keyIsDown(87)) {
            //UP
            cromwell.drive(Tank.Direction.Forwards);
        }
        if (p.keyIsDown(83)) {
            //DOWN
            cromwell.drive(Tank.Direction.Backwards);
        }
        const MOTDIR = cromwell.motionDirection;
        const DIR = cromwell.direction;
        if (p.cos(MOTDIR - DIR) < lowest) {
            lowest = p.cos(MOTDIR - DIR);
        }
        if (p.cos(MOTDIR - DIR) > highest) {
            highest = p.cos(MOTDIR - DIR);
        }
        const DIRECTION = cromwell.decideTurretTurningDirection(p.mouse.x, p.mouse.y);
        cromwell.turnTurret(DIRECTION);
        if (Math.abs(cromwell.x - p.camera.x) > p.width / 3) {
            p.camera.x += cromwell.velocity.x;
        }
        if (Math.abs(cromwell.y - p.camera.y) > p.height / 5) {
            p.camera.y += cromwell.velocity.y;
        }
    };
};
const ct = new p5Tanks(ctSketch, "display-control-test");
