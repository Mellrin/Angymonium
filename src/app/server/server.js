const express = require('express'),
    session = require('express-session')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./model/user');

const url = 'mongodb://localhost/wunderbase';

mongoose.connect(url, { useNewUrlParser: true })
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to database'))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(session({
    secret: 'session-secret',
    saveUninitialized: true,
    resave: true
}));

app.get('/api/user/logout', (req, res) => {
    req.session.destroy();
    res.json({})
})

app.get('/api/user/session', async (req, res) => {
    console.log(req.session)
    await req.session.username ? res.status(200).send({ username: req.session.username, isAdmin: req.session.isAdmin }) : res.json({});
});

app.post('/api/user/login', async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username });

        if (user === null) {
            return res.status(404).json({
                error: 'No such user exists',
                field: 'username'
            })
        }

        if (await bcrypt.compare(req.body.password, user.password)) {
            req.session.username = user.username;
            res.status(200).json({ username: req.session.username })
        } else {
            return res.status(401).json({
                error: 'Wrong password',
                field: 'password'
            })
        }
        
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

app.post('/api/user/signup', async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        const user = new User({
            username: req.body.username,
            password: hashedPassword
        })
        const newUser = await user.save();
        req.session.username = req.body.username;
        res.status(201).json(newUser)
    } catch (err) {
        if (err.code === 11000) {
            res.status(400).json({
                error: 'Such user already exists',
                field: Object.keys(err.keyPattern)[0]
            })
        } else {
            res.status(400).json({ message: err.message })
        }
    }
})

app.get('/api/users', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})


app.listen(3000, () => console.log('Server running on port 3000!'))