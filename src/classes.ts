class Tank {
    static DISTANCE_SCALAR = 15.75;
    static SPEED_SCALAR = 4.1 / Tank.DISTANCE_SCALAR;

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
        this._hull.rotationDrag = 5;
        this._hull.mass = this._mass * Tank.DISTANCE_SCALAR * .5;
        this._tracks.t0.mass = this._mass * Tank.DISTANCE_SCALAR * .1;
        this._tracks.t1.mass = this._mass * Tank.DISTANCE_SCALAR * .1;
        //this._turret.mass = this._mass * Tank.DISTANCE_SCALAR * .3;

        this._maxSpeed = 17.78 * Tank.SPEED_SCALAR; // 17.78 [m/s]
    }




    //Controls

    drive(power: Direction): void {
        this._modules.direction = this._hull.rotation + 90;
        const SPEED = this._maxSpeed * power;
        if(Math.abs(this.speed) < Math.abs(SPEED)) {
            this._modules.speed = this.speed + SPEED/18;
        }
        if(Math.abs(this.speed) > Math.abs(SPEED)) {
            this._modules.speed = SPEED;
        }
    }
    steer(power: Direction): void{
        this._modules.direction = this._hull.rotation + 90;
        const SPEED = this._maxSpeed * power;
        
        //Left track
        if(Math.abs(this._tracks.t0.speed) < Math.abs(SPEED)) {
            this._tracks.t0.speed += SPEED/18;
        }
        if(Math.abs(this._tracks.t0.speed) > Math.abs(SPEED)) {
            this._tracks.t0.speed = SPEED;
        }

        //Right track
        if(Math.abs(this._tracks.t1.speed) < Math.abs(SPEED)) {
            this._tracks.t1.speed -= SPEED/18;
        }
        if(Math.abs(this._tracks.t1.speed) > Math.abs(SPEED)) {
            this._tracks.t1.speed = -SPEED;
        }

        // //Towards mean - Left
        // this._tracks.t0.speed = Math.sign(power) * (this._tracks.t0.speed * 2 + Math.abs(this._tracks.t1.speed))/3;
        // //Towards mean - Right
        // this._tracks.t1.speed = Math.sign(-power) * (this._tracks.t1.speed * 2 + Math.abs(this._tracks.t0.speed))/3; 
        
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

    //Setters
    setName(N: string): void {
        this._name = N;
    }
}


enum Direction{
    Forwards = 1,
    Backwards = -.7,
    Left = -1,
    Right = 1
}