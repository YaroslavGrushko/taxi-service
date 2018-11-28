const express = require('express');
// for concurrency
var cluster = require('cluster');
var bodyParser = require("body-parser");
var config = require('./config');
// var log = require('./libs/log')(module);

// if (cluster.isMaster) {
//     var numWorkers = require('os').cpus().length;

//     console.log('Master(main-server) cluster setting up ' + numWorkers + ' workers...');

//     for (var i = 0; i < numWorkers; i++) {
//         cluster.fork();
//     }

//     cluster.on('online', function(worker) {
//         console.log('Worker(main-server) ' + worker.process.pid + ' is online');
//     });

//     cluster.on('exit', function(worker, code, signal) {
//         console.log('Worker(main-server) ' + worker.process.pid + ' died with code: ' + code + ', and signal: ' + signal);
//         console.log('Starting a new worker(main-server)');
//         cluster.fork();
//     });
// } else {
// create node.js (express) server:
// =================================
const app = express();
app.set('port', config.get('port'));

// use body Parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Post requests:
// handle post request from c-server (clients generator)
app.post('/make-order', function(req, res) {
    var order = JSON.parse(req.body.js_code);
    console.log("order received from c-server to server = " + JSON.stringify(order));

    // send order to t-server (taxis - srever)>>>
    var sendOrderToTaxi = require("./sendOrderToTaxi");
    // place order (form order)
    var placeOrder = require("./placeOrder");
    placeOrder(order, sendOrderToTaxi);
    // <<<<<<<<<<<<<<<<<< send order to t-server

    // make response
    res.end("ok");
});
// handle post request from t-server (taxis-server)
app.post('/order-executed', function(req, res) {
    var js_code = JSON.parse(req.body.js_code);
    // get taxiID, review and order data from request
    var taxiID = js_code.taxiID;
    var review = js_code.review;
    var order = js_code.order;

    console.log("(FINAL RECEIVING) order received from t-server to server = " + order);
    console.log("taxiID: " + taxiID + "\n + review: " + review + "\n order: " + JSON.stringify(order));
    // write to Db datails of executed order
    // var execOrderToDb = require("./Db/execOrderToDb");
    // execOrderToDb(taxiID, review, order);
    // make response
    res.end("ok");
});

app.listen(app.get('port'), () => {
    console.log('Server(main-server) started on port ' + app.get('port'));
    console.log('Process(main-server) ' + process.pid + ' is listening to all incoming requests on port ' + app.get('port'));
});
// ================================================

// let's start our system from c-server.js start-point:
var START = require("./clients/c-server");
START();
// }