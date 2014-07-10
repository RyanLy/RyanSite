require('newrelic');
var express = require('express');
var app  = express();
var server = require('http').createServer(app);
var path = require('path');
var fs = require('fs');

eval(fs.readFileSync('./js/testData.ejs')+'');

app.use(express.static(path.join(__dirname, '/')));
app.use(express.static('./css'));
app.use(express.static('./js'));

app.set('view engine', 'html');

app.engine('.html', require('ejs').__express);

app.get('/', function(req, res) {
      res.render('index', {
    title: title,});
 });
app.get('/test', function(req, res) {
      res.render('users', {
    users: users,});
 });

tefsad


app.listen(process.env.PORT || 7000)

console.log("Listening on port 7000");
