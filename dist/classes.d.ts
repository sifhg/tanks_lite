import p5 from 'p5';
declare class p5Tanks extends p5 {
    static DISTANCE_SCALAR: number;
    static SPEED_SCALAR: number;
    static TANKS: any[];
    static Ingrid: {
        new (name: string): {
            _theName: string;
            toString(): string;
            readonly name: string;
        };
        A: number;
    };
    Tank: {
        new (instance: p5 | p5Tanks, group: Group, x: number, y: number, width?: number, length?: number, mass?: number, maxSpeed?: number, barrelLength?: number, shellMass?: number, name?: string, wheelWidth?: number): {
            p: p5 | p5Tanks | null;
            _damage: number;
            _mass: number;
            _maxSpeed: number;
            _name: string;
            _dispersion: number;
            _modules: Group;
            _turretAssembly: Group;
            _gun: Sprite;
            _hull: Sprite;
            _turret: Sprite;
            _tracks: {
                t0: Sprite;
                t1: Sprite;
            };
            _joints: {
                jr: GlueJoint;
                jl: GlueJoint;
                turretAxle: WheelJoint;
                mantlet: Joint;
            };
            drive(power: Tank.Direction): void;
            steer(power: Tank.Direction): void;
            applyForce2Tracks(direction: number, strength: number): void;
            turnTurret(power: Tank.Direction | number | {
                x: number;
                y: number;
            }): Tank.Direction;
            setName(N: string): void;
            readonly name: string;
            readonly velocity: {
                x: number;
                y: number;
            };
            readonly speed: number;
            readonly trackSpeed: {
                s0: number;
                s1: number;
            };
            readonly maxSpeed: number;
            readonly direction: number;
            readonly dispersion: number;
            readonly motionDirection: number;
            readonly turretDirection: number;
            toString(): string;
            getAngle2Turret(xa: number, y?: number): number;
            getPerpendicularDistance2Turret(x: number, y: number): number;
            decideTurretTurningDirection(x: number, y: number, threshold?: number): Tank.Direction;
        };
    };
}
export default p5Tanks;
export declare namespace Tank {
    enum Direction {
        Forwards = 300,
        Backwards = -150,
        Left = -8,
        Right = 8,
        None = 0
    }
}
export declare class Barrier {
    static BARRIERS: Barrier[];
    body: Sprite;
    constructor(x: number, y: number, r: number);
    constructor(x: number, y: number, w: number, h: number);
}
