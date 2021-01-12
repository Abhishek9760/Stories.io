const express = require('express');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const User = require('../models/user')
const Token = require('../models/token')
const crypto = require('crypto');
const mailer = require('../utils/Mail.js')

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

                if (!isMatch) return res.status(401).send({ error: 'Incorrect password'})
                if (!user.isVerified) return res.status(401).send({ error: 'Your account has not been verified.' })
                res.send({ user: user })
            })
        }
    })
})

router.post('/sign-in', jsonParser, async (req, res) => {
    await User.findOne({ email: req.body.email }, (err, user) => {
        if (user) return res.status(400).send({ error: 'Email already asscociated with an account' })

        user = new User({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        })

        user.save(err => {
            if (err) return res.status(500).send({ error: err.message })

            let token = new Token({
                _userId: user._id,
                token: crypto.randomBytes(16).toString('hex')
            });

            token.save(err => {
                if (err) return res.status(500).send({ error: err.message })

                success = mailer.sendMail(user.email, token.token, req.headers.host)
                if (typeof(success) === String) { return res.status(500).send({ errro: success }) }
                else return res.status(200).send({
                    success: `Verification mail sent to ${user.email}`
                })
            })
        })
    })
})

router.post('/resend')

module.exports = router;