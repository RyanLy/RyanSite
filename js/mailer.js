var nodemailer = require("nodemailer");


var smtpTransport = nodemailer.createTransport("SMTP",{
    service: "Zoho",
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD
    }
});

module.exports = smtpTransport