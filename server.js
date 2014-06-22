var express = require('express');
var app = express();
var databaseUrl = 'mongodb://dev:angular@ds047107.mongolab.com:47107/getitrightdev';
var collections = ['active_users'];
var db = require('mongojs').connect(databaseUrl, collections);

//Getting Data
app.get('/heartbeat', function(req, res){
  db.active_users.find().toArray(function(err, results) {
      res.send(results);
      db.close();
  });
});


//Storing DATA
app.get('/store', function(req, res) {
  db.active_users.save({location : {long: 3232131, lat: 23123213}, last_updated: 20140726}, function(err, saved) {
    if( err || !saved ) {
      res.send("Location not saved");
    } else {
      res.send("Location saved");
    }
    db.close();
  });
});

var server = app.listen(3000, function() {
    console.log('Listening on port %d', server.address().port);
});