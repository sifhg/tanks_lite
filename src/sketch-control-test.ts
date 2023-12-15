let cromwell: Tank, kv2: Tank;
let tanks: Group;
let ball: Sprite;
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
    
    tanks = new Group();

    world.gravity.y = 0;
    cromwell = new Tank(tanks, 100, 100);
}

function draw() {
    clear();
    if(keyIsDown(LEFT_ARROW)) {
        cromwell.steer(Direction.Left);
        console.log("L");
        console.log(cromwell.motionDirection);
    }
    if(keyIsDown(RIGHT_ARROW)) {
        cromwell.steer(Direction.Right);
        console.log("R");
        console.log(cromwell.motionDirection);
    }
    if(keyIsDown(UP_ARROW)) {
        cromwell.drive(Direction.Forwards);
        console.log("U");
        console.log(cromwell.motionDirection);
    }
    if(keyIsDown(DOWN_ARROW)) {
        cromwell.drive(Direction.Backwards);
        console.log("D");
        console.log(cromwell.motionDirection);
    }

    fill(255, 255, 0, 127);
    if(cos(cromwell.motionDirection - cromwell.direction) < 0) {
        fill(255, 0, 0, 127);
        console.log("RED");
        console.log(`cosine: ${cos(cromwell.motionDirection - cromwell.direction)};`);

    }else if(cos(cromwell.motionDirection - cromwell.direction) > 0) {
        fill(0, 255, 0, 127);
        console.log("GREEN");
        console.log(`cosine: ${cos(cromwell.motionDirection - cromwell.direction)};`);
    }
    circle(20, 20, 40);
}