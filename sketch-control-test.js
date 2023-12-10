let ball, floor;



function setup() {
    const DISPLAY = document.getElementById("diaplay-control-test");
    let canvas = createCanvas(DISPLAY.offsetWidth, DISPLAY.offsetHeight);
    canvas.parent("diaplay-control-test");
    background(backgroundColour);
    addEventListener("resize", (event) => {
        canvas.resize(DISPLAY.offsetWidth, DISPLAY.offsetHeight);
        background(backgroundColour);
    });


    world.gravity.y = 10;
	
	ball = new Sprite(40, 30, 50);
    fill(255, 10, 10);
    circle(100, 30, 50);
}

function draw() {
    clear();
}