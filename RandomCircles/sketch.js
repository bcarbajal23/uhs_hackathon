function setup(){
    createCanvas(900,600);

    background(51);
}

function draw(){
    //Pick location to place circle
    var randX = getRandomInt(900);
    var randY = getRandomInt(600);

    //Pick random R/G/B values to fill circle and stroke color
    var c1 = getRandomInt(255);
    var c2 = getRandomInt(255);
    var c3 = getRandomInt(255);

    stroke(c2,c3,c1);

    var num = getRandomInt(10);
    strokeWeight(num);
    fill(c1,c2,c3);
    ellipse(randX,randY, 50, 50);
}

function getRandomInt(max){
    return Math.floor(Math.random() * Math.floor(max));
}