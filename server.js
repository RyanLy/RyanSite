require('newrelic');
var express = require('express');
var app  = express();
var path = require('path');

app.use(express.static(path.join(__dirname, '/')));
app.use(express.static('./css'));
app.use(express.static('./js'));

app.set('view engine', 'html');

app.engine('.html', require('ejs').__express);

app.get('/', function(req, res) {
      res.render('index');
 });

app.listen(process.env.PORT || 7000)

console.log("Listening on port 7000");
