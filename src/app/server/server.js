const express = require('express'),
    session = require('express-session')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const User = require('./model/user');

const url = 'mongodb://localhost/user';

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(session({
    secret: 'session-secret',
    saveUninitialized: true,
    resave: true
}));

app.get('/api/logout', (req, res) => {
    req.session.destroy();
    res.json({})
})

app.get('/api/user/session', async (req, res) => {
    console.log(req.session)
    await req.session.username ? res.status(200).send({ username: req.session.username, isAdmin: req.session.isAdmin }) : res.json({});
});

app.post('/api/user/login', (req, res) => {
    mongoose.connect(url, function (err) {
        if (err) throw err;
        User.find({
            username: req.body.username
        }, function (err, user) {

            if (err) throw err;

            if (user.length === 0) {
                return res.status(200).json({
                    error: 'No such user exists',
                    field: 'username'
                })
            }

            if (user[0].password !== req.body.password) {
                return res.status(200).json({
                    error: 'Wrong password',
                    field: 'password'
                })
            }

            req.session.username = user[0].name;
            req.session.isAdmin = user[0].permissions;

            return res.status(200).json({
                username: req.session.username, isAdmin: req.session.isAdmin
            })
        })
    });
})

app.listen(3000, () => console.log('Server running on port 3000!'))