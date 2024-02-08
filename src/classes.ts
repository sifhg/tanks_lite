import p5 from 'p5';

class p5Tanks extends p5 {
    declare mouse: {x: number, y: number};
    static DISTANCE_SCALAR = 15.75;
    static SPEED_SCALAR = 4.1 / p5Tanks.DISTANCE_SCALAR;
    static TANKS: any[] = [];

    public Tank = class {
        //Instace mode
        p: p5 | p5Tanks;

        //Specifications
        _damage: number;
        _mass: number;
        _maxSpeed: number;
        _name: string;
        _dispersion: number;

        //p5play members
        _modules: Group;
        _turretAssembly: Group;
        _gun: Sprite;
        _hull: Sprite;
        _turret: Sprite;
        _tracks: {
            t0: Sprite,
            t1: Sprite
        }
        _joints: {
            jr: GlueJoint,
            jl: GlueJoint,
            turretAxle: WheelJoint,
            mantlet: Joint
        }
        constructor(instance: p5 | p5Tanks, group: Group, x: number, y: number,
            width?: number, length?: number,
            mass?: number, maxSpeed?: number,
            barrelLength?: number, shellMass?: number,
            name?: string, wheelWidth?: number);
        constructor(
            arg0: p5 | p5Tanks,
            arg1: Group,
            arg2: number,
            arg3?: number,
            arg4?: number,
            arg5?: number,
            arg6?: number,
            arg7?: number,
            arg8?: number,
            arg9?: number,
            arg10?: number | string,
            arg11?: number
        ) {
            const args = [...arguments];

            this.p = args[0] as p5 | p5Tanks;
            const GROUP: Group = args[1];
            args.shift();
            args.shift();
            
            this._modules = new GROUP.Group();

            const X = args[0];
            const Y = args[0];
            args.shift();
            args.shift();

            interface Initializers {
                [key: string]: any;
                width: number,
                length: number,
                mass: number,
                maxSpeed: number,
                barrelLength: number,
                shellMass: number,
                name: string,
                wheelWidth: number
            }
            const parameterInitializers: Initializers = {
                width: 2.908,
                length: 6.35,
                mass: 27,
                maxSpeed: 17.78,
                barrelLength: 2.82,
                shellMass: 2.72,
                name: "Cromwell",
                wheelWidth: 0.394
            };

            const parameterKeys: string[] = [
                "width",
                "length",
                "mass",
                "maxSpeed",
                "barrelLength",
                "shellMass",
                "name",
                "wheelWidth",
            ];
            if (args.length > parameterKeys.length) {
                throw new Error(`Too many arguments for p5Tanks.Tank constructor.\nNumber of arguments: ${args.length}\nArgument structure: (${args.map(item => item.constructor.name)})`);
            }
            for (let i = 0; i < args.length; i++) {
                const KEY: string = parameterKeys[i] as string;
                parameterInitializers[KEY] = args[i];
            }

            //Specifications
            this._damage = parameterInitializers.shellMass;
            this._mass = parameterInitializers.mass * p5Tanks.SPEED_SCALAR; // 27[tons]
            this._name = parameterInitializers.name;
            this._dispersion = p5Tanks.prototype.atan(parameterInitializers.shellMass / parameterInitializers.barrelLength) / p5Tanks.DISTANCE_SCALAR;
            this._maxSpeed = parameterInitializers.maxSpeed * p5Tanks.SPEED_SCALAR; // 17.78 [m/s]

            //p5play members
            this._turretAssembly = new this._modules.Group();

            this._hull = new this._modules.Sprite(X, Y, parameterInitializers.width * p5Tanks.DISTANCE_SCALAR, parameterInitializers.length * p5Tanks.DISTANCE_SCALAR, "d");
            this._tracks = {
                t0: new this._modules.Sprite(X, Y, parameterInitializers.wheelWidth * p5Tanks.DISTANCE_SCALAR, parameterInitializers.length * p5Tanks.DISTANCE_SCALAR, "d"),
                t1: new this._modules.Sprite(X , Y, parameterInitializers.wheelWidth * p5Tanks.DISTANCE_SCALAR, parameterInitializers.length * p5Tanks.DISTANCE_SCALAR, "d")
            }
            this._tracks.t0.offset.x = this._hull.halfWidth + parameterInitializers.wheelWidth * p5Tanks.DISTANCE_SCALAR / 2;
            this._tracks.t1.offset.x = -this._hull.halfWidth - parameterInitializers.wheelWidth * p5Tanks.DISTANCE_SCALAR / 2;
            this._turret = new this._turretAssembly.Sprite(X, Y + this._hull.halfHeight - this._hull.height / 3, this._hull.width);
            let calibre = Math.sqrt(parameterInitializers.shellMass / Math.PI) * 0.0306 * 2;
            this._gun = new this._turretAssembly.Sprite(this._turret.x, this._turret.y + (parameterInitializers.barrelLength * p5Tanks.DISTANCE_SCALAR / 2) + this._hull.halfWidth * 2 / 3,
                (calibre + 0.08) * p5Tanks.DISTANCE_SCALAR, parameterInitializers.barrelLength * p5Tanks.DISTANCE_SCALAR, 'none');

            this._joints = {
                jr: new this.p.GlueJoint(this._hull, this._tracks.t0),
                jl: new this.p.GlueJoint(this._hull, this._tracks.t1),
                turretAxle: new this.p.WheelJoint(this._hull, this._turret),
                mantlet: new this.p.Joint(this._turret, this._gun)
            };
            //this._turret.addCollider(0, (barrelLength * Tank.DISTANCE_SCALAR / 2) + this._hull.halfWidth*2/3, (calibre + 0.08) * Tank.DISTANCE_SCALAR, barrelLength * Tank.DISTANCE_SCALAR);
            this._turret.overlaps(this._tracks.t0);
            this._turret.overlaps(this._tracks.t1);

            this._hull.drag = 5;
            this._hull.rotationDrag = 15;
            this._hull.mass = this._mass * p5Tanks.DISTANCE_SCALAR * .6;
            this._tracks.t0.mass = this._mass * p5Tanks.DISTANCE_SCALAR * .2;
            this._tracks.t1.mass = this._mass * p5Tanks.DISTANCE_SCALAR * .2;

            p5Tanks.TANKS.push(this);
        }


        //Controls
        drive(power: Tank.Direction): void {
            this._hull.bearing = this._hull.rotation + (90 * Math.sign(power));
            const SPEED = this._maxSpeed * Math.abs(power);
            if (Math.abs(this.speed) < this._maxSpeed) {
                this._hull.applyForce(SPEED)
            }
        }
        steer(power: Tank.Direction): void {
            p5Tanks.prototype.angleMode(p5Tanks.prototype.DEGREES);

            if(this.speed > this.p.world.velocityThreshold
                && p5Tanks.prototype.cos(this.motionDirection-this.direction) < 0) {
                    this._tracks.t0.applyTorque(-power);
                    this._tracks.t1.applyTorque(-power);
                    return;
                }
            this._tracks.t0.applyTorque(power);
            this._tracks.t1.applyTorque(power);
        }
        applyForce2Tracks(direction: number, strength: number) {
            this._tracks.t0.bearing = direction;
            this._tracks.t1.bearing = direction;
            this._tracks.t0.applyForce(strength / 2);
            this._tracks.t1.applyForce(strength / 2);
        }
        turnTurret(power: Tank.Direction | number | { x: number, y: number }): Tank.Direction {
            if (typeof power == 'object') {
                power = this.decideTurretTurningDirection(power.x, power.y);
            }
            if (typeof power != 'number') {
                throw new Error(`power imput of Tank.turnTurret() is '${typeof power}'. Input must be Tank.Direction, number, or {x: number, y: number}`);
            }
            const SPEED_AMPLITUDE: number = power * p5Tanks.SPEED_SCALAR * this._maxSpeed / this._mass;
            this._turretAssembly.rotationSpeed = SPEED_AMPLITUDE + this._hull.rotationSpeed;
            return power;
        }

        //Setters
        set name(N: string) {
            this._name = N;
        }



        //Getters
        get name(): string {
            return this._name;
        }
        get reversing(): boolean {
            return false;
        }
        get velocity(): { x: number, y: number } {
            return {
                x: this._hull.velocity.x,
                y: this._hull.velocity.y
            }
        }
        get speed(): number {
            return p5Tanks.prototype.dist(0, 0, this._hull.velocity.x, this._hull.velocity.y);
        }
        get trackSpeed(): { s0: number, s1: number } {
            return {
                s0: p5Tanks.prototype.dist(0, 0, this._tracks.t0.velocity.x, this._tracks.t0.velocity.y),
                s1: p5Tanks.prototype.dist(0, 0, this._tracks.t1.velocity.x, this._tracks.t1.velocity.y),
            }
        }
        get maxSpeed(): number {
            return this._maxSpeed;
        }
        get direction(): number {
            return this.normalizeTo180(this._hull.rotation + 90);
        }
        get dispersion(): number {
            return this._dispersion;
        }
        get motionDirection(): number {
            p5Tanks.prototype.angleMode(p5Tanks.prototype.DEGREES);
            return this.normalizeTo180(p5Tanks.prototype.atan2(this.velocity.y, this.velocity.x));
        }
        get turretDirection(): number {
            let rotation = this._turret.rotation + 90;
            while (rotation < 0) {
                rotation += 360;
            }
            return rotation % 360;
        }
        toString() {
            return `Name: ${this._name}`;
        }

        //Helpers
        /**
         * Normalizes and angle (degrees) to be between -180 and 180.
         * @param A The angle.
         * @returns An corresponding angle (degrees) between -180 and 180.
         */
        normalizeTo180(A: number){
            let angle = A;
            while(angle < -180) {
                angle += 360;
            }
            while(angle > 180) {
                angle -= 360;
            }
            return angle;
        }
        getAngle2Turret(a: number): number;
        getAngle2Turret(x: number, y?: number): number;
        getAngle2Turret(arg0: number, arg1?: number): number {
            if (arg1 == undefined) {
                let a = arg0;
                //If only an angle is provided
                let rotation = this._turret.rotation - a;
                rotation = this.normalizeTo180(rotation);
                return this.normalizeTo180(rotation);
            }
            const DX = arg0 - this._turret.x;
            const DY = arg1 - this._turret.y;
            let rotation = -p5Tanks.prototype.atan2(DX, DY) - this._turret.rotation;

            // Normalize the angle to be between -180 and 180 degrees
            while (rotation < -180) {
                rotation += 360;
            }
            return rotation % 360;
        }
        getPerpendicularDistance2Turret(x: number, y: number): number {
            const DISTANCE = p5Tanks.prototype.dist(x, y, this._turret.x, this._turret.y);
            const ANGLE = this.getAngle2Turret(x, y);
            const PERPENDICULAR_DISTANCE = p5Tanks.prototype.sin(ANGLE) * DISTANCE;
            return PERPENDICULAR_DISTANCE;
        }
        decideTurretTurningDirection(x: number, y: number, threshold: number = this.dispersion * 2 / 3): Tank.Direction {
            p5Tanks.prototype.angleMode(p5Tanks.prototype.DEGREES);
            if (threshold < 0) {
                throw new Error("The input threshold of decideTurretTurningDirection cannot be a negative number");
            }

            if (this._turret.angleToFace(x, y, -90) >= threshold / 2) {
                return Tank.Direction.Right;
            }
            if (this._turret.angleToFace(x, y, -90) <= -threshold / 2) {
                return Tank.Direction.Left;
            }

            //Handles cases where the point is behind the turret
            if (p5Tanks.prototype.cos(this.getAngle2Turret(x, y)) < 0) {
                return this.decideTurretTurningDirection(x, y, 0);
            }
            return Tank.Direction.None;
        }
    }
}

export default p5Tanks;

export namespace Tank {
    export enum Direction{
        Forwards = 300,
        Backwards = -150,
        Left = -8,
        Right = 8,
        None = 0
    }
}

export class Barrier {
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
        this.body.colour = p5Tanks.prototype.color(0);

        Barrier.BARRIERS.push(this);
    }
}



//@ts-expect-error
p5Tanks.prototype.registerMethod('pre', function applySideDragForce() {
    for(const TANK of p5Tanks.TANKS) {
        const FORCE_DIRECTION: number = TANK.motionDirection - 180;
        const FORCE_MAGNITUDE: number = Math.abs(p5Tanks.prototype.sin(TANK.motionDirection - TANK.direction)) * TANK.speed * 5000;
        TANK.applyForce2Tracks(FORCE_DIRECTION, FORCE_MAGNITUDE);
    }
})