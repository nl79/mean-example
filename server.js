/**
 * Created by nazarlesiv on 9/23/15.
 */
var express = require('express'),
    stylus = require('stylus'),
    logger = require('morgan'),
    bodyParser = require('body-parser'),
    port = 3030;

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var app = express();

function compile(str, path) {
    return stylus(str).set('filename', path);
}

app.set('views', __dirname + '/server/views');
app.set('view engine', 'jade');
app.use(logger('dev'));
app.use(stylus.middleware( {
    src: __dirname + '/public',
    compile: compile
}));

//setup the static route handler
app.use(express.static(__dirname + '/public'));

//default handler - a catchall route.
app.get('*', function(req, res) {
    res.render('index');
});

app.listen(port);
console.log('Listening on port ' + port + '...');

