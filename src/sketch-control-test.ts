let cromwell: Tank, kv2: Tank;
let tankSprites: Group;

let drive: boolean = false;
let steer: boolean = false;


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
}

function draw() {
    clear();
    //background(backgroundColour + "10");

    if(keyIsDown(LEFT_ARROW)) {
        cromwell.steer(Direction.Left);
    }
    if(keyIsDown(RIGHT_ARROW)) {
        cromwell.steer(Direction.Right);
    }
    if(keyIsDown(UP_ARROW)) {
        cromwell.drive(Direction.Forwards);
    }
    if(keyIsDown(DOWN_ARROW)) {
        cromwell.drive(Direction.Backwards);
    }
    const DIRECTION = cromwell.decideTurretTurningDirection(mouseX, mouseY, cromwell.dispersion/3)
    cromwell.turnTurret(DIRECTION);

    console.log(DIRECTION);

    fill(255, 255, 0, 127);
    let speedDirection = cos(cromwell.motionDirection - cromwell.direction)*cromwell.speed;
    if(speedDirection < -world.velocityThreshold) {
        fill(255, 0, 0, 127);

    }else if(speedDirection > 0) {
        fill(0, 255, 0, 127);
    }
    circle(20, 20, 40);

    //console.log(cromwell.relativeTurretDirection(mouseX, mouseY));
    //noLoop();
}