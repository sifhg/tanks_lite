"use strict";
class Tank {
    _name;
    constructor(N) {
        this._name = N;
    }
    get name() {
        return this._name;
    }
    setName(N) {
        this._name = N;
    }
}
let aTank = new Tank("KV-2");
aTank.setName("Hej");
//# sourceMappingURL=temp2.js.map