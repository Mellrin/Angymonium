const express = require('express'),
    session = require('express-session')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./model/user');
const Role = require('./model/role');

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

const roleRoute = require('./routes/role')
const userRoute = require('./routes/user')
const questRoute = require('./routes/quest')

app.use('/api/roles', roleRoute)

app.use('/api/user', userRoute)

app.use('/api/quest', questRoute)

app.get('/api/user/logout', (req, res) => {
    req.session.destroy();
    res.json({})
})

app.get('/api/user/session', async (req, res) => {
    console.log(req.session)
    await req.session.username ? res.status(200).send({ username: req.session.username, isAdmin: req.session.isAdmin }) : res.json({});
});

app.get('/api/users', async (req, res) => {
    try {
        const users = await User.find().populate('role').exec();
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

app.listen(3000, () => console.log('Server running on port 3000!'))