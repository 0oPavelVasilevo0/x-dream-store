import { render } from '@react-email/render';
import nodemailer from 'nodemailer';
import { MailVerifCode } from '../components/mailVerifCode/MailVerifCode';

// Функция для отправки письма с верификационным кодом
export async function sendVerificationEmail(email: string, verificationCode: string): Promise< string| void | null> {
    const keyMail = process.env.NEXT_MAIL_KEY;
    const Mail = process.env.NEXT_MAIL;
    const transporter = nodemailer.createTransport({

        service: 'gmail',
        auth: {
            user: Mail,
            pass: keyMail,
        },

    });

    const mailVerifCodeHTML = render(MailVerifCode(verificationCode));

    const mailOptions = {
        from: Mail,
        to: email,
        subject: 'Verification Code',
        html: mailVerifCodeHTML,
    };


    // await transporter.sendMail(mailOptions);

    // return new Promise<string | null>((resolve, reject) => {
    //     transporter.sendMail(mailOptions, (error, info) => {
    //         if (error) {
    //             console.error("Error sending email:", error);
    //             reject(error);
    //         } else {
    //             console.log('Email sent: ' + info.response);
    //             resolve(info.response);
    //         }
    //     });
    // });
    return new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error("Error sending email:", error);
                return reject(new Error('Failed to send verification email.'));
            }
            if (info.rejected.length > 0) {
                console.error("Email rejected by the server:", info.rejected);
                return reject(new Error('Failed to deliver verification email.'));
            }
            console.log('Email sent: ' + info.response);
            resolve();
        });
    });

  
}