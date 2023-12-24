class Tank {
    static DISTANCE_SCALAR = 15.75;
    static SPEED_SCALAR = 4.1 / Tank.DISTANCE_SCALAR;
    static TANKS: Tank[] = [];

    private _mass: number;
    private _maxSpeed: number;
    private _name: string;
    private _modules: Group;
    private _hull: Sprite;
    private _tracks: {
        t0: Sprite,
        t1: Sprite
    }
    private _joints: {
        jr: GlueJoint,
        jl: GlueJoint
    }

    constructor(group: Group, x: number, y: number,
                width: number = 2.908, length: number = 6.35,
                name: string = "Cromwell", wheelWidth: number = 0.394) {
        this._modules = new group.Group();


        this._hull = new this._modules.Sprite(x, y, width * Tank.DISTANCE_SCALAR, length * Tank.DISTANCE_SCALAR, "d");
        this._tracks = {
            t0: new this._modules.Sprite(x + this._hull.halfWidth + wheelWidth*Tank.DISTANCE_SCALAR/2, y, wheelWidth * Tank.DISTANCE_SCALAR, length * Tank.DISTANCE_SCALAR, "d"),
            t1: new this._modules.Sprite(x - this._hull.halfWidth - wheelWidth*Tank.DISTANCE_SCALAR/2, y, wheelWidth * Tank.DISTANCE_SCALAR, length * Tank.DISTANCE_SCALAR, "d")
        }

        this._joints = {
            jr: new GlueJoint(this._hull, this._tracks.t0),
            jl: new GlueJoint(this._hull, this._tracks.t1) 
        }
        
        this._name = name;
        
        this._mass = 27 * Tank.SPEED_SCALAR; // 27[tons]
        this._hull.drag = 5;
        this._hull.rotationDrag = 15;
        this._hull.mass = this._mass * Tank.DISTANCE_SCALAR * .5;
        this._tracks.t0.mass = this._mass * Tank.DISTANCE_SCALAR * .1;
        this._tracks.t1.mass = this._mass * Tank.DISTANCE_SCALAR * .1;
        //this._turret.mass = this._mass * Tank.DISTANCE_SCALAR * .3;

        this._maxSpeed = 17.78 * Tank.SPEED_SCALAR; // 17.78 [m/s]

        Tank.TANKS.push(this);
    }




    //Controls

    drive(power: Direction): void {
        this._hull.bearing = this._hull.rotation + (90 * Math.sign(power));
        const SPEED = this._maxSpeed * Math.abs(power);
        if(Math.abs(this.speed) < this._maxSpeed) {
            this._hull.applyForce(SPEED)
        }
    }
    steer(power: Direction): void{
        this._tracks.t0.bearing = this._hull.rotation + (90 * Math.sign(power));
        this._tracks.t1.bearing = this._hull.rotation - (90 * Math.sign(power));

        if(cos(this.motionDirection - this.direction) * this.speed < -world.velocityThreshold) {
            const TEMP = this._tracks.t0.bearing;
            this._tracks.t0.bearing = this._tracks.t1.bearing;
            this._tracks.t1.bearing = TEMP;
        }

        const SPEED = this._maxSpeed * Math.abs(power);

        //Left track
        if(Math.abs(this._tracks.t0.speed) < this._maxSpeed) {
            this._tracks.t0.applyForce(SPEED);
        }

        //Right track
        if(Math.abs(this._tracks.t1.speed) < this._maxSpeed) {
            this._tracks.t1.applyForce(SPEED);
        }
    }
    applyForce2Tracks(direction: number, strength: number) {
        this._tracks.t0.bearing = direction;
        this._tracks.t1.bearing = direction;
        this._tracks.t0.applyForce(strength/2);
        this._tracks.t1.applyForce(strength/2);
    }



    //Getters
    get name(): string {
        return this._name;
    }
    get velocity(): {x: number, y: number} {
        return {
            x: this._hull.velocity.x,
            y: this._hull.velocity.y
        }
    }
    get speed(): number {
        return dist(0, 0 , this._hull.velocity.x, this._hull.velocity.y);
    }
    get trackSpeed(): {s0: number, s1: number} {
        return {
            s0: dist(0, 0 , this._tracks.t0.velocity.x, this._tracks.t0.velocity.y),
            s1: dist(0, 0 , this._tracks.t1.velocity.x, this._tracks.t1.velocity.y),
        }
    }
    get maxSpeed(): number {
        return this._maxSpeed;
    }
    get direction(): number {
        return this._hull.rotation + 90;
    }
    get motionDirection(): number {
        return atan2(cromwell.velocity.y,cromwell.velocity.x);
    }

    //Setters
    setName(N: string): void {
        this._name = N;
    }
}

enum Direction{
    Forwards = 300,
    Backwards = -150,
    Left = -8,
    Right = 8
}

p5.prototype.registerMethod('pre', function applySideDragForce() {
    for(const TANK of Tank.TANKS) {
        const FORCE_DIRECTION: number = TANK.motionDirection - 180;
        const FORCE_MAGNITUDE: number = Math.abs(sin(TANK.motionDirection - TANK.direction)) * TANK.speed * 5000;
        TANK.applyForce2Tracks(FORCE_DIRECTION, FORCE_MAGNITUDE);
    }
})