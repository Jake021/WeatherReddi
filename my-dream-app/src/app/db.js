// db.js

// mongodb driver

// import {db, dbName, collectionName} from './server';

const MongoClient = require("mongodb").MongoClient;

const dbConnectionUrl = "mongodb+srv://admin:badresume69@cluster0.zox4n.mongodb.net/WeatherReddi?retryWrites=true&w=majority";

function initialize(
    dbName,
    dbCollectionName,
    successCallback,
    failureCallback
) {
    MongoClient.connect(dbConnectionUrl, function(err, dbInstance) {
        if (err) {
            console.log(`[MongoDB connection] ERROR: ${err}`);
            failureCallback(err); // this should be "caught" by the calling function
        } else {
            const dbObject = dbInstance.db(dbName);
            const dbCollection = dbObject.collection(dbCollectionName);
            console.log("[MongoDB connection] SUCCESS");

            successCallback(dbCollection);
        }
    });
}

module.exports = {
    initialize
};


// << db init >>
const db = require("./db");
const dbName = "weatherReddi";
const collectionName = "profiles";

db.initialize(dbName, collectionName, function(dbCollection) { // successCallback
    // get all items
    dbCollection.find().toArray(function(err, result) {
        if (err) throw err;
          console.log(result);
    });

    // << db CRUD routes >>

}, function(err) { // failureCallback
    throw (err);
});


// var mongodb= require('mongodb');
// var MongoClient= mongodb.MongoClient;
// var URL = "mongodb+srv://admin:badresume69@cluster0.zox4n.mongodb.net/WeatherReddi?retryWrites=true&w=majority";

// var db;
// var error;
// var waiting = []; // Callbacks waiting for the connection to be made

// MongoClient.connect(URL,function(err,database){
//   error = err;
//   db = database;

//   waiting.forEach(function(callback) {
//     callback(err, database);
//   });
// });

// module.exports = function(callback) {
//   if (db || error) {
//     callback(error, db);
//   } else {
//     waiting.push(callback);
//   }
// }

// var db = require('./db');

// router.post('/',function(req,res,next){
//   username=req.body.username;
//   password=req.body.password;

//   db.conn(function(err, database) {
//     if (err) {
//       res.sendStatus(500);
//       console.log(err);
//       return;
//     }

//     database.collection('profiles').findOne({'Extreme':username}, function(err, docs){
//       console.log('here');
//     });
//   });
// });

