var express = require('express');
var v1 = require('./v1');

var app = express();
app.use('/v1', v1);

app.get('/', function(req, res) {
    res.end('Welcome to the API!')
});

var server = app.listen(8080, function() {
    var host = server.address().address;
    var port = server.address().port;

    console.log('API listening at http://%s:%s', host, port);
});