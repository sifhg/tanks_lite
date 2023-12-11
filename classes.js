class Tank {
    static DISTANCE_SCALAR = 20;

    #hull;
    #wheels;
    #turret;
    #gun;

    #size;
    #pos;
    #vel;
    #acc;
    #topS;

    constructor(input) {
        if(input == undefined || input.group == undefined) {
            throw new Error("An instance of class Tank must be constructed using an input JSON element with a 'group' key.");
        }

        this.#hull = new input.group.Sprite();
        if(input!= undefined && input.pos != undefined) {
            this.#hull.x = input.pos.x;
            this.#hull.y = inpus.pos.y;
        }
        this.#hull.w = 2.908 * Tank.DISTANCE_SCALAR;
        this.#hull.h = 6.35 * Tank.DISTANCE_SCALAR;
        this.#hull.color = "#bbbbbb";
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
}