class Tank {
    static DISTANCE_SCALAR = 15.75;
    static SPEED_SCALAR = 4.1 / Tank.DISTANCE_SCALAR;
    static TANKS: Tank[] = [];
    static TANK_SPRITES: Group = new Group();

    //Specifications
    private _damage: number;
    private _mass: number;
    private _maxSpeed: number;
    private _name: string;
    private _dispersion: number;

    //p5play members
    private _modules: Group;
    private _hull: Sprite;
    private _turret: Sprite;
    private _tracks: {
        t0: Sprite,
        t1: Sprite
    }
    private _joints: {
        jr: GlueJoint,
        jl: GlueJoint,
        turretAxle: WheelJoint
    }

    constructor(x: number, y: number,
                width: number = 2.908, length: number = 6.35,
                mass: number = 27, maxSpeed:number = 17.78,
                barrelLength: number = 2.82, shellMass = 2.72,
                name: string = "Cromwell", wheelWidth: number = 0.394) {

        //Specifications
        this._damage = shellMass;
        this._mass = mass * Tank.SPEED_SCALAR; // 27[tons]
        this._name = name;
        this._dispersion = atan(shellMass / barrelLength) / Tank.DISTANCE_SCALAR;
        this._maxSpeed = maxSpeed * Tank.SPEED_SCALAR; // 17.78 [m/s]

        //p5play members
        this._modules = new Tank.TANK_SPRITES.Group();

        this._hull = new this._modules.Sprite(x, y, width * Tank.DISTANCE_SCALAR, length * Tank.DISTANCE_SCALAR, "d");
        this._tracks = {
            t0: new this._modules.Sprite(x + this._hull.halfWidth + wheelWidth*Tank.DISTANCE_SCALAR/2, y, wheelWidth * Tank.DISTANCE_SCALAR, length * Tank.DISTANCE_SCALAR, "d"),
            t1: new this._modules.Sprite(x - this._hull.halfWidth - wheelWidth*Tank.DISTANCE_SCALAR/2, y, wheelWidth * Tank.DISTANCE_SCALAR, length * Tank.DISTANCE_SCALAR, "d")
        }
        this._turret = new this._modules.Sprite(x, y + this._hull.halfHeight - this._hull.height/3, this._hull.width);
        let calibre = Math.sqrt(shellMass/PI) * 0.0306 * 2;


        this._joints = {
            jr: new GlueJoint(this._hull, this._tracks.t0),
            jl: new GlueJoint(this._hull, this._tracks.t1),
            turretAxle: new WheelJoint(this._hull, this._turret)
        }
        this._turret.addCollider(0, (barrelLength * Tank.DISTANCE_SCALAR / 2) + this._hull.halfWidth*2/3, (calibre + 0.08) * Tank.DISTANCE_SCALAR, barrelLength * Tank.DISTANCE_SCALAR);
        this._turret.overlaps(this._tracks.t0);
        this._turret.overlaps(this._tracks.t1);
        
        this._hull.drag = 5;
        this._hull.rotationDrag = 15;
        this._hull.mass = this._mass * Tank.DISTANCE_SCALAR * .6;
        this._tracks.t0.mass = this._mass * Tank.DISTANCE_SCALAR * .2;
        this._tracks.t1.mass = this._mass * Tank.DISTANCE_SCALAR * .2;

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
    turnTurret(power: Direction|number|{x: number, y: number}) {
        const SPEED_AMPLITUDE = Direction.Right * Tank.SPEED_SCALAR * this._maxSpeed / this._mass;

        if(typeof power == "number" || typeof power == "object") {
            this._turret.rotateTo(power, SPEED_AMPLITUDE, -90);
            this._turret.rotationSpeed += this._hull.rotationSpeed;
        }
    }
    breakTurret() {
        this._turret.rotationSpeed = 0;
        this._turret.rotateTo(this._turret.rotation);
    }

    //Setters
    setName(N: string): void {
        this._name = N;
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
    get dispersion(): number {
        return this._dispersion;
    }
    get motionDirection(): number {
        return atan2(cromwell.velocity.y,cromwell.velocity.x);
    }
    get turretDirection(): number {
        let rotation = this._turret.rotation + 90;
        while(rotation < 0) {
            rotation += 360;
        }
        return rotation % 360;
    }

    //Helpers
    protected getAngle2Turret(xa: number, y?: number): number {
        if(y == undefined) {
            //If only an angle is provided
            let rotation = this._turret.rotation - xa

            // Normalize the angle to be between -180 and 180 degrees
            while(rotation < -180) {
                rotation += 360;
            }
            return rotation % 360;
        }
        const DX = xa - this._turret.x;
        const DY = y - this._turret.y;
        let rotation = -atan2(DX, DY) - this._turret.rotation;

        // Normalize the angle to be between -180 and 180 degrees
        while(rotation < -180) {
            rotation += 360;
        }
        return rotation % 360;
    }
    protected getPerpendicularDistance2Turret(x: number, y: number): number {
        const DISTANCE = dist(x, y, this._turret.x, this._turret.y);
        const ANGLE = this.getAngle2Turret(x, y);
        const PERPENDICULAR_DISTANCE = sin(ANGLE) * DISTANCE;
        return PERPENDICULAR_DISTANCE;
    }
    decideTurretTurningDirection(x: number, y: number, threshold: number = this.dispersion*2/3): Direction {
        if(threshold < 0) {
            throw new Error("The input threshold of decideTurretTurningDirection cannot be a negative number");
        }

        if(this._turret.angleToFace(x, y, -90) <= -threshold/2) {
            return Direction.Right;
        }
        if(this._turret.angleToFace(x, y, -90) >= threshold/2) {
            return Direction.Left;
        }

        //Handles cases where the point is behind the turret
        if(cos(this.getAngle2Turret(x, y)) < 0) {
            return this.decideTurretTurningDirection(x, y, 0);
        }
        return Direction.NONE;
    }
}

class Barrier {
    static BARRIERS: Barrier[] = [];

    body: Sprite;
    constructor(x: number, y: number, r: number);
    constructor(x: number, y: number, w: number, h: number);
    constructor(x: number, y: number, arg3: number, arg4?: number) {
        if ([...arguments].length == 3) {
            this.body = new Sprite(x, y, arg3);
        } else {
            this.body = new Sprite(x, y, arg3, arg4);
        }
        this.body.collider = "static";
        this.body.colour = color(0);

        Barrier.BARRIERS.push(this);
    }
}

enum Direction{
    Forwards = 300,
    Backwards = -150,
    Left = -8,
    Right = 8,
    NONE = 0
}

p5.prototype.registerMethod('pre', function applySideDragForce() {
    for(const TANK of Tank.TANKS) {
        const FORCE_DIRECTION: number = TANK.motionDirection - 180;
        const FORCE_MAGNITUDE: number = Math.abs(sin(TANK.motionDirection - TANK.direction)) * TANK.speed * 5000;
        TANK.applyForce2Tracks(FORCE_DIRECTION, FORCE_MAGNITUDE);
    }
})