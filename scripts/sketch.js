var textArea;   
var button;
var bg = [0];
var brush = [0,0,0];
var pos = [0,0];
var judgment;

function preload() {
    // judgment = loadImage("./images/judgment.jpg");
    judgment = loadImage("https://upload.wikimedia.org/wikipedia/commons/1/18/Last_Judgement_%28Michelangelo%29.jpg");
}

function setup() 
{
    createCanvas(windowWidth, windowHeight, WEBGL);
    textArea = select("textarea");
    button = select("button");
    pos = [judgment.width/3, judgment.height/3];
}

function update()
{
    pos[0] = noise(0.0025 * frameCount);
    pos[1] = noise((0.0025 * frameCount) + 10000);
    pos[0] = map(pos[0], 0, 1, -judgment.width/4, judgment.width/4);
    pos[1] = map(pos[1], 0, 1, -judgment.height/3, judgment.height/3)
}

function draw() 
{
    update();
    
    // Background
    // beginShape();
    // fill(0, 1);
    // box(width, height,0);
    // endShape();

    image(judgment, pos[0]-(judgment.width/2), pos[1]-(judgment.height/2));
}

function windowResized()
{
    createCanvas(windowWidth, windowHeight);
}