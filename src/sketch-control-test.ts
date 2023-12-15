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
        //world.step();
    }
    if(keyIsDown(RIGHT_ARROW)) {
        cromwell.steer(Direction.Right);
        //world.step();
    }
    if(keyIsDown(UP_ARROW)) {
        cromwell.drive(Direction.Forwards);
        //world.step();
    }
    if(keyIsDown(DOWN_ARROW)) {
        cromwell.drive(Direction.Backwards);
        //world.step();
    }

    //console.log(cromwell.direction);
}