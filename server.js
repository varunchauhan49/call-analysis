var express = require('express');
var app =express();
var path = require('path');
var request = require('superagent');
var fs = require('fs');

app.use(express.static(path.join(__dirname, 'build')));

app.use('/build', express.static(path.join(__dirname + '/build')));
app.use('/static', express.static(path.join(__dirname + '/build/static')));
var filepath = path.join(__dirname, '/build/videoplayback.mp3');

// This route will return Audio file.
app.get('/api/audio', function(req, res){
    res.set({'Content-Type': 'audio/mpeg'});
    var readStream = fs.createReadStream(filepath);
    readStream.pipe(res);
})

// This route will serve the index.html
app.get('/',function(req,res){
	res.sendFile(path.join(__dirname+'/build/index.html'));
});

//Server listening on port 8000
var server = app.listen('8000',function(){
	console.log('Server Running on port',server.address().port);
});