import  nodemailer from 'nodemailer';
import {EmailRequirement} from '@/interfaces/emailInterface'


const emailTransporter =(mailOptions:EmailRequirement)=>{
    let transporter = nodemailer.createTransport({
        service: process.env.SERVICE,
        host: process.env.HOST,
        secure: true,
        auth: {
            user: process.env.EMAIL_USERNAME, 
            pass: process.env.EMAIL_PASSWORD 
        },
        tls: {
            rejectUnauthorized: false
          }
    });

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.error('Error occurred:', error);
        }
    });
}

export const sendMail = (payload:EmailRequirement)=>{
let mailOptions = {
    from: process.env.EMAIL_SENDER || payload.from,
    to: payload.to,
    subject:payload.subject,
    text: payload.text,
    html: payload.template || ''
};

emailTransporter(mailOptions)
}


