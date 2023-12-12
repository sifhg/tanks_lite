"use strict";
class Tank {
    static DISTANCE_SCALAR = 20;
    _name;
    _hull;
    constructor(x, y, width = 2.908, length = 6.35, name = "Cromwell") {
        this._hull = new Sprite(x, y, width * Tank.DISTANCE_SCALAR, length * Tank.DISTANCE_SCALAR, "d");
        this._name = name;
    }
    get name() {
        return this._name;
    }
    setName(N) {
        this._name = N;
    }
}
