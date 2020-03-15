require('dotenv').config();
require('./models/db');
require('./config/passportConfig')
const routesIndex = require('./routes/index_router')


const express = require('express');
const app = express();
const cors = require('cors');
const passport = require('passport');

app.use(express.json());
app.use(passport.initialize());
app.use('/', routesIndex);

//global error handler
app.use((err, req, res, next) => {
    if (err.name === 'ValidationError') {
        var valErrors = [];
        Object.keys(err.errors).forEach(key => valErrors.push(err.errors[key].message));
        res.status(422).send(valErrors)
    }
    else{
        console.log(err);
    }
});

app.listen(process.env.PORT || 3000, () => console.log(`Listening on PORT : ${process.env.PORT}`));