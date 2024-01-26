"use strict";
class Tank {
    static DISTANCE_SCALAR = 15.75;
    static SPEED_SCALAR = 4.1 / Tank.DISTANCE_SCALAR;
    static TANKS = [];
    //Specifications
    _damage;
    _mass;
    _maxSpeed;
    _name;
    _dispersion;
    //p5play members
    _modules;
    _turretAssembly;
    _gun;
    _hull;
    _turret;
    _tracks;
    _joints;
    constructor(group, x, y, width = 2.908, length = 6.35, mass = 27, maxSpeed = 17.78, barrelLength = 2.82, shellMass = 2.72, name = "Cromwell", wheelWidth = 0.394) {
        //Specifications
        this._damage = shellMass;
        this._mass = mass * Tank.SPEED_SCALAR; // 27[tons]
        this._name = name;
        this._dispersion = atan(shellMass / barrelLength) / Tank.DISTANCE_SCALAR;
        this._maxSpeed = maxSpeed * Tank.SPEED_SCALAR; // 17.78 [m/s]
        //p5play members
        this._modules = new group.Group();
        this._turretAssembly = new this._modules.Group();
        this._hull = new this._modules.Sprite(x, y, width * Tank.DISTANCE_SCALAR, length * Tank.DISTANCE_SCALAR, "d");
        this._tracks = {
            t0: new this._modules.Sprite(x + this._hull.halfWidth + wheelWidth * Tank.DISTANCE_SCALAR / 2, y, wheelWidth * Tank.DISTANCE_SCALAR, length * Tank.DISTANCE_SCALAR, "d"),
            t1: new this._modules.Sprite(x - this._hull.halfWidth - wheelWidth * Tank.DISTANCE_SCALAR / 2, y, wheelWidth * Tank.DISTANCE_SCALAR, length * Tank.DISTANCE_SCALAR, "d")
        };
        this._turret = new this._turretAssembly.Sprite(x, y + this._hull.halfHeight - this._hull.height / 3, this._hull.width);
        let calibre = Math.sqrt(shellMass / PI) * 0.0306 * 2;
        this._gun = new this._turretAssembly.Sprite(this._turret.x, this._turret.y + (barrelLength * Tank.DISTANCE_SCALAR / 2) + this._hull.halfWidth * 2 / 3, (calibre + 0.08) * Tank.DISTANCE_SCALAR, barrelLength * Tank.DISTANCE_SCALAR, 'none');
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
        this._hull.mass = this._mass * Tank.DISTANCE_SCALAR * .6;
        this._tracks.t0.mass = this._mass * Tank.DISTANCE_SCALAR * .2;
        this._tracks.t1.mass = this._mass * Tank.DISTANCE_SCALAR * .2;
        Tank.TANKS.push(this);
    }
    //Controls
    drive(power) {
        this._hull.bearing = this._hull.rotation + (90 * Math.sign(power));
        const SPEED = this._maxSpeed * Math.abs(power);
        if (Math.abs(this.speed) < this._maxSpeed) {
            this._hull.applyForce(SPEED);
        }
    }
    steer(power) {
        this._tracks.t0.bearing = this._hull.rotation + (90 * Math.sign(power));
        this._tracks.t1.bearing = this._hull.rotation - (90 * Math.sign(power));
        if (cos(this.motionDirection - this.direction) * this.speed < -world.velocityThreshold) {
            const TEMP = this._tracks.t0.bearing;
            this._tracks.t0.bearing = this._tracks.t1.bearing;
            this._tracks.t1.bearing = TEMP;
        }
        const SPEED = this._maxSpeed * Math.abs(power);
        //Left track
        if (Math.abs(this._tracks.t0.speed) < this._maxSpeed) {
            this._tracks.t0.applyForce(SPEED);
        }
        //Right track
        if (Math.abs(this._tracks.t1.speed) < this._maxSpeed) {
            this._tracks.t1.applyForce(SPEED);
        }
    }
    applyForce2Tracks(direction, strength) {
        this._tracks.t0.bearing = direction;
        this._tracks.t1.bearing = direction;
        this._tracks.t0.applyForce(strength / 2);
        this._tracks.t1.applyForce(strength / 2);
    }
    turnTurret(power) {
        if (typeof power == 'object') {
            power = this.decideTurretTurningDirection(power.x, power.y);
        }
        const SPEED_AMPLITUDE = power * Tank.SPEED_SCALAR * this._maxSpeed / this._mass;
        this._turretAssembly.rotationSpeed = SPEED_AMPLITUDE + this._hull.rotationSpeed;
        return power;
    }
    breakTurret() {
        this._turret.rotationSpeed = 0;
        this._turret.rotateTo(this._turret.rotation);
    }
    //Setters
    setName(N) {
        this._name = N;
    }
    //Getters
    get name() {
        return this._name;
    }
    get velocity() {
        return {
            x: this._hull.velocity.x,
            y: this._hull.velocity.y
        };
    }
    get speed() {
        return dist(0, 0, this._hull.velocity.x, this._hull.velocity.y);
    }
    get trackSpeed() {
        return {
            s0: dist(0, 0, this._tracks.t0.velocity.x, this._tracks.t0.velocity.y),
            s1: dist(0, 0, this._tracks.t1.velocity.x, this._tracks.t1.velocity.y),
        };
    }
    get maxSpeed() {
        return this._maxSpeed;
    }
    get direction() {
        return this._hull.rotation + 90;
    }
    get dispersion() {
        return this._dispersion;
    }
    get motionDirection() {
        return atan2(cromwell.velocity.y, cromwell.velocity.x);
    }
    get turretDirection() {
        let rotation = this._turret.rotation + 90;
        while (rotation < 0) {
            rotation += 360;
        }
        return rotation % 360;
    }
    //Helpers
    getAngle2Turret(xa, y) {
        if (y == undefined) {
            //If only an angle is provided
            let rotation = this._turret.rotation - xa;
            // Normalize the angle to be between -180 and 180 degrees
            while (rotation < -180) {
                rotation += 360;
            }
            return rotation % 360;
        }
        const DX = xa - this._turret.x;
        const DY = y - this._turret.y;
        let rotation = -atan2(DX, DY) - this._turret.rotation;
        // Normalize the angle to be between -180 and 180 degrees
        while (rotation < -180) {
            rotation += 360;
        }
        return rotation % 360;
    }
    getPerpendicularDistance2Turret(x, y) {
        const DISTANCE = dist(x, y, this._turret.x, this._turret.y);
        const ANGLE = this.getAngle2Turret(x, y);
        const PERPENDICULAR_DISTANCE = sin(ANGLE) * DISTANCE;
        return PERPENDICULAR_DISTANCE;
    }
    decideTurretTurningDirection(x, y, threshold = this.dispersion * 2 / 3) {
        if (threshold < 0) {
            throw new Error("The input threshold of decideTurretTurningDirection cannot be a negative number");
        }
        if (this._turret.angleToFace(x, y, -90) >= threshold / 2) {
            return Direction.Right;
        }
        if (this._turret.angleToFace(x, y, -90) <= -threshold / 2) {
            return Direction.Left;
        }
        //Handles cases where the point is behind the turret
        if (cos(this.getAngle2Turret(x, y)) < 0) {
            return this.decideTurretTurningDirection(x, y, 0);
        }
        return Direction.NONE;
    }
}
class Barrier {
    static BARRIERS = [];
    body;
    constructor(x, y, arg3, arg4) {
        if ([...arguments].length == 3) {
            this.body = new Sprite(x, y, arg3);
        }
        else {
            this.body = new Sprite(x, y, arg3, arg4);
        }
        this.body.collider = "static";
        this.body.colour = color(0);
        Barrier.BARRIERS.push(this);
    }
}
var Direction;
(function (Direction) {
    Direction[Direction["Forwards"] = 300] = "Forwards";
    Direction[Direction["Backwards"] = -150] = "Backwards";
    Direction[Direction["Left"] = -8] = "Left";
    Direction[Direction["Right"] = 8] = "Right";
    Direction[Direction["NONE"] = 0] = "NONE";
})(Direction || (Direction = {}));
p5.prototype.registerMethod('pre', function applySideDragForce() {
    for (const TANK of Tank.TANKS) {
        const FORCE_DIRECTION = TANK.motionDirection - 180;
        const FORCE_MAGNITUDE = Math.abs(sin(TANK.motionDirection - TANK.direction)) * TANK.speed * 5000;
        TANK.applyForce2Tracks(FORCE_DIRECTION, FORCE_MAGNITUDE);
    }
});
