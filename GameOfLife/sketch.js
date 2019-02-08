
/**
 * Author: Carlos Carbajal
 *
 * Conway's Game of Life.
 */
var currMap, nextMap;
var cols, rows;
var cellsWide;
var cellsTall;
var cellSize = 20;
var cellsWide, cellsTall;
var pause = true;

function setup(){
    createCanvas(1200,800);

    cols = floor(width/cellSize);
    rows = floor(height/cellSize);
    // console.log(rows + " " + cols)
    cellsWide = cols;
    cellsTall= rows;
    //Generate a 2D array for the map
    currMap = new Array(rows);
    for(var i=0; i< rows; i++){
        currMap[i] = new Array(cols);
    }
    // This 2D array to swap stuff
    nextMap = new Array(rows);
    for(var i=0; i< cols; i++){
        nextMap[i] = new Array(cols);
    }

    var div = createDiv('Frame Rate:').size(300,40)
                        .id('frame_rate')
                        .style('font-size', 30);
    div.position(20, 810);

    newMap = createButton('New Map');
    newMap.position(220, 820);
    newMap.mousePressed(randomPopulate);

    pauseMap = createButton('Pause');
    pauseMap.position(300, 820);
    pauseMap.mousePressed(pauseTheMap)
    randomPopulate();
}

function draw(){
    background(180);

    if(pause){
        advanceWorld();
    }
    displayWorld();

    showFrameRate();
}

function showFrameRate(){
    var elm = document.getElementById('frame_rate');
    elm.innerHTML = "Frame Rate: " + getFrameRate().toFixed(0);
}

function pauseTheMap(){
    pause = !pause;
}
/**
 * Randomly generate the cells on the map.
 * either dead or alive
 */
function randomPopulate(){
    for(var r = 0; r < rows; r++){
        for(var c = 0; c < cols; c++){
            if(r ==0 || c ==0 || r == rows -1 || c == cols -1){
                currMap[r][c] = 0;
            }else{
                currMap[r][c] = floor(random(2));
            }
            nextMap[r][c] = 0;
        }
    }
}

/**
 * Display the world.
 */
function displayWorld(){

    for(var r = 0; r < rows; r++){
        for(var c = 0; c < cols; c++){
            if(currMap[r][c] == 0){
                fill(255, 60,0);
            }else if(currMap[r][c]==1){
                fill(0,60,255);
            }else{
                fill(255,0,0);
            }
            rect(c*cellSize,r*cellSize,cellSize,cellSize);
        }
    }
}

/**
 * Moveds the agents along the map. The 4 laws of Conway's Game of life are
 * implement. Agents are either kept alove, killed, or spawned based off the rules.
 */
function advanceWorld(){
    var NC; //counter for neibors
    for(var r = 0; r < rows; r++){
        for(var c = 0; c < cols; c++){
            // console.log(r + " " + c);
            NC = getAdjTotal(r, c);
            //Conditions for if this cell is alive
            if(currMap[r][c] == 1){
                if(NC == 2 || NC ==3){
                    nextMap[r][c] = 1;
                }else{
                    nextMap[r][c] = 0;
                }
            }else{ //Conditons for if the cell is dead (Because is XOR to root condition in co-condition)
                if(NC ==3){
                    nextMap[r][c] = 1;
                }else{
                    nextMap[r][c] = 0;
                }
            }
        }
    }

    for(var r = 0; r < rows; r++){
        for(var c = 0; c < cols; c++){
            currMap[r][c] = nextMap[r % cellsTall][c % cellsWide]
        }
    }


}

/**
 * Determine the number of adjacent live neightbors for the corresponding live cell
 */
function getAdjTotal(cRow, cCol){
    var tot = 0;
    var rowUpperLim = cRow + 1;
    var colUpperLim = cCol+1;
    var adjR = cRow-1;
    var adjC = cCol -1;

    tot += currMap[(adjR+cellsTall)%cellsTall][(adjC+cellsWide)%cellsWide];
    tot += currMap[(adjR+cellsTall)%cellsTall][cCol];
    tot += currMap[(adjR+cellsTall)%cellsTall][(colUpperLim+cellsWide)%cellsWide];
    tot += currMap[cRow][(adjC+cellsWide)%cellsWide];
    tot += currMap[cRow][(colUpperLim+cellsWide)%cellsWide];
    tot += currMap[(rowUpperLim+cellsTall)%cellsTall][(adjC+cellsWide)%cellsWide];
    tot += currMap[(rowUpperLim+cellsTall)%cellsTall][cCol];
    tot += currMap[(rowUpperLim+cellsTall)%cellsTall][(colUpperLim+cellsWide)%cellsWide];
    return tot;

}
