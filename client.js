var canvas = document.getElementById("ctx");
var ctx = canvas.getContext("2d");

ctx.font = '30px Arial';

function resizeCanvas() {
	canvas.width = window.innerWidth - 20;
	canvas.height = window.innerHeight - 20;
	var winnx = window.innerWidth / 2;
	var winny = window.innerHeight / 2;
	var winddx = winnx - 270;
	var winddy = winny - 270;
	/**
	 * Your drawings need to be inside this function otherwise they will be reset when
	 * you resize the browser window and the canvas goes will be cleared.
	 */
	//drawStuff(winnx,winny,winddx,winddy);
}
resizeCanvas();

var width = window.innerWidth - 20;
var height = window.innerHeight - 20;

var socket = io("https://getsquaredclient-hittmana.c9users.io:8081");

var gameData = [];

var gamesize = 4300;
var gamesize2 = gamesize * 2;
var winx = window.innerWidth / 2;
var winy = window.innerHeight / 2;
var windx = winx - 250;
var windy = winy - 250;
var wHeight = window.innerHeight;
var wWidth = window.innerWidth;
var myID = "";
var me = {};

socket.on('getID', function(data) {
	myID = data.toString();
});

socket.on('newPositions', function(data) {
	for (i in data) {
		gameData[i] = data[i];
	}
	ctx.clearRect(0, 0, width, height);
	ctx.fillStyle = "grey";
	/*
	Grid stuffs
	x stuffs
	*/

	for (var i = 0; i < gameData.length; i++) {
		if (gameData[i].id == myID) {
			me = gameData[i];
		}
	}

	for (var i = 0; i < gamesize + 1; i += 45) {
		ctx.fillRect(i /*+ windx*/ - me.xoffset, 0, 1, gamesize);
	}
	/*
	y stuffs
	*/
	for (var i = 0; i < gamesize + 1; i += 45) {
		ctx.fillRect(0, i /*+ windy*/ - me.yoffset, gamesize2, 1);
	}

	for (var i = 0; i < gameData.length; i++) {
		//ctx.fillText(gameData[i].number, gameData[i].x, gameData[i].y);
		//roundRect((wWidth / 2), (wHeight / 2), 30, 30, 7, "round", "#000000", "#000000");
		if (gameData[i].id == myID) {
			roundRect((wWidth / 2), (wHeight / 2), 30, 30, 7, "round", "#000000", "#000000");
		}
		else {
			roundRect(gameData[i].x -me.xoffset + gameData[i].xoffset + (wWidth / 2), gameData[i].y - me.yoffset + gameData[i].yoffset + (wHeight / 2), 30, 30, 7, "round", "#21CC26", "#000000");
		}

	}


});

document.onkeydown = function(event) {
	if (event.keyCode === 68) //d
		socket.emit('keyPress', {
		inputId: 'right',
		state: true
	});
	else if (event.keyCode === 83) //s
		socket.emit('keyPress', {
		inputId: 'down',
		state: true
	});
	else if (event.keyCode === 65) //a
		socket.emit('keyPress', {
		inputId: 'left',
		state: true
	});
	else if (event.keyCode === 87) // w
		socket.emit('keyPress', {
		inputId: 'up',
		state: true
	});

}
document.onkeyup = function(event) {
	if (event.keyCode === 68) //d
		socket.emit('keyPress', {
		inputId: 'right',
		state: false
	});
	else if (event.keyCode === 83) //s
		socket.emit('keyPress', {
		inputId: 'down',
		state: false
	});
	else if (event.keyCode === 65) //a
		socket.emit('keyPress', {
		inputId: 'left',
		state: false
	});
	else if (event.keyCode === 87) // w
		socket.emit('keyPress', {
		inputId: 'up',
		state: false
	});
}

function roundRect(x, y, w, h, cr, join, color, outcolor) {
	var rectX = x;
	var rectY = y;
	var rectWidth = w;
	var rectHeight = h;
	var cornerRadius = cr;
	ctx.lineJoin = join;
	ctx.lineWidth = cornerRadius;
	ctx.fillStyle = color
	ctx.strokeStyle = outcolor;
	ctx.strokeRect(rectX + (cornerRadius / 2), rectY + (cornerRadius / 2), rectWidth - cornerRadius, rectHeight - cornerRadius);
	ctx.fillRect(rectX + (cornerRadius / 2), rectY + (cornerRadius / 2), rectWidth - cornerRadius, rectHeight - cornerRadius);
}
