var express = require('express');
var mongodb = require('mongodb');
var path = require('path');

var MongoClient = mongodb.MongoClient;

var mongo_url =  process.env.MONGOLAB_URI || "mongodb://ankur1163:lightbulb1@ds013946.mlab.com:13946/ank1163";

var app = express();
app.use(express.static(path.join(__dirname, 'views')));

app.listen(process.env.PORT || 5000);
app.get("/",function(req,res){
  res.render("\views\index.html")
})

app.get("/process",function(req,res){
Mongoclient.connect(mongo_url,function(err,db){
  if(err){
    console.log("there is error connecting mongodb");
  }
  else{
    console.log("All went well with mongodb");
  }
})



});

/*

app.get('/', function(req, res){
    MongoClient.connect(mongo_url, function (err, db) {
        // do inserts and quering here ...
        if(err) {
          throw err
        }
        var data = {
            name: 'Vinay',
            bio: 'web dev'
        }
        var insertedId = db.collection('demo').insert(data); // this is sync version of insertion
        db.collection('demo').findOne({name: 'Vinay'}, function(error, doc){
            if(error) throw error;
            res.send(doc);
        });
        db.collection('demo').update({name: 'Vinay'},{$set: {bio: 'web developer'}}, function(error, doc){
            if(error) throw error;
            console.log(doc);
        });

    });
});
*/
