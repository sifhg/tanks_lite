import p5 from 'p5';

class p5Tanks extends p5 {
    static DISTANCE_SCALAR = 15.75;
    static SPEED_SCALAR = 4.1 / p5Tanks.DISTANCE_SCALAR;
    static TANKS: any[] = [];

    static Ingrid = class {
        static A = p5Tanks.DISTANCE_SCALAR;
        _theName: string;
        constructor(name: string) {
            let inputs: any[] = [...arguments];
            if(inputs.length > 1) {
                console.error(`There were ${inputs.length} in the Ingrid constructer, and it can only take 1`);
                for(const ARG in inputs) {
                    console.error(`Arg: ${ARG} of type ${typeof ARG}`);
                }
                throw new Error(`Program times out.`)
            }
            this._theName = name;
        }
        toString(): string {
            return `A = ${p5Tanks.DISTANCE_SCALAR}: Name = ${this.name}`;
        }
        get name(): string {
            return this._theName;
        }
    }

    public Tank = class{
        //Instace mode
        p: p5|p5Tanks|null;

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
        constructor(instance: p5|p5Tanks, group: Group, x: number, y: number,
            width?: number, length?: number,
            mass?: number, maxSpeed?: number,
            barrelLength?: number , shellMass?: number,
            name?: string, wheelWidth?: number);
        constructor(group: Group, x: number, y: number,
                    width?: number, length?: number,
                    mass?: number, maxSpeed?: number ,
                    barrelLength?: number, shellMass?: number,
                    name?: string, wheelWidth?: number);
        constructor(
            arg0: p5 | p5Tanks | Group,
            arg1: Group | number,
            arg2: number,
            arg3?: number,
            arg4?: number,
            arg5?: number,
            arg6?: number,
            arg7?: number,
            arg8?: number,
            arg9?: number | string,
            arg10?: number | string,
            arg11?: number
            ){
            const args = [...arguments];
            if(args[0].constructer.name == 'p5' || args[0].constructer.name == 'p5Tanks'){
                this.p = args[0];
                args.shift();
            }else{
                this.p = null;
            };
            if(args[0].constructor.name == Group.name) {
                this._modules = new args[0].Group();
                args.shift();
            }else {
                console.error("First arguments of new Tank. Must be (group: Group...) or (instance: p5|p5Tanks, group: Group, ...)");
                throw new Error(`Your input were (${arg0}: ${arg0.constructor.name}, ${arg1}: ${arg1.constructor.name}, ...)`);
            };

            const parameterInitializers: object = {
                width: 2.908,
                length: 6.35,
                mass: 27,
                maxSpeed:17.78,
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
            for(let i = 0; i < args.length && i < 8; i++) {
                if(typeof parameterKeys[i] == 'string'){
                    const KEY: string = parameterKeys[i];
                    parameterInitializers[KEY] = args[i];
                }
            }

            //Specifications
            this._damage = shellMass;
            this._mass = mass * p5Tanks.SPEED_SCALAR; // 27[tons]
            this._name = name;
            this._dispersion = p5.prototype.atan(shellMass / barrelLength) / p5Tanks.DISTANCE_SCALAR;
            this._maxSpeed = maxSpeed * p5Tanks.SPEED_SCALAR; // 17.78 [m/s]
    
            //p5play members
            this._modules = new group.Group();
            this._turretAssembly = new this._modules.Group();
    
            this._hull = new this._modules.Sprite(x, y, width * p5Tanks.DISTANCE_SCALAR, length * p5Tanks.DISTANCE_SCALAR, "d");
            this._tracks = {
                t0: new this._modules.Sprite(x + this._hull.halfWidth + wheelWidth*p5Tanks.DISTANCE_SCALAR/2, y, wheelWidth * p5Tanks.DISTANCE_SCALAR, length * p5Tanks.DISTANCE_SCALAR, "d"),
                t1: new this._modules.Sprite(x - this._hull.halfWidth - wheelWidth*p5Tanks.DISTANCE_SCALAR/2, y, wheelWidth * p5Tanks.DISTANCE_SCALAR, length * p5Tanks.DISTANCE_SCALAR, "d")
            }
            this._turret = new this._turretAssembly.Sprite(x, y + this._hull.halfHeight - this._hull.height/3, this._hull.width);
            let calibre = Math.sqrt(shellMass/Math.PI) * 0.0306 * 2;
            this._gun = new this._turretAssembly.Sprite(this._turret.x, this._turret.y + (barrelLength * p5Tanks.DISTANCE_SCALAR / 2) + this._hull.halfWidth*2/3,
                                                        (calibre + 0.08) * p5Tanks.DISTANCE_SCALAR, barrelLength * p5Tanks.DISTANCE_SCALAR, 'none');
    
            this._joints = {
                jr: new GlueJoint(this._hull, this._tracks.t0),
                jl: new GlueJoint(this._hull, this._tracks.t1),
                turretAxle: new WheelJoint(this._hull, this._turret),
                mantlet: new Joint(this._turret, this._gun)
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
            if(Math.abs(this.speed) < this._maxSpeed) {
                this._hull.applyForce(SPEED)
            }
        }
        steer(power: Tank.Direction): void{
            this._tracks.t0.bearing = this._hull.rotation + (90 * Math.sign(power));
            this._tracks.t1.bearing = this._hull.rotation - (90 * Math.sign(power));
    
            if(Math.cos(this.motionDirection - this.direction) * this.speed < -world.velocityThreshold) {
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
        turnTurret(power: Tank.Direction|number|{x: number, y: number}): Tank.Direction {
            if(typeof power == 'object') {
                power = this.decideTurretTurningDirection(power.x, power.y);
            }
            if(typeof power != 'number') {
                throw new Error(`power imput of Tank.turnTurret() is '${typeof power}'. Input must be Tank.Direction, number, or {x: number, y: number}`);
            }
            const SPEED_AMPLITUDE: number = power * p5Tanks.SPEED_SCALAR * this._maxSpeed / this._mass;
            this._turretAssembly.rotationSpeed = SPEED_AMPLITUDE + this._hull.rotationSpeed;
            return power;
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
            return p5.prototype.dist(0, 0 , this._hull.velocity.x, this._hull.velocity.y);
        }
        get trackSpeed(): {s0: number, s1: number} {
            return {
                s0: p5.prototype.dist(0, 0 , this._tracks.t0.velocity.x, this._tracks.t0.velocity.y),
                s1: p5.prototype.dist(0, 0 , this._tracks.t1.velocity.x, this._tracks.t1.velocity.y),
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
            return p5.prototype.atan2(this.velocity.y, this.velocity.x);
        }
        get turretDirection(): number {
            let rotation = this._turret.rotation + 90;
            while(rotation < 0) {
                rotation += 360;
            }
            return rotation % 360;
        }
        toString() {
            return `Name: ${this._name}`;
        }
    
        //Helpers
        getAngle2Turret(xa: number, y?: number): number {
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
            let rotation = -p5.prototype.atan2(DX, DY) - this._turret.rotation;
    
            // Normalize the angle to be between -180 and 180 degrees
            while(rotation < -180) {
                rotation += 360;
            }
            return rotation % 360;
        }
        getPerpendicularDistance2Turret(x: number, y: number): number {
            const DISTANCE = p5.prototype.dist(x, y, this._turret.x, this._turret.y);
            const ANGLE = this.getAngle2Turret(x, y);
            const PERPENDICULAR_DISTANCE = p5.prototype.sin(ANGLE) * DISTANCE;
            return PERPENDICULAR_DISTANCE;
        }
        decideTurretTurningDirection(x: number, y: number, threshold: number = this.dispersion * 2/3): Tank.Direction {
            if(threshold < 0) {
                throw new Error("The input threshold of decideTurretTurningDirection cannot be a negative number");
            }
    
            if(this._turret.angleToFace(x, y, -90) >= threshold/2) {
                return Tank.Direction.Right;
            }
            if(this._turret.angleToFace(x, y, -90) <= -threshold/2) {
                return Tank.Direction.Left;
            }
    
            //Handles cases where the point is behind the turret
            if(p5.prototype.cos(this.getAngle2Turret(x, y)) < 0) {
                return this.decideTurretTurningDirection(x, y, 0);
            }
            return Tank.Direction.None;
        }
    }
}

export default p5Tanks;


// export class Tank {
//     static DISTANCE_SCALAR = 15.75;
//     static SPEED_SCALAR = 4.1 / Tank.DISTANCE_SCALAR;
//     static TANKS: Tank[] = [];

//     //Specifications
//     private _damage: number;
//     private _mass: number;
//     private _maxSpeed: number;
//     private _name: string;
//     private _dispersion: number;

//     //p5play members
//     private _modules: Group;
//     private _turretAssembly: Group;
//     private _gun: Sprite;
//     private _hull: Sprite;
//     private _turret: Sprite;
//     private _tracks: {
//         t0: Sprite,
//         t1: Sprite
//     }
//     private _joints: {
//         jr: GlueJoint,
//         jl: GlueJoint,
//         turretAxle: WheelJoint,
//         mantlet: Joint
//     }

//     constructor(group: Group, x: number, y: number,
//                 width: number = 2.908, length: number = 6.35,
//                 mass: number = 27, maxSpeed:number = 17.78,
//                 barrelLength: number = 2.82, shellMass = 2.72,
//                 name: string = "Cromwell", wheelWidth: number = 0.394) {

//         //Specifications
//         this._damage = shellMass;
//         this._mass = mass * Tank.SPEED_SCALAR; // 27[tons]
//         this._name = name;
//         this._dispersion = p5.prototype.atan(shellMass / barrelLength) / Tank.DISTANCE_SCALAR;
//         this._maxSpeed = maxSpeed * Tank.SPEED_SCALAR; // 17.78 [m/s]

//         //p5play members
//         this._modules = new group.Group();
//         this._turretAssembly = new this._modules.Group();

//         this._hull = new this._modules.Sprite(x, y, width * Tank.DISTANCE_SCALAR, length * Tank.DISTANCE_SCALAR, "d");
//         this._tracks = {
//             t0: new this._modules.Sprite(x + this._hull.halfWidth + wheelWidth*Tank.DISTANCE_SCALAR/2, y, wheelWidth * Tank.DISTANCE_SCALAR, length * Tank.DISTANCE_SCALAR, "d"),
//             t1: new this._modules.Sprite(x - this._hull.halfWidth - wheelWidth*Tank.DISTANCE_SCALAR/2, y, wheelWidth * Tank.DISTANCE_SCALAR, length * Tank.DISTANCE_SCALAR, "d")
//         }
//         this._turret = new this._turretAssembly.Sprite(x, y + this._hull.halfHeight - this._hull.height/3, this._hull.width);
//         let calibre = Math.sqrt(shellMass/Math.PI) * 0.0306 * 2;
//         this._gun = new this._turretAssembly.Sprite(this._turret.x, this._turret.y + (barrelLength * Tank.DISTANCE_SCALAR / 2) + this._hull.halfWidth*2/3,
//                                                     (calibre + 0.08) * Tank.DISTANCE_SCALAR, barrelLength * Tank.DISTANCE_SCALAR, 'none');

//         this._joints = {
//             jr: new GlueJoint(this._hull, this._tracks.t0),
//             jl: new GlueJoint(this._hull, this._tracks.t1),
//             turretAxle: new WheelJoint(this._hull, this._turret),
//             mantlet: new Joint(this._turret, this._gun)
//         };
//         //this._turret.addCollider(0, (barrelLength * Tank.DISTANCE_SCALAR / 2) + this._hull.halfWidth*2/3, (calibre + 0.08) * Tank.DISTANCE_SCALAR, barrelLength * Tank.DISTANCE_SCALAR);
//         this._turret.overlaps(this._tracks.t0);
//         this._turret.overlaps(this._tracks.t1);
        
//         this._hull.drag = 5;
//         this._hull.rotationDrag = 15;
//         this._hull.mass = this._mass * Tank.DISTANCE_SCALAR * .6;
//         this._tracks.t0.mass = this._mass * Tank.DISTANCE_SCALAR * .2;
//         this._tracks.t1.mass = this._mass * Tank.DISTANCE_SCALAR * .2;

//         Tank.TANKS.push(this);
//     }


//     //Controls
//     drive(power: Tank.Direction): void {
//         this._hull.bearing = this._hull.rotation + (90 * Math.sign(power));
//         const SPEED = this._maxSpeed * Math.abs(power);
//         if(Math.abs(this.speed) < this._maxSpeed) {
//             this._hull.applyForce(SPEED)
//         }
//     }
//     steer(power: Tank.Direction): void{
//         this._tracks.t0.bearing = this._hull.rotation + (90 * Math.sign(power));
//         this._tracks.t1.bearing = this._hull.rotation - (90 * Math.sign(power));

//         if(Math.cos(this.motionDirection - this.direction) * this.speed < -world.velocityThreshold) {
//             const TEMP = this._tracks.t0.bearing;
//             this._tracks.t0.bearing = this._tracks.t1.bearing;
//             this._tracks.t1.bearing = TEMP;
//         }

//         const SPEED = this._maxSpeed * Math.abs(power);

//         //Left track
//         if(Math.abs(this._tracks.t0.speed) < this._maxSpeed) {
//             this._tracks.t0.applyForce(SPEED);
//         }

//         //Right track
//         if(Math.abs(this._tracks.t1.speed) < this._maxSpeed) {
//             this._tracks.t1.applyForce(SPEED);
//         }
//     }
//     applyForce2Tracks(direction: number, strength: number) {
//         this._tracks.t0.bearing = direction;
//         this._tracks.t1.bearing = direction;
//         this._tracks.t0.applyForce(strength/2);
//         this._tracks.t1.applyForce(strength/2);
//     }
//     turnTurret(power: Tank.Direction|number|{x: number, y: number}): Tank.Direction {
//         if(typeof power == 'object') {
//             power = this.decideTurretTurningDirection(power.x, power.y);
//         }
//         if(typeof power != 'number') {
//             throw new Error(`power imput of Tank.turnTurret() is '${typeof power}'. Input must be Tank.Direction, number, or {x: number, y: number}`);
//         }
//         const SPEED_AMPLITUDE: number = power * Tank.SPEED_SCALAR * this._maxSpeed / this._mass;
//         this._turretAssembly.rotationSpeed = SPEED_AMPLITUDE + this._hull.rotationSpeed;
//         return power;
//     }

//     //Setters
//     setName(N: string): void {
//         this._name = N;
//     }

//     //Getters
//     get name(): string {
//         return this._name;
//     }
//     get velocity(): {x: number, y: number} {
//         return {
//             x: this._hull.velocity.x,
//             y: this._hull.velocity.y
//         }
//     }
//     get speed(): number {
//         return p5.prototype.dist(0, 0 , this._hull.velocity.x, this._hull.velocity.y);
//     }
//     get trackSpeed(): {s0: number, s1: number} {
//         return {
//             s0: p5.prototype.dist(0, 0 , this._tracks.t0.velocity.x, this._tracks.t0.velocity.y),
//             s1: p5.prototype.dist(0, 0 , this._tracks.t1.velocity.x, this._tracks.t1.velocity.y),
//         }
//     }
//     get maxSpeed(): number {
//         return this._maxSpeed;
//     }
//     get direction(): number {
//         return this._hull.rotation + 90;
//     }
//     get dispersion(): number {
//         return this._dispersion;
//     }
//     get motionDirection(): number {
//         return p5.prototype.atan2(this.velocity.y, this.velocity.x);
//     }
//     get turretDirection(): number {
//         let rotation = this._turret.rotation + 90;
//         while(rotation < 0) {
//             rotation += 360;
//         }
//         return rotation % 360;
//     }

//     //Helpers
//     protected getAngle2Turret(xa: number, y?: number): number {
//         if(y == undefined) {
//             //If only an angle is provided
//             let rotation = this._turret.rotation - xa

//             // Normalize the angle to be between -180 and 180 degrees
//             while(rotation < -180) {
//                 rotation += 360;
//             }
//             return rotation % 360;
//         }
//         const DX = xa - this._turret.x;
//         const DY = y - this._turret.y;
//         let rotation = -p5.prototype.atan2(DX, DY) - this._turret.rotation;

//         // Normalize the angle to be between -180 and 180 degrees
//         while(rotation < -180) {
//             rotation += 360;
//         }
//         return rotation % 360;
//     }
//     protected getPerpendicularDistance2Turret(x: number, y: number): number {
//         const DISTANCE = p5.prototype.dist(x, y, this._turret.x, this._turret.y);
//         const ANGLE = this.getAngle2Turret(x, y);
//         const PERPENDICULAR_DISTANCE = p5.prototype.sin(ANGLE) * DISTANCE;
//         return PERPENDICULAR_DISTANCE;
//     }
//     decideTurretTurningDirection(x: number, y: number, threshold: number = this.dispersion * 2/3): Tank.Direction {
//         if(threshold < 0) {
//             throw new Error("The input threshold of decideTurretTurningDirection cannot be a negative number");
//         }

//         if(this._turret.angleToFace(x, y, -90) >= threshold/2) {
//             return Tank.Direction.Right;
//         }
//         if(this._turret.angleToFace(x, y, -90) <= -threshold/2) {
//             return Tank.Direction.Left;
//         }

//         //Handles cases where the point is behind the turret
//         if(p5.prototype.cos(this.getAngle2Turret(x, y)) < 0) {
//             return this.decideTurretTurningDirection(x, y, 0);
//         }
//         return Tank.Direction.None;
//     }
// }



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
        this.body.colour = p5.prototype.color(0);

        Barrier.BARRIERS.push(this);
    }
}



//@ts-expect-error
p5.prototype.registerMethod('pre', function applySideDragForce() {
    for(const TANK of p5Tanks.TANKS) {
        const FORCE_DIRECTION: number = TANK.motionDirection - 180;
        const FORCE_MAGNITUDE: number = Math.abs(p5.prototype.sin(TANK.motionDirection - TANK.direction)) * TANK.speed * 5000;
        TANK.applyForce2Tracks(FORCE_DIRECTION, FORCE_MAGNITUDE);
    }
})