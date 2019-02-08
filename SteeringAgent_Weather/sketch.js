
var vehicles = []
function setup(){
    createCanvas(900,600);
    url = "https://api.apixu.com/v1/current.json?key=184823be67f04185a9b205244180502&q=TUCSON";
    loadJSON(url, getWeather);
    for(var i = 0; i < 2; i++){
        vehicles.push(new Vehicle(random(100), random(100)));
    }

    var div = createDiv('Frame Rate:').size(300,40)
                        .id('frame_rate')
                        .style('font-size', 30);
    div.position(20,610);


}

function draw(){
    background(51);

    for(var i = 0; i < vehicles.length; i++){
        vehicles[i].run(vehicles);
    }

    showFrameRate();
}

function showFrameRate(){
    var elm = document.getElementById('frame_rate');
    elm.innerHTML = "Frame Rate: " + getFrameRate().toFixed(0);
}

function getWeather(weather){
    // console.log(Number(weather.current.wind_degree))
    var windMag = Number(weather.current.wind_mph);
    var windAngle = radians(Number(weather.current.wind_degree));

    var tempDiv = createDiv("Temperatue: "+floor(weather.current.temp_f) + '&deg; ')
                            .style('font-size', 30);
    tempDiv.position(20, 650);
    var windDiv = createDiv("Wind: " + windMag + " <small>MPH<small>")
                            .style('font-size', 30);
    windDiv.position(20, 690)

    for(var i = 0; i < vehicles; i++){
        vehicles[i].updateWindDir(windMag, windAngle);
    }
}
