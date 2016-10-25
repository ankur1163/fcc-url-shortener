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

app.post("/process", function (request, response) {
  MongoClient.connect(mongo_url,function(err,db){
    if(err){
      console.log("there is error connecting mongodb");
    }
    else{
      console.log("All went well with mongodb");
      var rno = Math.floor(Math.random()*89999+10000);
      var short_url = "https://fcc-url-shortener-63.herokuapp.com/"+rno;
      var data = {
          url: request.query.url,
          urltogo: short_url
      }
      var insertedId = db.collection('url').insert(data);
      response.status(200).send({
        short_url: short_url
      });
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
