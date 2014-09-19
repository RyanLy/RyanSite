require('newrelic');
var express = require('express');
var path = require('path');
var app  = express();
var smtpTransport = require("./js/mailer");

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
			if (email != ""){
				if (email.indexOf("@") > -1 ){
					res.send("Thank you " + name + " for your message!\nA verification email will be sent to " + email);
					var mailOptions = {
					    from: "Ryan Ly<ryan@ryanly.ca>", // sender address
					    to: email, // list of receivers
					    subject: "Verification Email", // Subject line
					    text: "Thank you for your message. This is an email to verify your message to Ryan.\nMessage: \"" + message + "\"", // plaintext body
					}
					smtpTransport.sendMail(mailOptions, function(error, response){
					    if(error){
					        console.log(error);
					    }else{
					        console.log("Message sent: " + response.message);
					    }
					});
				}
				else{
					res.send("Please use a valid email!");
				}
			}
			else{
    			res.send("Thank you " + name + " for your message!");
			}
			var mailOptions = {
			    from: "Ryan Ly<ryan@ryanly.ca>", // sender address
			    to: "ryan@ryanly.ca", // list of receivers
			    subject: "Website Message", // Subject line
			    text: name + " says, \"" + message + "\"", // plaintext body
			}
			smtpTransport.sendMail(mailOptions, function(error, response){
			    if(error){
			        console.log(error);
			    }else{
			        console.log("Message sent: " + response.message);
			    }
			});
    	}
});

app.listen(process.env.PORT || 7000)

console.log("Listening on port 7000");
