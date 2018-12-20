const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const f = require('util').format;
var config = require('../config');
var fs = require('fs');
// Read the certificate authority
const ca = [fs.readFileSync("sslkey/rootCA.pem")];
const cert = fs.readFileSync("sslkey/mongodb.pem");

function getPoints(callback) {
    // Connection URL
    const url = config.get('my-mongo:mongo-url');
    // Database Name
    const dbName = config.get('my-mongo:dbName');

    // Use connect method to connect to the server
    MongoClient.connect(url, {
        server: {
            sslValidate: false,
            sslCA: ca,
            sslCert: cert
        }
    }, function(err, client) {
        if (err) {
            console.log(err);
        } else {
            // callback
            console.log("Connected successfully to server from getPoints.js");
        }
        const db = client.db(dbName)
            // authentification
            // db.authenticate(user, password, function(err, res) {
            // var a = res;
            // Get the documents collection
        const collection = db.collection('tracks');
        // $match: { ClientsShardingField: 1 }
        //get one item randomly
        collection.aggregate([
            { $sample: { size: 1 } }
        ]).toArray(function(err, docs) {
            if (err) {
                console.log("find error!");
                return
            }
            client.close();
            // console.log("*** FINDED data from MongoDb (p1): " + JSON.stringify(docs[0]) + " ***");
            console.log("*** FINDED data from MongoDb ***");
            callback(docs[0]);
        });
        // });
    });
}

module.exports = getPoints;