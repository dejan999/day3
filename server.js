
var express = require('express');
var server = express();

server.use(express.static(__dirname ));
server.get('*', function (req, res) {
	
		res.sendFile(__dirname + '/index.html');
	
});
var port = 8080;
server.listen(port, function () {
	console.log('server listening on port ' + port);
});
