const nodemailer = require('nodemailer')

class MailService {
    constructor() {
        this.transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: 'dzianiskarpiuk@gmail.com',
                pass: 'baymgscsvrqcmyvf',
            },
        })
    }

    async sendActivationMail(to, link) {
        await this.transporter.sendMail({
            from: 'dzianiskarpiuk@gmail.com',
            to,
            subject: 'Activation account' + process.env.API_URL,
            text: '',
            html: `
            <div>
                <h1>Для активации перйдите по ссылке</h1>
                <a href="${link}">${link}</a>
            </div>`,
        })
    }
}

module.exports = new MailService()
