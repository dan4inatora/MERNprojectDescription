const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    email:{ 
        type: String,
        required : 'Email can\'t be empty',
        unique : true,
        match : [/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Invalid email']
    },
    name:{
        type: String,
        required: 'Name can\'t be empty'
    },
    password:{
        type: String,
        required: 'Password can\'t be empty',
        minlength: [6, 'Password should be at least 6 characters']
    },
    isAdmin:{
        type: Boolean
    }
});

userSchema.path('password').validate((val) => {
    let regexExp = /.*[0-9].*/;
    return regexExp.test(val);
},'Password should contain atleast one number');

userSchema.pre('save', async function(next){
    const user = this;
    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password, 10);
    }
    next();
})

userSchema.methods.verifyPass = async function(password){
    return await bcrypt.compare(password, this.password);
}

userSchema.methods.generateJwt = async function(){
    const user = this;
    const token = jwt.sign({user}, process.env.SECRET, {expiresIn : "45m"});
    return token;

}

const User = mongoose.model('User', userSchema);
module.exports = User;