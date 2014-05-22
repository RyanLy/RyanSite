var express = require('express');
var app  = express();
var server = require('http').createServer(app);
var path = require('path');

app.use(express.static(path.join(__dirname, '')));
app.use(express.static('./css'));
app.use(express.static('./js'));


app.get('/', function(req, res) {
    res.sendfile('./index.htm');
 });

app.listen(process.env.PORT || 7000)

console.log("Listening on port 7000");