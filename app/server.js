var express = require('express');
var app = express();
var uid = require('uid');
var databaseUrl = 'mongodb://dev:angular@ds047107.mongolab.com:47107/getitrightdev';
var collections = ['active_users'];
var db = require('mongojs').connect(databaseUrl, collections);

//Getting Data
app.get('/api/active-users', function(req, res) {
  var now = new Date().valueOf(),
    criteria = new Date(now - 5 * 60 * 60000);

  db.active_users.find({'last_updated': {'$gte': criteria}}).toArray(function(err, results) {
      res.send(results.map(function(item, i) {
        return {long: item.coords.long, lat: item.coords.lat};
      }));
  });
});

//Storing DATA
app.get('/api/heartbeat', function(req, res) {
  var data = {
      id: req.query.id,
      coords: {
        long: req.query.long,
        lat: req.query.lat
      },
      last_updated: new Date()
    };

  if (data.id) {
    db.active_users.update({id: data.id}, data, callback);
  } else {
    data.id = uid();
    db.active_users.save(data, callback); 
  }

  function callback(err, saved) {
    if (err || !saved) {
      res.send('Couldnt proceed');
    } else {
      res.send(data.id);
    }
  }
});

var server = app.listen(3030, function() {
    console.log('Listening on port %d', server.address().port);
});