const express = require('express');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const User = require('../models/user')

const router = express.Router();

router.post('/login', jsonParser, async (req, res) => {
    await User.findOne({
        username: req.body.username,
    }).then(user => {
        if(!user) res.send({
            error: 'User not found'
        })
        else {
            user.comparePassword(req.body.password, (err, isMatch) => {
                if (err) res.send({ error: err })
                if (isMatch) res.send({ user: user })
                else res.send({ error: 'Incorrect password'})
            })
        }
    })
})

router.post('/sign-in', jsonParser, async (req, res) => {
    
    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    })

    await user.save()
        .then(() => {
            res.send({
                message: "Account created"
            })
        })
        .catch(error => {
            res.send({
                message: error
            })
        })
})


module.exports = router;