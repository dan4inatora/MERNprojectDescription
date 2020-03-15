const mongoose = require('mongoose');
const User = require('../models/usersmodel');
const passport = require('passport');

module.exports.register = (req, res, next) => {
    const {email, name, password, isAdmin} = req.body;
    const user = new User();
    user.name = name;
    user.password = password;
    user.email = email;
    user.isAdmin = isAdmin;
    user.save((err, doc)=>{
        if(!err){
            res.send(doc);
        }
        else{
            if(err.code == 11000){
                res.status(422).send('Duplicate email');
            }
            else{
                //res.send(err);
                return next(err);
            }
        }
    }) 
}

module.exports.login = async(req, res, next) => {
    passport.authenticate('local', async(err, user, info) => {
        if(err) {
            return res.status(400).json(err);
        }
        else if(user){
            const token = await user.generateJwt();
            return res.send({token})
        }
        else{
            return res.status(404).json(info);
        }
    })(req, res);
}



