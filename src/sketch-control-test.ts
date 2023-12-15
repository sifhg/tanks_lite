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
    tanks = new Group();

    world.gravity.y = 0;
    cromwell = new Tank(tanks, 100, 100);
}

function draw() {
    clear();
    if(drive) {
        cromwell.drive(Direction.Forwards);
    }
    if(cromwell.velocity.y != 0) {
        console.log(cromwell.speed);
    }

    if(steer) {
        cromwell.steer(Direction.Right);
    }
}