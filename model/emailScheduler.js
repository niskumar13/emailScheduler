
var mongoose = require('mongoose');

var emailSchedulerSchema = mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    time: {
        type: Date,
        required: true
    },
    isActive:{
        type: Boolean,
        required: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, { versionKey: false });
 
var emailScheduler = module.exports = mongoose.model('emailScheduler', emailSchedulerSchema);
module.exports.get = function (callback, limit) {
    emailScheduler.find(callback).limit(limit);
}