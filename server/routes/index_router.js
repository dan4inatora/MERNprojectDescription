const userController = require('../controllers/usercontroller');
const commentscontoller = require('../controllers/commentscontoller');
const userEditController = require('../controllers/userEditController');
const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();

router.post('/register', userController.register);
router.post('/login', userController.login);
router.post('/comment', authenticate, commentscontoller.comment);
router.post('/edit', authenticate, userEditController.edit);

function authenticate(req, res, next){
    const bearerHeader = req.headers['authorization'];
    const token = bearerHeader && bearerHeader.split(' ')[1];
    if(token == null) return res.sendStatus(401);
    jwt.verify(token, process.env.SECRET, (err, user) => {
        if(err) return res.sendStatus(403);
        req.user = user;
        next();
    })
}

module.exports = router;