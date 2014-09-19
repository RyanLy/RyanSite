var nodemailer = require("nodemailer");


var smtpTransport = nodemailer.createTransport("SMTP",{
    service: "Zoho",
    auth: {
        user: "ryan@ryanly.ca",
        pass: process.env.EMAIL_PASSWORD
    }
});

module.exports = smtpTransport