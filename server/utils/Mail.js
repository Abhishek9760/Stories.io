
const nodemailer = require('nodemailer');

function sendMail (email, token, host) {
    
    const mailPayload = `<h1 align="center">Welcome to <br /><span style="font-size: 1.5em" >Stories.io</span></h1><hr /><p align="center">Click on the button below to verify Your Email</p><div style="display: flex; justify-content: center;"><a style="text-decoration: none; color: black; border: 2px solid black; padding: 0.5em 1em; margin: 0 auto; text-align: center;" href=http:\/\/${host}\/confirmation\/${token}?email=${email} ">Verify Email</a></div>`

    const transporter = nodemailer.createTransport({
        host: 'smtp.mail.yahoo.com',
        port: 587,
        secure: false,
        auth: {
            user: process.env.MAIL_USERNAME,
            pass: process.env.MAIL_PASSWORD    
        }
    });

    const mailOptions = {
        from: 'stories.io@yahoo.com',
        to: email,
        subject: 'Account Verification Token',
        html: mailPayload
    };

    transporter.sendMail(mailOptions, (err, info) => {
        if (err) { return err.message }
        else return true;
    })
}

module.exports = { sendMail };