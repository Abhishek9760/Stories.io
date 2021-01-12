const express = require('express');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const User = require('../models/user')
const Token = require('../models/token')
const mailer = require('../utils/Mail.js')

const router = express.Router();

//Mail-confirmation get req
router.get('/confirmation/:token', jsonParser, (req, res, next) => {
    Token.findOne({ token: req.params.token }, (err, token) => {
        if (!token) return res.status(400).send({ error: 'Unable to find a valid token,. token may have expired..' })

        User.findOne({ _id: token._userId, email: req.query.email }, (err, user) => {
            if (!user) return res.status(400).send({ err: 'Unable to find a user for this token.' })

            if (user.isVerified) return res.status(400).send({err: 'User Already verified'})

            user.isVerified = true;
            user.save(err => {
                if (err) return res.status(500).send({err: err.message})
                res.status(200).send("The account has been verified")
            })
        })
    })
})

//Resend Mail by generating new token
router.post('/resend-token', jsonParser, (req, res, next) => {
    User.findOne({ email: req.body.email }, (err, user) => {
        if (!user) return res.status(400).send({ error: 'Unable to find the user' });

        if (user.isVerified) return res.status(400).send({ error: 'Email already verified' });

        const token = new Token({ _userId: user._id, token: crypto.randomBytes(16).toString('hex') });

        token.save(err => {
            if (err) return res.status(500).send({ error: err.message })

            success = mailer.sendMail(user.email, token.token, req.headers.host)

            if (typeof(success) === String) { return res.status(500).send(success) }
            else return res.status(200).send({
                success: `Verification mail sent to ${user.email}`
            })

        })

    })
})

module.exports = router;