const nodemailer = require("nodemailer")
const {
    MAIL_KEY, MAIL
} = process.env;

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: MAIL,
        pass: MAIL_KEY
    }
})


transporter.verify().then(() => {
    console.log("Ya se pueden mandar mails!!!!")
})

module.exports = transporter