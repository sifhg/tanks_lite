"use strict";
let ball;
let ground;
window.setup = function () {
    const DISPLAY = document.getElementById("display-control-test");
    if (DISPLAY === null) {
        throw new Error("DISPLAY === null: Element with id 'display-control-test' not found.");
    }
    let canvas = createCanvas(DISPLAY.offsetWidth, DISPLAY.offsetHeight);
    canvas.parent("display-control-test");
    addEventListener("resize", () => {
        canvas.resize(DISPLAY.offsetWidth, DISPLAY.offsetHeight);
        background(backgroundColour);
    });
    world.gravity.y = 10;
    ball = new Sprite(20, 20, 50);
    ball.collider = "d";
    ball.mass = 5;
    ground = new Sprite(width / 2, height * 4 / 5, width, 5, "k");
    ground.rotation = 2;
    ground.velocity.y = -1;
};
window.draw = function () {
    window.clear();
};
//# sourceMappingURL=sketch-control-test.js.map