//var Connect = require('connect');
//
//module.exports = Connect.createServer(
//  Connect.logger(), // Log responses to the terminal using Common Log Format.
////  Connect.responseTime(), // Add a special header with timing information.
////  Connect.conditionalGet(), // Add HTTP 304 responses to save even more bandwidth.
////  Connect.cache(), // Add a short-term ram-cache to improve performance.
////  Connect.gzip(), // Gzip the output stream when the browser wants it.
//  Connect.staticProvider(__dirname+'/../www') // Serve all static files in the current dir.
//);

var http = require('http');

var nodeStatic = require('node-static');

var clientFiles = new nodeStatic.Server(__dirname+'/../www',{ cache: 0 });

var httpServer = http.createServer(
    function(request, response) {
        request.addListener('end', function() { 
            clientFiles.serve(request, response);
       });
    })

module.exports = httpServer;