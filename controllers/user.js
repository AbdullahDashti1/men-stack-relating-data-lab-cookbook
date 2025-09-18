const express = require('express');
const router = express.Router();
const User = require('../models/user.js');

router.get('/', async (req, res) => {
    const users = await User.find();
    res.render('user/index.ejs', { users });
});

router.get('/:id', async (req, res) => {
    const otherUser = await User.findById(req.params.id);
    res.render('user/show.ejs', { otherUser });
});

module.exports = router;
