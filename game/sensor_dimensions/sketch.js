class Kernel {
    sensors = [];
    total = 0;
    turret;
    angles = [];
    constructor(array, aTurret) {
        this.sensors = array;
        for(const SENSOR of this.sensors) {
            this.total += SENSOR;
        }
        this.turret = aTurret;
        
        this.angles.push(TWO_PI * this.sensors[0]/this.total);
        for(let i = 1; i < this.sensors.length; i++) {
            this.angles.push(this.angles[i-1] + TWO_PI * (this.sensors[i])/this.total);
        }
    }
    addSensor(frac) {
        this.sensors.push(frac);
        this.total += frac;

        this.angles = [];
        this.angles.push(TWO_PI * this.sensors[0]/this.total);
        for(let i = 1; i < this.sensors.length; i++) {
            this.angles.push(this.angles[i-1] + TWO_PI * (this.sensors[i])/this.total);
        }
    }
    
    display(dirX, dirY) {

        push();
        fill(255,255,255, 50);
        translate(width / 2, height / 2);
        let displacement = createVector(dirX - width/2, dirY - height/2);
        rotate(createVector(1,0).angleBetween(
            displacement
        ) - HALF_PI);

        beginShape();
        vertex(
            sin(this.angles[0]/2) * width/2,
            cos(this.angles[0]/2) * width/2
        );
        vertex(
            sin(this.angles[0]/2) * this.turret.size.y*2/3,
            cos(this.angles[0]/2) * this.turret.size.y*2/3 
        );
        vertex(
            sin(-this.angles[0]/2) * this.turret.size.y*2/3,
            cos(-this.angles[0]/2) * this.turret.size.y*2/3 
        );
        vertex(
            sin(-this.angles[0]/2) * width/2,
            cos(-this.angles[0]/2) * width/2
        );
        endShape(CLOSE);

        circle(0,this.turret.size.y*2/3, 5);

        pop();
    }
}

class Turret {
    static DISTANCE_SCALAR = 15.75;
    pos;
    size;

    constructor(){
        this.pos = new p5.Vector(p5.width/2, p5.height/2);
        this.size = new p5.Vector(2.908 * Turret.DISTANCE_SCALAR, 6.35 * Turret.DISTANCE_SCALAR);
    }
    display(dirX, dirY) {
        push();
        translate(width / 2, height / 2);
        let displacement = createVector(dirX - width/2, dirY - height/2);
        rotate(createVector(1,0).angleBetween(
            displacement
        ) - HALF_PI);
        rect(
            -this.size.x/2,
            -this.size.y/2,
            this.size.x,
            this.size.y
        )
        pop();
    }
}

let theTurret = new Turret();
let theKernel;

function setup() {
    createCanvas(816, 516);
    background(127);
    theKernel = new Kernel([1, 1, 3, 5, 8], theTurret);
}

function draw() {
    background(127);
    theTurret.display(mouseX, mouseY);
    theKernel.display(mouseX, mouseY);
}