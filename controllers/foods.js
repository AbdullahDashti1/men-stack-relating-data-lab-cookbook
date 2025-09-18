const express = require('express');
const router = express.Router({ mergeParams: true });
const User = require('../models/user.js');

router.get('/', async (req, res) => {
    const user = await User.findById(req.params.userId);
    res.render('foods/index.ejs', { user });
});

router.get('/new', (req, res) => {
    res.render('foods/new.ejs', {
        user: req.session.user
    });
});

router.post('/', async (req, res) => {
    const user = await User.findById(req.params.userId);
    user.pantry.push(req.body);
    await user.save();
    res.redirect(`/users/${user._id}/foods`);
});

router.get('/:itemId/edit', async (req, res) => {
    const user = await User.findById(req.params.userId);
    const food = user.pantry.id(req.params.itemId);
    res.render('foods/edit.ejs', {
        user, food
    });
});

router.put('/:itemId', async (req, res) => {
    const user = await User.findById(req.params.userId);
    const food = user.pantry.id(req.params.itemId);
    food.set(req.body);
    await user.save();
    res.redirect(`/users/${user._id}/foods`);
});

router.delete('/:itemId', async (req, res) => {
    const user = await User.findById(req.params.userId);
    user.pantry.id(req.params.itemId).deleteOne();
    await user.save();
    res.redirect(`/users/${user._id}/foods`);
});

module.exports = router;
