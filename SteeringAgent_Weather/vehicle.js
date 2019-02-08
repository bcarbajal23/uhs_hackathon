/*var pos; //Position
var vel; //Velocity
var accel //Acceleration

var r;
var maxforce;
var maxspeed;
*/
function Vehicle(xPos, yPos)
{
    this.accel = createVector(0,0);
    this.pos = createVector(xPos, yPos);
    this.vel = createVector(random(-1,1));
    this.vel.mult(random(1,4));

    this.r = 6;
    this.maxspeed = 5;
    this.maxforce = 0.2;
}

Vehicle.prototype.update = function(){
    this.vel.add(this.accel);
    this.vel.limit(this.maxspeed);

    this.pos.add(this.vel);
    this.accel.mult(0);
}

Vehicle.prototype.run = function(fishies){
    this.flock(fishies);
    this.update();
    this.borders();
    this.display();
}


Vehicle.prototype.applyForce = function(force){
    this.accel.add(force);
}

Vehicle.prototype.flock = function(fishies){
    var separateForce = this.separate(fishies);
    var alignForce = this.align(fishies);
    var cohesionForce =  this.cohesion(fishies);

    separateForce.mult(2);
    alignForce.mult(1.0);
    cohesionForce.mult(1.0);

    this.applyForce(separateForce);
    // this.applyForce(alignForce);
    this.applyForce(cohesionForce);

}

Vehicle.prototype.separate = function(fishies)
{
    var neighborDist = 25.0;
    var steer = createVector(0,0);
    var count = 0;

    /**
    * Look at all the agents
    */
    for(var i = 0; i < fishies.length; i++){
        var dist = p5.Vector.dist(this.pos, fishies[i].pos);

        //If there is a neighbor within distance, then 2 are group
        // to be added to the sum vector
        if((dist > 0) && (dist < neighborDist)){
            var diff = p5.Vector.sub(this.pos, fishies[i].pos);
            diff.normalize();
            diff.div(dist);
            steer.add(diff);
            count++;
        }
    }

    //If the is a group greater than 0, then apply the force
    // to the group so agents move in the same direction with the same
    // velocity
    if(count > 0){
        steer.div(count);
    }
    if(steer.mag() > 0){
        steer.normalize()
        steer.mult(this.maxspeed);
        steer.sub(this.vel);
        steer.limit(this.maxforce);

    }
    return steer;
}

Vehicle.prototype.seek = function(target){
    var desiredPos = p5.Vector.sub(target, this.pos);
    desiredPos.normalize()
    desiredPos.mult(this.maxspeed);

    var steer = p5.Vector.sub(desiredPos, this.vel);
    steer.limit(this.maxforce);
    return steer;
}

Vehicle.prototype.align = function(fishies){
    var neighborDist = 50;
    var sum = createVector(0,0);
    var count = 0;

    for(var i = 0; i < fishies.length; i++){
        var dist = p5.Vector.dist(this.pos, fishies[i].pos);
        if((dist > 0) && (dist <  neighborDist)){
            sum.add(fishies[i].vel);
            count++;
        }
    }
    var steer = createVector(0,0);
    if(count > 0){
        sum.div(count);
        sum.normalize();
        sum.mult(this.maxspeed);

        steer = p5.Vector.sub(sum, this.vel);
        steer.limit(this.maxforce);
    }
    return steer;

}

Vehicle.prototype.cohesion = function(fishies){
    var neighborDist = 50;
    var sum = createVector(0,0);
    var count = 0;

    for(var i = 0; i < fishies.length; i++){
        var dist = p5.Vector.dist(this.pos, fishies[i].pos);
        if((dist > 0) && (dist <  neighborDist)){
            sum.add(fishies[i].pos);
            count++;
        }
    }

    if(count > 0){
        sum.div(count);
        return this.seek(sum);
    }else{
        return createVector(0,0);
    }

}


Vehicle.prototype.display = function(){
    var theta = this.vel.heading() + PI/2;
    fill(127);
    stroke(200);
    strokeWeight(1);
    push();
    translate(this.pos.x, this.pos.y);
    rotate(theta);
    beginShape();
    vertex(0, -this.r*2);
    vertex(-this.r, this.r*2);
    vertex(this.r, this.r*2);
    endShape(CLOSE);
    pop();
};

/**
* This give wrap around for an agent that does off the canvas
*/
Vehicle.prototype.borders = function(){
    if(this.pos.x < -this.r) this.pos.x = width + this.r;
    if(this.pos.y < -this.r) this.pos.y = height + this.r;
    if(this.pos.x > width + this.r) this.pos.x = -this.r;
    if(this.pos.y > height + this.r) this.pos.y = -this.r;
};

Vehicle.prototype.updateWindDir = function (windMag, windDir){
    this.vel.setMag(windMag);
    this.pos.add(windDir);

}