require('newrelic');
var express = require('express');
var path = require('path');
var app  = express();
var smtpTransport = require("./js/mailer");
var favicon = require('serve-favicon');

app.use(favicon(__dirname + '/public/favicon.ico'));
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, '/public')));

app.set('view engine', 'html');
app.engine('.html', require('ejs').__express);

app.get('/', function(req, res) {
      res.render('index');
 });

app.post('/message', 
	function(req, res) {
		name = req.param('name');
		message = req.param('message');
		email = req.param('email');

		if (name == "" || message == ""){
			res.send(405,err);
		}
		else{
			var mailOptions = {
			    from: "Ryan Ly<ryan@ryanly.ca>", // sender address
			    to: "ryan@ryanly.ca", // list of receivers
			    subject: "Website Message", // Subject line
			    text: name + "(" + email + ") " + " says, \"" + message + "\"", // plaintext body
			}
			smtpTransport.sendMail(mailOptions, function(error, response){
			    if(error){
			        console.log(error);
			        res.send("There was an error with sending your message!");
			    }else{
			        console.log("Message sent: " + response.message);
			        res.send("Thank you " + name + " for your message!");
			    }
			});
    	}
});

app.listen(process.env.PORT || 7000)

console.log("Listening on port 7000");
