var mongoose = require("mongoose");

var commentSchema = mongoose.Schema({
    username: String,
    email: String,
    rating:Number,
    feedback: String
    
});

module.exports = mongoose.model("feedback", commentSchema);