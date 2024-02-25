var textArea;   
var button;
var bg = [0];
var brush = [0,0,0];
var pos = [0,0];
var judgment;
var count = 0;
var countMax = 5;
var invert = 0;
var state = 0;
var hideCount = 0;
var hideCountMax = 120;

function preload() {
    // judgment = loadImage("./images/judgment.jpg");
    judgment = loadImage("https://upload.wikimedia.org/wikipedia/commons/1/18/Last_Judgement_%28Michelangelo%29.jpg");
}

function setup() 
{
    createCanvas(windowWidth, windowHeight, WEBGL);
    blendMode(ADD);
    textArea = select("textarea");
    button = select("button");
    button.mousePressed(() => {
        if(state == 0) state = 1;
        else if(state == 1) state = 2;
        else if(state == 2) state = 0;
    });
    pos = [judgment.width/3, judgment.height/3];
}

function update()
{
    if(state == 0)
    {
        pos[0] = noise(0.0025 * frameCount);
        pos[1] = noise((0.0025 * frameCount) + 10000);
    }
    else
    {
        pos[0] = noise(0.025 * frameCount);
        pos[1] = noise((0.025 * frameCount) + 10000);
    }
    pos[0] = map(pos[0], 0, 1, -judgment.width/4, judgment.width/4);
    pos[1] = map(pos[1], 0, 1, -judgment.height/3, judgment.height/3);
    if(count == 0)
    {
        countMax = floor(random(1,20));
        invert = random(16);
    }
    count++;
    count%=countMax;
    if(state == 2) hideCount++;
    else hideCount = 0;
}

function draw() 
{
    update();
    background(0);

    image(judgment, pos[0]-(judgment.width/2), pos[1]-(judgment.height/2));
    if(invert < 1) 
    {
        filter(INVERT);
    }
    if(state == 1) 
    {
        filter(THRESHOLD, 0.6);
        image(judgment, pos[0]-(judgment.width/2), pos[1]-(judgment.height/2));
        filter(INVERT);
    }
    else if(state == 2)
    {
        filter(THRESHOLD, 0.6-((hideCount/hideCountMax)*0.6));
        image(judgment, pos[0]-(judgment.width/2), pos[1]-(judgment.height/2));
        filter(INVERT);
    }
}

function windowResized()
{
    createCanvas(windowWidth, windowHeight);
}