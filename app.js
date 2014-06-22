var MongoClient = require('mongodb').MongoClient
    , format = require('util').format;

  MongoClient.connect('mongodb://wordsmith:angular@ds027509.mongolab.com:27509/getitright', function(err, db) {
    if(err) throw err;

    var collection = db.collection('active_users');

    collection.find().toArray(function(err, results) {
      console.dir(results);
      db.close();
    });
  })

//mongodb://<dbuser>:<dbpassword>@ds027509.mongolab.com:27509/getitright