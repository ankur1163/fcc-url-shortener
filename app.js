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

app.get('/:url_id', function(req, res){
  var url_id= req.params.url_id;
  console.log(req.params);
  MongoClient.connect(mongo_url,function(err,db){
    if(err){
      console.log("there is error connecting mongodb");
    }
    else{
      db.collection('url').findOne({url_id: ~~url_id}, function(err,doc){
        if(err) throw err;
        console.log(err);
        console.log(doc);
        res.redirect(doc.url);
      });
    }
  });
});

app.post("/process", function (request, response) {
  MongoClient.connect(mongo_url,function(err,db){
    if(err){
      console.log("there is error connecting mongodb");
    }
    else{
      console.log("All went well with mongodb");
      var rno = Math.floor(Math.random()*89999+10000);
      var regex = /(https?:\/\/(?:www\.|(?!www))[^\s\.]+\.[^\s]{2,}|www\.[^\s]+\.[^\s]{2,})/gi;
      var short_url = 'http://localhost:5000/' + rno;
      if(regex.test(request.query.url)) {
          var data = {
            url: request.query.url,
            url_id: rno
        }
        var insertedId = db.collection('url').insert(data);
        response.status(200).send({
          short_url: short_url
        });
      } else {
        response.send(422).send({
          error: 'Please provide valid url like http://example.com'
        });
      }
      
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
