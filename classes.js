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

class Map {
    #size;
    #cam;
    #terrain;
    constructor(argument) {
        this.#size = {
            x: 5000,
            y: 5000
        }
        this.#cam = {
            size: {
                x: 500,
                y: 300
            },
            pos: {
                x: 0,
                y: 0
            }
        }
        this.#terrain = translateTerrain();
        if(argument != undefined) {
            this.#appendArgument(argument);
        }
        
    }
    #appendArgument(argument) {
        let argumentTypes = ["size", "cam", "terrain"];
        for(const TYPE of argumentTypes) {
            if(argument["size"] != undefined) {
                this.#size = argument["size"];
            }
            if(argument["cam"] != undefined) {
                this.#cam = argument["cam"];
            }
            if(argument["terrain"] != undefined) {
                this.#terrain = argument["terrain"];
            }
        }
    }

    //Getters
    get size() {
        return this.#size;
    }
}

class CollisionContainer {
    #area;
    #tanks;
    #shells;
    #terrainElements;
    #parentMap;
    constructor(x0Input, y0Input, x1Input, y1Input, aMap) {
        this.#area = {
            x0: x0Input,
            y0: y0Input,
            x1: x1Input,
            y1: y1Input
        }
        this.#tanks = [];
        this.#shells = [];
        this.#terrainElements = [];
        this.#parentMap = aMap;
    }

    //Getters
    get area() {
        return this.#area;
    }

    //Appenders
    appendTank(aTank) {
        this.#tanks.push(aTank);
    }
    appendShell(aShell) {
        this.#shells.push(aShell);
    }
    appendTerrsinElement(aTerrainElement) {
        this.#terrainElements.push(aTerrainElement);
    }

    //Removers
    removeTank(index) {
        if(index < 0 || index >= this.#tanks.length) {
            throw new Error(`Invalid index: ${index} of #tanks does not exist. Please provide a valid index.`);
        }
        this.#tanks.splice(index, 1);
    }
    removeShell(index) {
        if(index < 0 || index >= this.#shells.length) {
            throw new Error(`Invalid index: ${index} of #shells does not exist. Please provide a valid index.`);
        }
        this.#shells.splice(index, 1);
    }
    removeTerrainElement(index) {
        if(index < 0 || index >= this.#terrainElements.length) {
            throw new Error(`Invalid index: ${index} of #terrainElements does not exist. Please provide a valid index.`);
        }
        this.#terrainElements.splice(index, 1);
    }
}