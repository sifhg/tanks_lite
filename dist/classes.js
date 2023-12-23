"use strict";
class Tank {
    static DISTANCE_SCALAR = 15.75;
    static SPEED_SCALAR = 4.1 / Tank.DISTANCE_SCALAR;
    static TANKS = [];
    _mass;
    _maxSpeed;
    _name;
    _modules;
    _hull;
    _tracks;
    _joints;
    constructor(group, x, y, width = 2.908, length = 6.35, name = "Cromwell", wheelWidth = 0.394) {
        this._modules = new group.Group();
        this._hull = new this._modules.Sprite(x, y, width * Tank.DISTANCE_SCALAR, length * Tank.DISTANCE_SCALAR, "d");
        this._tracks = {
            t0: new this._modules.Sprite(x + this._hull.halfWidth + wheelWidth * Tank.DISTANCE_SCALAR / 2, y, wheelWidth * Tank.DISTANCE_SCALAR, length * Tank.DISTANCE_SCALAR, "d"),
            t1: new this._modules.Sprite(x - this._hull.halfWidth - wheelWidth * Tank.DISTANCE_SCALAR / 2, y, wheelWidth * Tank.DISTANCE_SCALAR, length * Tank.DISTANCE_SCALAR, "d")
        };
        this._joints = {
            jr: new GlueJoint(this._hull, this._tracks.t0),
            jl: new GlueJoint(this._hull, this._tracks.t1)
        };
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
        if (cos(this.motionDirection - this.direction) * this.speed / this._maxSpeed < -world.velocityThreshold) {
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
    get motionDirection() {
        return atan2(cromwell.velocity.y, cromwell.velocity.x);
    }
    //Setters
    setName(N) {
        this._name = N;
    }
}
var Direction;
(function (Direction) {
    Direction[Direction["Forwards"] = 300] = "Forwards";
    Direction[Direction["Backwards"] = -30] = "Backwards";
    Direction[Direction["Left"] = -7] = "Left";
    Direction[Direction["Right"] = 7] = "Right";
})(Direction || (Direction = {}));
p5.prototype.registerMethod('pre', function applySideDragForce() {
    for (const TANK of Tank.TANKS) {
        console.log(TANK.name);
    }
});
