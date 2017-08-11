var express = require('express');
var app =express();
var path = require('path');
var request = require('superagent');
var fs = require('fs');

app.use(express.static(path.join(__dirname, 'build')));

app.use('/build', express.static(path.join(__dirname + '/build')));
app.use('/static', express.static(path.join(__dirname + '/build/static')));
var filepath = path.join(__dirname, '/build/videoplayback.mp3');

// app.get('/api/audio',function(req, res){
//       request
//      .get('https://s3.ap-south-1.amazonaws.com/observeai/videoplayback.mp3')
//      .end(function(err, response){
//        if (err || !response.ok) {
//          return res.send({"alert":"Oh no! error"});
//        } else {
//           return res.send(response.body);
//        }
//      });
//   })
app.get('/api/audio', function(req, res){
    res.set({'Content-Type': 'audio/mpeg'});
    var readStream = fs.createReadStream(filepath);
    readStream.pipe(res);
})

app.get('/',function(req,res){
	res.sendFile(path.join(__dirname+'/build/index.html'));
});


var server = app.listen('8000',function(){
	console.log('Server Running on port',server.address().port);
});