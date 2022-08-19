const nodemailer = require("nodemailer")


const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: "informacion.jobhub@gmail.com",
        pass: "ekhzsepibehdvxfj"
    }
})


transporter.verify().then(() => {
    console.log("Ya se pueden mandar mails!!!!")
})

module.exports = transporter