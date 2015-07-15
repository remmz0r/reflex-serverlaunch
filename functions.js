exports.addZero = function (i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}

exports.makePorts = function (config) {
	
	var portRange = [];
	
	for (i = 0; i < config.server.maxServers; i++) {
		
		portRange[i] = config.server.minPort + i;
		
	}
	
	return portRange;
	
	
}