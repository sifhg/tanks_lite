let tanks;

function setup() {
    const DISPLAY = document.getElementById("diaplay-control-test");
    let canvas = createCanvas(DISPLAY.offsetWidth, DISPLAY.offsetHeight);
    canvas.parent("diaplay-control-test");
    background(backgroundColour);
    addEventListener("resize", (event) => {
        canvas.resize(DISPLAY.offsetWidth, DISPLAY.offsetHeight);
        background(backgroundColour);
    });

    tanks = new Group();
	aTank = new Tank({
        group: tanks
    });
}

function draw() {
    clear();
}