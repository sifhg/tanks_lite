let cromwell: Tank, kv2: Tank;
let aim: Sprite;
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

    aim = new Sprite(mouse.x, mouse.y, 5);
    aim.collider = 'none';
    aim.visible = false;
    
    tankSprites = new Group();

    world.gravity.y = 0;
    cromwell = new Tank(tankSprites, 100, 100);
}

function draw() {
    clear();
    //background(backgroundColour + "10");

    if(keyIsDown(65)) { //LEFT
        cromwell.steer(Direction.Left);
    }
    if(keyIsDown(68)) { //RIGHT
        cromwell.steer(Direction.Right);
    }
    if(keyIsDown(87)) { //UP
        cromwell.drive(Direction.Forwards);
    }
    if(keyIsDown(83)) { //DOWN
        cromwell.drive(Direction.Backwards);
    }
    aim.moveTo({x: mouse.x, y: mouse.y}, 10);
    
    
    const DIRECTION = cromwell.decideTurretTurningDirection(aim.x, aim.y);
    if(DIRECTION == Direction.NONE) {
        cromwell.breakTurret();
    }else {
        cromwell.turnTurret({x: aim.x, y: aim.y});
    }

    //noLoop();
}