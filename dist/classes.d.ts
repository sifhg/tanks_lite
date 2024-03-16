import p5 from "p5";
declare class p5Tanks extends p5 {
    mouse: {
        x: number;
        y: number;
    };
    static DISTANCE_SCALAR: number;
    static SPEED_SCALAR: number;
    static INSTANCES: p5Tanks[];
    TANKS: any[];
    BARRIERS: any[];
    constructor(arg0: (...args: any[]) => any, arg1?: string | HTMLElement | undefined);
    Tank: {
        new (instance: p5Tanks, group: Group, x: number, y: number, width?: number, length?: number, mass?: number, maxSpeed?: number, barrelLength?: number, shellMass?: number, name?: string, wheelWidth?: number): {
            p: p5Tanks;
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
            name: string;
            readonly reversing: boolean;
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
            readonly dimensions: object;
            readonly direction: number;
            readonly dispersion: number;
            readonly motionDirection: number;
            readonly turretDirection: number;
            readonly pos: {
                x: number;
                y: number;
            };
            readonly x: number;
            readonly y: number;
            toString(): string;
            /**
             * Normalizes and angle (degrees) to be between -180 and 180.
             * @param A The angle.
             * @returns An corresponding angle (degrees) between -180 and 180.
             */
            normalizeTo180(A: number): number;
            getAngle2Turret(a: number): number;
            getAngle2Turret(x: number, y?: number): number;
            getPerpendicularDistance2Turret(x: number, y: number): number;
            decideTurretTurningDirection(x: number, y: number, threshold?: number): Tank.Direction;
        };
    };
    Barrier: {
        new (instance: p5Tanks, x: number, y: number, r: number): {
            p: p5Tanks;
            body: Sprite;
        };
        new (instance: p5Tanks, x: number, y: number, w: number, l: number): {
            p: p5Tanks;
            body: Sprite;
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
