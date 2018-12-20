const express = require('express');
// for concurrency
var bodyParser = require("body-parser");
var config = require('./config');
var async = require('async');
var fs = require('fs');

// Db
var getPoints = require("./Db/getPoints");
// // var log = require('./libs/log')(module);

// create node.js (express) server:
// =================================
const app = express();
app.set('port', config.get('port'));
// deal with Access-Control-Allow-Origin bag on client request
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});
//return main page to front
app.use('/home', function(req, res) {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    var index = fs.readFileSync('./front/index.html');
    res.end(index);
});
//use request from front-end (through connection to db)
app.use('/get-points', function(req, res) {
    getPoints(function(data) {
        var newdata = data.bTrackDocuments;
        console.log("data is fetched from Db (1-st object): " + JSON.stringify(newdata[0]));
        res.json(newdata);
    });
});

app.listen(app.get('port'), () => {
    console.log('Server(main-server) started on port ' + app.get('port'));
});