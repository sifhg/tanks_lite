class Tank {
    private _name: string;

    constructor(N: string) {
        this._name = N;
    }

    get name(): string {
        return this._name;
    }
    setName(N: string): void {
        this._name = N;
    }
}

let aTank: Tank = new Tank("KV-2");
aTank.setName("Hej");