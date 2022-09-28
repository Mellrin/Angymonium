const express = require('express'),
    router = express.Router();
const User = require('../model/user');
const Role = require('../model/role');
const bcrypt = require('bcrypt');

router.post('/create', async (req, res) => {

    try {
        const basicRole = await Role.findOne({ title: 'basic' }) || await Role.create({ title: 'basic' });

        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        const user = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
            role: basicRole._id
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

router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });

        if (user === null) {
            return res.status(404).json({
                error: 'No such email exists',
                field: 'email'
            })
        }

        const role = await Role.findById(user?.role?._id);

        if (await bcrypt.compare(req.body.password, user.password)) {
            req.session.username = user.username;
            req.session.isAdmin = role.title === 'admin';
            res.status(200).json({ username: req.session.username, isAdmin: role.title === 'admin' })
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

router.patch('/update', async (req, res) => {
    try {
        const user = await User.findOneAndUpdate({ username: req.body.username }, {
            role: req.body.role,
        }, { new: true });
        console.log(user)
        res.status(201).json(user);
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

module.exports = router