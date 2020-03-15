const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    sender:{
        type:String
    },
    title:{
        type:String
    },
    text:{
        type:String
    }
})

const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;