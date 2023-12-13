"use strict";
class Tank {
    static DISTANCE_SCALAR = 20;
    _name;
    _aGroup;
    _hull;
    _tracks;
    _joints;
    constructor(group, x, y, width = 2.908, length = 6.35, name = "Cromwell", wheelWidth = 0.394) {
        this._aGroup = new Group();
        this._hull = new group.Sprite(x, y, width * Tank.DISTANCE_SCALAR, length * Tank.DISTANCE_SCALAR, "d");
        this._tracks = {
            t0: new group.Sprite(x + this._hull.halfWidth + wheelWidth * Tank.DISTANCE_SCALAR / 2, y, wheelWidth * Tank.DISTANCE_SCALAR, length * Tank.DISTANCE_SCALAR, "d"),
            t1: new group.Sprite(x - this._hull.halfWidth - wheelWidth * Tank.DISTANCE_SCALAR / 2, y, wheelWidth * Tank.DISTANCE_SCALAR, length * Tank.DISTANCE_SCALAR, "d")
        };
        this._joints = {
            jr: new GlueJoint(this._hull, this._tracks.t0),
            jl: new GlueJoint(this._hull, this._tracks.t1)
        };
        this._name = name;
    }
    get name() {
        return this._name;
    }
    setName(N) {
        this._name = N;
    }
}
