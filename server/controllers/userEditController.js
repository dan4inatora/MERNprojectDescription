const mongoose = require('mongoose');
const User = require('../models/usersmodel');

module.exports.edit = (req, res, next) => {
    const email = req.user.email;
    const{newname, newpassword} = req.body;
    User.findOne({email}, function(err, user){
        if(err) res.send('Email not registered');
        else{
            if(password != undefined){
                user.password = newpassword;
            }
            if(newname != undefined){
                user.name = newname;
            }
            user.save();
            res.send(user);
        }
    })
}