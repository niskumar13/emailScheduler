var schedule = require('node-schedule');
var nodemailer = require('nodemailer');
var config = require('../config/config.json');


var smtpTransport = nodemailer.createTransport(config.smptUrl);

function callTransporter(emailData) {
    console.log("sending mail")
    smtpTransport.sendMail(emailData, function (error, info) {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: ' + info.response);
    });
}

function subscriptionMail(emailData) {

    var mailOptions = {
        from: '"Subscription Mail" <'+config.senderMailId+'>',
        to: emailData.email,
        subject: 'some subject',
        text: 'some message',
        html: '<b>blablabla</b>'
    };

    var sendingTime = new Date(emailData.time);

    var rule = new schedule.RecurrenceRule();
    rule.hour = sendingTime.getHours();
    rule.minute = sendingTime.getMinutes();

    //region of code where I setup scheduled email. 

    var j = schedule.scheduleJob(rule, function () {
        console.log('Sending reminder Email.', sendingTime);
        if(emailData.callTransporter){
            callTransporter(mailOptions);
        }
    });
}


module.exports = {
    subscriptionMail:subscriptionMail
}
