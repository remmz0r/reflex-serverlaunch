var fnc = require('./functions.js');
var config = require('./config.json');

var ports = fnc.makePorts(config);

var maxServers = config.server.maxServers;

var currentServers =  0;

console.log(maxServers);
console.log(ports[5]);

var express = require('express');
 
var app = express();



var server = config.server.path;
 
app.get('/launch/:mode/:port/:map', function(req, res) {
	
});

app.get('/info/free', function(req, res) {
	
	res.send({freeServers: config.server.maxServers - currentServers})
	
});

app.get('/launch/pug/:mode', function(req, res) {
	
	if (currentServers >= maxServers) {
		
	res.send({success: 0, error: "Too many servers running"})
	
	} else {
		
	mode = req.params.mode;
	
	switch(req.params.mode) {
		
		case "duel": mode = "1v1"; break;
		case "2v2": mode = "tdm"; break;
		
	}
	
	var port = ports[currentServers];
	var steam = port + 20;
	var map = "thct7";
	var d = new Date();
	var v  = new Date();
	var h = fnc.addZero(d.getHours());
	var m = fnc.addZero(d.getMinutes());
	
	var maxClients = 0;
	
	switch(mode) {
		
		case "1v1":
			var hours = config.gametype.duel.duration.hours;
			var mins = config.gametype.duel.duration.minutes;
			var maxClients = config.gametype.duel.maxClients;
			var timeLimit = config.gametype.duel.timeLimit; break;
		case "2v2":
			var hours = config.gametype.twos.duration.hours;
			var mins = config.gametype.twos.duration.minutes;
			var maxClients = config.gametype.twos.maxClients;
			var timeLimit = config.gametype.twos.timeLimit; break;
		case "tdm":
			var hours = config.gametype.tdm.duration.hours;
			var mins = config.gametype.tdm.duration.minutes;
			var maxClients = config.gametype.tdm.maxClients;
			var timeLimit = config.gametype.tdm.timeLimit; break;
		case "atdm":
			var hours = config.gametype.atdm.duration.hours;
			var mins = config.gametype.atdm.duration.minutes;
			var maxClients = config.gametype.atdm.maxClients;
			var timeLimit = config.gametype.atdm.timeLimit; break;	
		case "affa":
			var hours = config.gametype.affa.duration.hours;
			var mins = config.gametype.affa.duration.minutes;
			var maxClients = config.gametype.affa.maxClients;
			var timeLimit = config.gametype.affa.timeLimit; break;	
		case "ffa":
			var hours = config.gametype.ffa.duration.hours;
			var mins = config.gametype.ffa.duration.minutes;
			var maxClients = config.gametype.ffa.maxClients;
			var timeLimit = config.gametype.ffa.timeLimit; break;	
		case "a1v1":
			var hours = config.gametype.a1v1.duration.hours;
			var mins = config.gametype.a1v1.duration.minutes;
			var maxClients = config.gametype.a1v1.maxClients;
			var timeLimit = config.gametype.a1v1.timeLimit; break;				
		case "ctf":	break;
		
	}
	
	var dur = fnc.addZero(parseInt(hours)) + ":" + fnc.addZero(parseInt(mins));
	
	console.log(typeof dur);
	console.log(dur);
	
	var taskName = mode + "#" + (currentServers + 1).toString();
	
	var serverString =  config.server.path + ' +loadconfig ' + config.server.config + ' +sv_startmode ' + mode + ' +sv_gameport ' + ports[currentServers] + ' +sv_steamport ' + steam + ' +sv_startmap ' + map + ' +sv_maxclients ' + maxClients;
	
	var startTime = h + ":" + fnc.addZero(parseInt(m) + 1);
	
	console.log(startTime);
	
    var spawn = require('child_process').spawn,
	ls           = spawn('schtasks', ['/Create', '/TR', serverString, '/V1', '/SC', 'ONCE', '/TN', taskName, '/ST', startTime, '/F', '/K', '/Z', '/RU', config.server.runuser, '/RP', config.server.runpass, '/DU', dur]);
	
	res.send({success: 1, mode: mode, host: config.server.hostname, port: ports[currentServers], password: "undefined"})
	
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
app.listen(3000);
console.log('Listening on port 3000...');