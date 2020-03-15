const mongoose = require('mongoose');
const Comment = require('../models/commentmodel');


module.exports.comment = (req, res, next) => {
    const {title, text} = req.body;
    const comment = new Comment();
    console.log(req.user);
    comment.sender = req.user.name;
    comment.title = title;
    comment.text = text;
    comment.save((err, doc) => {
        if(!err){
            res.send(doc);
        }
    })
}