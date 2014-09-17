require('newrelic');
var express = require('express');
var path = require('path');
var app  = express();

app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, '/public')));

app.set('view engine', 'html');
app.engine('.html', require('ejs').__express);

app.get('/', function(req, res) {
      res.render('index');
 });

app.listen(process.env.PORT || 7000)

console.log("Listening on port 7000");
