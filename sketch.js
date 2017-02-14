var mapimg;

var centerLatitude=0; var centerLongitude=0;

var zoom = 1;
//Mumbai
var lat= 19.076; var lon= 72.877;

var earthquakes;
var token = 'pk.eyJ1Ijoic2hyZXlhc2dhb25rYXIiLCJhIjoiY2l6NHV2MGN5MDEwczJ3b3QzZ3BtNG9xYSJ9.yhFT5jNrtUnxmeLDZAoI3g';
var url = 'https://api.mapbox.com/styles/v1/mapbox/dark-v9/static/0,0,' + zoom + ',0,0/1024x512?access_token='+token;

function preload() {
	mapimp = loadImage(url);
    earthquakes = loadStrings("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.csv");
}

function mercX(lon){
    lon = radians(lon);
	var a = (256 / PI) * pow(2, zoom);
	var b = lon + PI;
	return a * b;
}

function mercY(lat){
    lat = radians(lat);
	var a = (256 / PI) * pow(2, zoom);
	var b = tan(PI / 4 + lat / 2);
	var c = PI - log(b);
	return a * c;
}

function setup() {
	createCanvas(1024,512);
	translate(width/2, height/2);
	imageMode(CENTER);
	image(mapimp, 0,0);

    var cx = mercX(centerLongitude);
    var cy = mercY(centerLatitude);

    for (var i = 0; i < earthquakes.length; i++) {
        var data = earthquakes[i].split(/,/);
        var lat = data[1]; //Get Latitude
        var lon = data[2]; //Get Longitude
        var mag = data[4]; //Get Magnitude
        var intensity = Math.round(mag);
        console.log(intensity);
        var x = mercX(lon) - cx;
        var y = mercY(lat) - cy;

        //Amplify the difference in magnitude
        mag = pow(10,mag);
        mag = sqrt(mag);
        var magmax = sqrt(pow(10,10));

        var d = map(mag,0,magmax,0,180);
        if(intensity==9){stroke(205,0,0,200);fill(205,0,0,200);}
        else if(intensity==8) {stroke(255,51,0,200);fill(255,51,0,200);}
        else if(intensity==7) {stroke(255,153,104,200);fill(255,153,104,200);}
        else if(intensity==6) {stroke(255,206,104,200);fill(255,206,104,200);}
        else if(intensity==5) {stroke(255,252,62,200);fill(255,252,62,200);}
        else if(intensity==4) {stroke(153,255,50,200);fill(153,255,50,200);}
        else if(intensity==3) {stroke(153,204,103,200);fill(153,204,103,200);}
        else if(intensity==2) {stroke(1,203,153,200);fill(1,203,153,200);}
        else if(intensity==1) {stroke(0,154,252,200);fill(0,154,252,200);}
        else if(intensity==0) {stroke(103,0,103,200);fill(103,0,103,200);}
        //stroke(color);
        //fill(color);
        ellipse(x,y,d,d);
    }
}
