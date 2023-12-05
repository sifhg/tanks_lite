class Tank {
    #size;
    #pos;
    #vel;
    #acc;
    #topS;

    constructor() {
        this.#size = {
            x: 10,
            y: 20
        }
        this.#pos = {
            x: 10,
            y: 10,
            ang: 0
        };
        this.#vel = {
            x: 0,
            y: 0,
            ang: 0
        };
        this.#acc = 1;
        this.#topS = 10;
    }

    //Getters
    get pos(){
        return this.#pos;
    }
    get x(){
        return this.#pos.x;
    }
    get y(){
        return this.#pos.y;
    }
    get ang(){
        return this.#pos.ang;
    }

    display() {
        
    }
}