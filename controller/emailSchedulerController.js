var EmailScheduler = require('../model/emailScheduler');
var helper = require('../helperFunction/helper');

exports.index = function (req, res) {
    EmailScheduler.get(function (err, emailScheduler) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json({
            status: "success",
            message: "emailScheduler retrieved successfully",
            data: emailScheduler
        });
    });
};

exports.new = function (req, res) {
    var emailScheduler = new EmailScheduler();
    if(req.body.email && req.body.time){

        emailScheduler.email = req.body.email;
        emailScheduler.time = req.body.time;
        emailScheduler.isActive = true;
        emailScheduler.createdAt = new Date();

        emailScheduler.save(function (err) {
            if (err)
                res.json(err);
            else
                helper.subscriptionMail(emailScheduler);
                res.json({
                    message: 'New emailScheduler created!',
                    data: emailScheduler
                });
        });
    }
    else
    {
        res.json({
            message: 'ERROR: email and time are required ',
            data: req.body
        })

    }
};

exports.reload =function(){
    
    EmailScheduler.get(function (err, emailSchedulerData) {
        if (err) {
            console.log("error in rescheduling previous mailer");
        }else{
            if(emailSchedulerData.length){
                console.log("reloading..........")
                emailSchedulerData.forEach(element => {
                    var newElement = element;
                    newElement.callTransporter = false;
                    helper.subscriptionMail(newElement);
                    
                });
                console.log("completed")
            }else{
                console.log("No data to reload")
            }
            
        }
        
    });
};















