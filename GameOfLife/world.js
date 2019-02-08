
var cellsWide;
var cellsTall;
var cellSize = 20;

function World(){
    // this.currMap =
    this.cols = floor(width/cellSize);
    this.rows = floor(height/cellSize);

    //Generate a 2D array for the map
    this.currMap = new Array(this.cols);
    for(var i=0; i<this.cols; i++){
        this.currMap[i] = new Array(this.rows);
    }
    // This 2D array to swap stuff
    this.nextMap = new Array(this.cols);
    for(var i=0; i<this.cols; i++){
        this.nextMap[i] = new Array(this.rows);
    }
}//END WOrld Class
