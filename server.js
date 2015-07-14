function addZero(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}

function makePorts(config) {
	
	var portRange = [];
	
	for (i = 0; i < config.server.maxServers; i++) {
		
		portRange[i] = config.server.minPort + i;
		
	}
	
	return portRange;
	
	
}

var config = require('./config.json');

var ports = makePorts(config);

var maxServers = config.server.maxServers;

var currentServers =  0;

console.log(maxServers);
console.log(ports[5]);

var express = require('express');
 
var app = express();



var server = config.server.path;
 
app.get('/launch/:mode/:port/:map', function(req, res) {
	
});

app.get('/launch/pug/:mode', function(req, res) {
	
	if (currentServers >= maxServers) {
		
	res.send({error: "Too many servers launched, try again later"})
	
	} else {
	
	var mode = req.params.mode;
	var port = ports[currentServers];
	var steam = port + 20;
	var map = "thct7";
	var d = new Date();
	var v  = new Date();
	var h = addZero(d.getHours());
	var m = addZero(d.getMinutes());
	
	var maxClients = 0;
	
	switch(mode) {
		
		case "1v1": maxClients = 2; break;
		case "2v2": maxClients = 4; break;
		case "tdm":
			
		
			var hours = config.gametype.tdm.duration.hours;
			var mins = config.gametype.tdm.duration.minutes;
			var maxClients = config.gametype.tdm.maxClients;
			var timeLimit = config.gametype.tdm.timeLimit;
		
			break;
		case "ctf":	break;
		
	}
	
	var dur = addZero(parseInt(hours)) + ":" + addZero(parseInt(mins));
	
	console.log(typeof dur);
	console.log(dur);
	
	var taskName = mode + "#" + (currentServers + 1).toString();
	
	var serverString =  config.server.path + ' +loadconfig ' + config.server.config + ' +sv_startmode ' + mode + ' +sv_gameport ' + ports[currentServers] + ' +sv_steamport ' + steam + ' +sv_startmap ' + map + ' +sv_maxclients ' + maxClients;
	
	var startTime = h + ":" + addZero(parseInt(m) + 1);
	
	console.log(startTime);
	
    var spawn = require('child_process').spawn,
<<<<<<< HEAD
	ls           = spawn('schtasks', ['/Create', '/TR', serverString, '/V1', '/SC', 'ONCE', '/TN', taskName, '/ST', startTime, '/F', '/K', '/Z', '/RU', 'flipped\\reflex', '/RP', 'mattz0r!', '/DU', dur]);
=======
	ls           = spawn('schtasks', ['/Create', '/TR', serverString, '/V1', '/SC', 'ONCE', '/TN', taskName, '/ST', startTime, '/F', '/K', '/Z', '/RU', 'reflex', '/RP', 'reflex', '/DU', dur]);
>>>>>>> dff3f6affa6e6cf161ed95e67a14af1be4f38e49
	
	res.send({mode: mode, host: config.server.hostname, port: ports[currentServers], password: "undefined"})
	
	currentServers++;
	
	
	
	var timer = dur.split(":");
	
	var tHours = (+timer[0]) * 3600;
	var tMins = (+timer[1]) * 60;
	var interval = (tHours + tMins) * 1000;
	
	console.log(interval);
	
	setTimeout(function() {

			currentServers--;
			console.log(currentServers);
			
	}, interval);
	
		
	
	
	
	console.log(currentServers);

	ls.stdout.on('data', function (data) {
	console.log('stdout: ' + data);
	});

	ls.stderr.on('data', function (data) {
	console.log('stderr: ' + data);
	});

	ls.on('exit', function (code) {
	console.log('child process exited with code ' + code);
	});
	
	}
	
});
app.listen(3000, "172.18.87.15");
console.log('Listening on port 3000...');