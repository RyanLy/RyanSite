require('newrelic');
var express = require('express');
var path = require('path');
var app  = express();
var smtpTransport = require("./js/mailer");
var favicon = require('serve-favicon');
const bodyParser = require('body-parser');
const { exec } = require('child_process');
const https = require('https');
const request = require('request')
var proxy = require('express-http-proxy');

app.use(bodyParser.json());
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

app.post('/start-minecraft', (req, res) => {
	const key = req.body.key;

	if (key === process.env.MINECRAFT_KEY) {
		exec('(cd ~/Aws-MC-Scripts && ./startMC.sh)', (err, stdout, stderr) => {
			console.log(err);
			console.log(stderr);
			console.log(stdout);

			res.send({
				success: true
			})
		});
	} else {
		res.send({
			success: false
		})
	}
});

app.post('/stop-minecraft', (req, res) => {
	const key = req.body.key;

	if (key === process.env.MINECRAFT_KEY) {
		exec('(cd ~/Aws-MC-Scripts && ./stopMC.sh)', (err, stdout, stderr) => {
			console.log(err);
			console.log(stderr);
			console.log(stdout);

			res.send({
				success: true
			})
		});
	} else {
		res.send({
			success: false
		})
	}
});

app.post('/new-minecraft', (req, res) => {
	const key = req.body.key;

	if (key === process.env.MINECRAFT_KEY) {
		exec('(cd ~/Aws-MC-Scripts && ./newWorld.sh)', (err, stdout, stderr) => {
			console.log(err);
			console.log(stderr);
			console.log(stdout);

			res.send({
				success: true
			})
		});
	} else {
		res.send({
			success: false
		})
	}
});

app.post('/minecraft-status', (req, res) => {
	const key = req.body.key;

	if (key === process.env.MINECRAFT_KEY) {
		exec(`ssh -t ubuntu@minecraft.ryanly.ca -o ConnectTimeout=3 'tmux send-keys -t Minecraft.0 "list" ENTER; sleep 0.1; tmux capture-pane -t Minecraft.0 -p | tail -2 | head -1 | pcregrep -o1 "There are (.*) of a max"'`, (err, stdout, stderr) => {
			console.log(stderr);

			console.log(`Online: ${stdout}`);

			res.send({
				success: true,
				online: stdout.trim()
			})
		});
	} else {
		res.send({
			success: false
		})
	}
});

// app.post('/toggle-lights', (req, res) => {
// 	const key = req.body.key;

// 	if (key === 'raspberry') {
// 		request.post('http://home.ryanly.ca:3000/toggle-lights', {}, () => {
// 			res.send({
// 				success: false
// 			});
// 		});
// 	}
// })
app.use('/proxy', proxy('home.ryanly.ca:3000', {
  filter: function(req) {
    return req.body.key == 'raspberry';
 	}
}));


app.listen(process.env.PORT || 7000)

console.log("Listening on port 7000");
