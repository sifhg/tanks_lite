declare class Tank {
    static DISTANCE_SCALAR: number;
    static SPEED_SCALAR: number;
    static TANKS: Tank[];
    private _damage;
    private _mass;
    private _maxSpeed;
    private _name;
    private _dispersion;
    private _modules;
    private _hull;
    private _turret;
    private _tracks;
    private _joints;
    constructor(group: Group, x: number, y: number, width?: number, length?: number, mass?: number, maxSpeed?: number, barrelLength?: number, shellMass?: number, name?: string, wheelWidth?: number);
    drive(power: Direction): void;
    steer(power: Direction): void;
    applyForce2Tracks(direction: number, strength: number): void;
    turnTurret(power: Direction | number | {
        x: number;
        y: number;
    }): void;
    breakTurret(): void;
    setName(N: string): void;
    get name(): string;
    get velocity(): {
        x: number;
        y: number;
    };
    get speed(): number;
    get trackSpeed(): {
        s0: number;
        s1: number;
    };
    get maxSpeed(): number;
    get direction(): number;
    get dispersion(): number;
    get motionDirection(): number;
    get turretDirection(): number;
    protected getAngle2Turret(xa: number, y?: number): number;
    protected getPerpendicularDistance2Turret(x: number, y: number): number;
    decideTurretTurningDirection(x: number, y: number, threshold?: number): Direction;
}
declare class Barrier {
    static BARRIERS: Barrier[];
    body: Sprite;
    constructor(x: number, y: number, r: number);
    constructor(x: number, y: number, w: number, h: number);
}
declare enum Direction {
    Forwards = 300,
    Backwards = -150,
    Left = -8,
    Right = 8,
    NONE = 0
}
