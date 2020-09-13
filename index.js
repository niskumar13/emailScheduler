//############################################################################################
let express = require('express');
let config = require('./config/config.json');
let app = express();

// ###########################################################################################
let bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//################################ DB CONNECTION #############################################
let mongoose = require('mongoose');
mongoose.connect(config.mongoUrl+config.dbName, { useNewUrlParser: true, useUnifiedTopology: true});
var db = mongoose.connection;
if(!db)
    console.log("Error connecting db");
else
    console.log("Db connected successfully");

//############################## TEST API #####################################################
app.get('/', (req, res, next) => {res.send('Hello World')});

//################################ ROUTES #####################################################

let Routes= require("./router/emailScheduler");
app.use('/api', Routes);


// #################################### ERROR HANDLING ########################################
process.on('unhandledRejection', (reason, p) => {
    console.log(reason, 'Unhandled Rejection at Promise', p);
  }).on('uncaughtException', err => {
    console.log(err, 'Uncaught Exception thrown');
    // process.exit(1);
  });

//################################ SERVER LISTINING ON PORT ####################################

var port = process.env.PORT || config.port;
app.listen(port, function () {
    console.log("server running on port " + port);
    let emailSchedulerController = require('./controller/emailSchedulerController');
    emailSchedulerController.reload();
});
// #############################################################################################