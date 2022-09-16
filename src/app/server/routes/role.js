const express = require('express'),
router = express.Router();
const Role = require('../model/role');

router.get('/', async (req, res) => {
    try {
        const roles = await Role.find();
        res.json(roles);
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

module.exports = router