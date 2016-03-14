// Init helpers, auxiliaries, supporting procedures.
require('./lib/lib').init();
var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var app = express();

var AppConfig = {
    version: '1',
    baseUrl: '/',
    ssl: false,
    cors: false,
    post: {
        jsonBody: true
    }
};

var routesEnabled = [
    'info'
];

// For POST requests
if(AppConfig.post.jsonBody) {
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
}

if (AppConfig.cors) {
    app.use(function(req, res, next) {
        res.set({
            'Access-Control-Allow-Origin': 'https://www.domain.dev',
            'Access-Control-Allow-Methods': 'GET, POST',
            'Access-Control-Allow-Credentials': true,
            // Not accepted by IE!!!
            //'Access-Control-Allow-Headers': ['Accept', 've-api-key', 'VE-User-Hash', 'VE-Api-Key', 'Content-Type']
            'Access-Control-Allow-Headers': 'Accept, api-key, User-Hash, Api-Key, Content-Type'
        });
        next();
    });
}


routesEnabled.forEach(function(route) {
    app.use(require('./routes/' + route));
});

var server;
if(AppConfig.ssl) {
    var https = require('https');
    var privateKey  = fs.readFileSync('sslcert/key.pem', 'utf8');
    var certificate = fs.readFileSync('sslcert/cert.pem', 'utf8');
    server = https.createServer({
        key: privateKey,
        cert: certificate
    }, app);
} else {
    server = require('http').createServer(app);
}

server.listen(3000, function() {
    var host = server.address().address;
    var port = server.address().port;
    console.log('App.(' + AppConfig.version +
        ') started. Listening on port %s.', port);
});