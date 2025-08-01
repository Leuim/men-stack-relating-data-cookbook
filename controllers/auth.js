const express = require('express')
const router = express.Router()
const User = require('../models/user.js')
const bcrypt = require('bcrypt')

router.get('/sign-up', async (req, res) => {
    res.render('auth/sign-up.ejs')
})

router.post('/sign-up', async (req, res) => {
    const userInDatabase = await User.findOne({ username: req.body.username });
    if (userInDatabase) {
        return res.send("Username already taken.");
    }

    if (req.body.password !== req.body.confirmPassword) {
        return res.send('Please enter a matching password!')
    }

    const hashedPassword = bcrypt.hashSync(req.body.password, 10);
    req.body.password = hashedPassword;

    const user = await User.create(req.body)
    res.send(`Thanks for signing up ${user.username}`)
})

router.get('/sign-in', async (req, res) => {
    res.render('auth/sign-in.ejs')
})

router.post('/sign-in', async (req, res) => {
    const userInDatabase = await User.findOne({ username: req.body.username });
    if (!userInDatabase) {
        return res.send("Login failed. Please try again.");
    }
    const validPassword = bcrypt.compareSync(
        req.body.password,
        userInDatabase.password
    );
    if (!validPassword) {
        return res.send("Login failed. Please try again.");
    }

    req.session.user = {
        _id:userInDatabase._id,
        username: userInDatabase.username,
    };

    res.redirect("/");
})

router.get('/sign-out', async(req,res)=>{
    req.session.destroy()
    res.redirect('/')
})

module.exports = router