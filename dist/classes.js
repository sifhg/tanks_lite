"use strict";
class Tank {
    static DISTANCE_SCALAR = 15.75;
    static SPEED_SCALAR = 4.1 / Tank.DISTANCE_SCALAR;
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
        this._hull.mass = this._mass * Tank.DISTANCE_SCALAR * .5;
        this._tracks.t0.mass = this._mass * Tank.DISTANCE_SCALAR * .1;
        this._tracks.t1.mass = this._mass * Tank.DISTANCE_SCALAR * .1;
        //this._turret.mass = this._mass * Tank.DISTANCE_SCALAR * .3;
        this._maxSpeed = 17.78 * Tank.SPEED_SCALAR; // 17.78 [m/s]
    }
    //Controls
    forwards() {
        this._modules.direction = this._hull.rotation + 90;
        if (this.speed < this._maxSpeed) {
            this._modules.speed = this.speed + this._maxSpeed / 30;
        }
        else {
            this._modules.speed = this._maxSpeed;
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
    //Setters
    setName(N) {
        this._name = N;
    }
}
