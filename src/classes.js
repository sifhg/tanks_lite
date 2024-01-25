var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var Tank = /** @class */ (function () {
    function Tank(x, y, width, length, mass, maxSpeed, barrelLength, shellMass, name, wheelWidth) {
        if (width === void 0) { width = 2.908; }
        if (length === void 0) { length = 6.35; }
        if (mass === void 0) { mass = 27; }
        if (maxSpeed === void 0) { maxSpeed = 17.78; }
        if (barrelLength === void 0) { barrelLength = 2.82; }
        if (shellMass === void 0) { shellMass = 2.72; }
        if (name === void 0) { name = "Cromwell"; }
        if (wheelWidth === void 0) { wheelWidth = 0.394; }
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
            t0: new this._modules.Sprite(x + this._hull.halfWidth + wheelWidth * Tank.DISTANCE_SCALAR / 2, y, wheelWidth * Tank.DISTANCE_SCALAR, length * Tank.DISTANCE_SCALAR, "d"),
            t1: new this._modules.Sprite(x - this._hull.halfWidth - wheelWidth * Tank.DISTANCE_SCALAR / 2, y, wheelWidth * Tank.DISTANCE_SCALAR, length * Tank.DISTANCE_SCALAR, "d")
        };
        this._turret = new this._modules.Sprite(x, y + this._hull.halfHeight - this._hull.height / 3, this._hull.width);
        var calibre = Math.sqrt(shellMass / PI) * 0.0306 * 2;
        this._joints = {
            jr: new GlueJoint(this._hull, this._tracks.t0),
            jl: new GlueJoint(this._hull, this._tracks.t1),
            turretAxle: new WheelJoint(this._hull, this._turret)
        };
        this._turret.addCollider(0, (barrelLength * Tank.DISTANCE_SCALAR / 2) + this._hull.halfWidth * 2 / 3, (calibre + 0.08) * Tank.DISTANCE_SCALAR, barrelLength * Tank.DISTANCE_SCALAR);
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
    Tank.prototype.drive = function (power) {
        this._hull.bearing = this._hull.rotation + (90 * Math.sign(power));
        var SPEED = this._maxSpeed * Math.abs(power);
        if (Math.abs(this.speed) < this._maxSpeed) {
            this._hull.applyForce(SPEED);
        }
    };
    Tank.prototype.steer = function (power) {
        this._tracks.t0.bearing = this._hull.rotation + (90 * Math.sign(power));
        this._tracks.t1.bearing = this._hull.rotation - (90 * Math.sign(power));
        if (cos(this.motionDirection - this.direction) * this.speed < -world.velocityThreshold) {
            var TEMP = this._tracks.t0.bearing;
            this._tracks.t0.bearing = this._tracks.t1.bearing;
            this._tracks.t1.bearing = TEMP;
        }
        var SPEED = this._maxSpeed * Math.abs(power);
        //Left track
        if (Math.abs(this._tracks.t0.speed) < this._maxSpeed) {
            this._tracks.t0.applyForce(SPEED);
        }
        //Right track
        if (Math.abs(this._tracks.t1.speed) < this._maxSpeed) {
            this._tracks.t1.applyForce(SPEED);
        }
    };
    Tank.prototype.applyForce2Tracks = function (direction, strength) {
        this._tracks.t0.bearing = direction;
        this._tracks.t1.bearing = direction;
        this._tracks.t0.applyForce(strength / 2);
        this._tracks.t1.applyForce(strength / 2);
    };
    Tank.prototype.turnTurret = function (power) {
        var SPEED_AMPLITUDE = Direction.Right * Tank.SPEED_SCALAR * this._maxSpeed / this._mass;
        if (typeof power == "number" || typeof power == "object") {
            this._turret.rotateTo(power, SPEED_AMPLITUDE, -90);
            this._turret.rotationSpeed += this._hull.rotationSpeed;
        }
    };
    Tank.prototype.breakTurret = function () {
        this._turret.rotationSpeed = 0;
        this._turret.rotateTo(this._turret.rotation);
    };
    //Setters
    Tank.prototype.setName = function (N) {
        this._name = N;
    };
    Object.defineProperty(Tank.prototype, "name", {
        //Getters
        get: function () {
            return this._name;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Tank.prototype, "velocity", {
        get: function () {
            return {
                x: this._hull.velocity.x,
                y: this._hull.velocity.y
            };
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Tank.prototype, "speed", {
        get: function () {
            return dist(0, 0, this._hull.velocity.x, this._hull.velocity.y);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Tank.prototype, "trackSpeed", {
        get: function () {
            return {
                s0: dist(0, 0, this._tracks.t0.velocity.x, this._tracks.t0.velocity.y),
                s1: dist(0, 0, this._tracks.t1.velocity.x, this._tracks.t1.velocity.y),
            };
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Tank.prototype, "maxSpeed", {
        get: function () {
            return this._maxSpeed;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Tank.prototype, "direction", {
        get: function () {
            return this._hull.rotation + 90;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Tank.prototype, "dispersion", {
        get: function () {
            return this._dispersion;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Tank.prototype, "motionDirection", {
        get: function () {
            return atan2(cromwell.velocity.y, cromwell.velocity.x);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Tank.prototype, "turretDirection", {
        get: function () {
            var rotation = this._turret.rotation + 90;
            while (rotation < 0) {
                rotation += 360;
            }
            return rotation % 360;
        },
        enumerable: false,
        configurable: true
    });
    //Helpers
    Tank.prototype.getAngle2Turret = function (xa, y) {
        if (y == undefined) {
            //If only an angle is provided
            var rotation_1 = this._turret.rotation - xa;
            // Normalize the angle to be between -180 and 180 degrees
            while (rotation_1 < -180) {
                rotation_1 += 360;
            }
            return rotation_1 % 360;
        }
        var DX = xa - this._turret.x;
        var DY = y - this._turret.y;
        var rotation = -atan2(DX, DY) - this._turret.rotation;
        // Normalize the angle to be between -180 and 180 degrees
        while (rotation < -180) {
            rotation += 360;
        }
        return rotation % 360;
    };
    Tank.prototype.getPerpendicularDistance2Turret = function (x, y) {
        var DISTANCE = dist(x, y, this._turret.x, this._turret.y);
        var ANGLE = this.getAngle2Turret(x, y);
        var PERPENDICULAR_DISTANCE = sin(ANGLE) * DISTANCE;
        return PERPENDICULAR_DISTANCE;
    };
    Tank.prototype.decideTurretTurningDirection = function (x, y, threshold) {
        if (threshold === void 0) { threshold = this.dispersion * 2 / 3; }
        if (threshold < 0) {
            throw new Error("The input threshold of decideTurretTurningDirection cannot be a negative number");
        }
        if (this._turret.angleToFace(x, y, -90) <= -threshold / 2) {
            return Direction.Right;
        }
        if (this._turret.angleToFace(x, y, -90) >= threshold / 2) {
            return Direction.Left;
        }
        //Handles cases where the point is behind the turret
        if (cos(this.getAngle2Turret(x, y)) < 0) {
            return this.decideTurretTurningDirection(x, y, 0);
        }
        return Direction.NONE;
    };
    Tank.DISTANCE_SCALAR = 15.75;
    Tank.SPEED_SCALAR = 4.1 / Tank.DISTANCE_SCALAR;
    Tank.TANKS = [];
    Tank.TANK_SPRITES = new Group();
    return Tank;
}());
var Barrier = /** @class */ (function () {
    function Barrier(x, y, arg3, arg4) {
        if (__spreadArray([], arguments, true).length == 3) {
            this.body = new Sprite(x, y, arg3);
        }
        else {
            this.body = new Sprite(x, y, arg3, arg4);
        }
        this.body.collider = "static";
        this.body.colour = color(0);
        Barrier.BARRIERS.push(this);
    }
    Barrier.BARRIERS = [];
    return Barrier;
}());
var Direction;
(function (Direction) {
    Direction[Direction["Forwards"] = 300] = "Forwards";
    Direction[Direction["Backwards"] = -150] = "Backwards";
    Direction[Direction["Left"] = -8] = "Left";
    Direction[Direction["Right"] = 8] = "Right";
    Direction[Direction["NONE"] = 0] = "NONE";
})(Direction || (Direction = {}));
p5.prototype.registerMethod('pre', function applySideDragForce() {
    for (var _i = 0, _a = Tank.TANKS; _i < _a.length; _i++) {
        var TANK = _a[_i];
        var FORCE_DIRECTION = TANK.motionDirection - 180;
        var FORCE_MAGNITUDE = Math.abs(sin(TANK.motionDirection - TANK.direction)) * TANK.speed * 5000;
        TANK.applyForce2Tracks(FORCE_DIRECTION, FORCE_MAGNITUDE);
    }
});
