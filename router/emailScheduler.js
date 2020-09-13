let router = require('express').Router();

router.get('/', function (req, res) {
    res.json({
        status: 'API Its Working',
        message: 'Welcome to emailScheduler!',
    });
});

var emailSchedulerController = require('../controller/emailSchedulerController');


router.route('/emailSchedulers')
    .get(emailSchedulerController.index)
    .post(emailSchedulerController.new);

module.exports = router;