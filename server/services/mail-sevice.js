const nodemailer = require('nodemailer')

class MailService {
    constructor() {
        this.transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD,
            },
        })
    }

    async sendActivationMail(to, link) {
        await this.transporter.sendMail(
            {
                from: process.env.SMTP_USER,
                to,
                subject: 'Activation account' + process.env.API_URL,
                text: '',
                html: `
            <div>
                <h1>Для активации перйдите по ссылке</h1>
                <a href="${link}">${link}</a>
            </div>`,
            },
            (error, info) => console.log(error, info)
        )
    }
}

module.exports = new MailService()
