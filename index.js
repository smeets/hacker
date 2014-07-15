var static = require('node-static');
var file = new static.Server('./public');

require('http').createServer(function (request, response) {
    request.addListener('end', function () {
        file.serve(request, response, function (e, res) {
        });
    }).resume();
}).listen(8080);