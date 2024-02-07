import p5Tanks, { Tank } from 'classes';
const ctSketch = (p) => {
    let tankSprites;
    let cromwell;
    p.preload = () => {
        tankSprites = new p.Group();
        p.world.gravity.y = 0;
        cromwell = new p.Tank(p, tankSprites, 100, 100);
        console.log(typeof p.Tank);
    };
    p.setup = () => {
        const DISPLAY = document.getElementById("display-control-test");
        if (DISPLAY === null) {
            throw new Error("DISPLAY === null: Element with id 'display-control-test' not found.");
        }
        let canvas = p.createCanvas(DISPLAY.offsetWidth, DISPLAY.offsetHeight);
        addEventListener('resize', () => {
            canvas.resize(DISPLAY.offsetWidth, DISPLAY.offsetHeight);
            p.background(backgroundColour);
        });
        p.angleMode(p.DEGREES);
    };
    p.draw = () => {
        //p.clear();
        p.background(backgroundColour + "10");
        if (p.keyIsDown(65)) { //LEFT
            cromwell.steer(Tank.Direction.Left);
        }
        if (p.keyIsDown(68)) { //RIGHT
            cromwell.steer(Tank.Direction.Right);
        }
        if (p.keyIsDown(87)) { //UP
            cromwell.drive(Tank.Direction.Forwards);
        }
        if (p.keyIsDown(83)) { //DOWN
            cromwell.drive(Tank.Direction.Backwards);
        }
    };
};
const ct = new p5Tanks(ctSketch, 'display-control-test');
// let cromwell: Tank, kv2: Tank;
// let tankSprites: Group;
/*
function setup() {
    const DISPLAY: HTMLElement | null = document.getElementById("display-control-test");
    if(DISPLAY === null) {
        throw new Error("DISPLAY === null: Element with id 'display-control-test' not found.");
    }
    let canvas: any = createCanvas(DISPLAY.offsetWidth, DISPLAY.offsetHeight);
    canvas.parent("display-control-test");
    addEventListener("resize", () => {
        canvas.resize(DISPLAY.offsetWidth, DISPLAY.offsetHeight);
        background(backgroundColour);
    });
    angleMode(DEGREES);
    
    tankSprites = new Group();

    world.gravity.y = 0;
    cromwell = new Tank(tankSprites, 100, 100);
}*/
// function draw() {
//     //clear();
//     background(backgroundColour + "10");
//     if(keyIsDown(65)) { //LEFT
//         cromwell.steer(Direction.Left);
//     }
//     if(keyIsDown(68)) { //RIGHT
//         cromwell.steer(Direction.Right);
//     }
//     if(keyIsDown(87)) { //UP
//         cromwell.drive(Direction.Forwards);
//     }
//     if(keyIsDown(83)) { //DOWN
//         cromwell.drive(Direction.Backwards);
//     }
//     cromwell.turnTurret({x: mouse.x, y: mouse.y});
//     const DIRECTION = cromwell.decideTurretTurningDirection(mouse.x, mouse.y);
//     //noLoop();
// }
