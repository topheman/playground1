var http = require('http');

var static = require('node-static');

var clientFiles = new static.Server(__dirname+'/../www');

var httpServer = http.createServer(
    function(request, response) {
        request.addListener('end', function() { 
            clientFiles.serve(request, response);
       });
    })

module.exports = httpServer;