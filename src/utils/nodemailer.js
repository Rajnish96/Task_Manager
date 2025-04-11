const nodemailer = require('nodemailer');
const { EMAIL_USERNAME, EMAIL_PASSWORD } = require('../config/env');

let transport = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: EMAIL_USERNAME,
        pass: EMAIL_PASSWORD,
    },
})

const getMailOptions = (receiver, subject, text) => {
    return {
        from: EMAIL_USERNAME,
        to: receiver,
        subject: subject,
        html: text,
    }
}

const sendEmail = (mailOptions) => {
    transport.sendMail(mailOptions, function (err, info) {
        if (err) {
            console.log(err)
        } else {
            console.log(info)
        }
    })
}

const sendReminderEmail = (user, task) => {
    const htmlText = `
      <p>Hello ${user.name},</p>
      <p>This is a reminder that your task <strong>"${task.title}"</strong> is due on <strong>${task.dueDate}</strong>.</p>
      <p>Don't forget to complete it!</p>
    `;

    const mailOptions = getMailOptions(
        user.email,
        '⏰ Task Reminder!',
        htmlText
    );

    sendEmail(mailOptions);
};

module.exports = {
    sendReminderEmail,
};