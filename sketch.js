var mapimg;

var clat=0;
var clon=0;

//19.0760° N, 72.8777° E
//49.2827° N, 123.1207° W
var zoom = 1;
//Mumbai
var lat= 19.076;
var lon= 72.877;

var earthquakes;

function preload() {
	mapimp = loadImage("https://api.mapbox.com/styles/v1/mapbox/dark-v9/static/0,0,1,0,0/1024x512?access_token=pk.eyJ1Ijoic2hyZXlhc2dhb25rYXIiLCJhIjoiY2l6NHV2MGN5MDEwczJ3b3QzZ3BtNG9xYSJ9.yhFT5jNrtUnxmeLDZAoI3g");
    earthquakes = loadStrings("http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.csv");
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

    var cx = mercX(clon);
    var cy = mercY(clat);

    for (var i = 0; i < earthquakes.length; i++) {
        var data = earthquakes[i].split(/,/);
        var lat = data[1];
        var lon = data[2];
        var mag = data[4];
        var x = mercX(lon) - cx;
        var y = mercY(lat) - cy;

        mag = pow(10,mag);
        mag = sqrt(mag);

        var magmax = sqrt(pow(10,10));

        var d = map(mag,0,magmax,0,180);
        stroke(255,0,255);
        fill(255,0,255,200);
        ellipse(x,y,d,d);
    }
}
