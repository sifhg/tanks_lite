class Tank {
    static DISTANCE_SCALAR = 20;

    private _name: string;
    private _hull: Sprite;

    constructor(x: number, y: number,
                width: number = 2.908, length: number = 6.35,
                name: string = "Cromwell") {
        this._hull = new Sprite(x, y,
            width * Tank.DISTANCE_SCALAR, length * Tank.DISTANCE_SCALAR,
            "d");
        this._name = name;
    }

    get name(): string {
        return this._name;
    }
    setName(N: string): void {
        this._name = N;
    }
}