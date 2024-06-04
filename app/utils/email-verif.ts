import { render } from '@react-email/render';
import nodemailer from 'nodemailer';
import { MailVerifCode } from '../components/mailVerifCode/MailVerifCode';

interface NodemailerError extends Error {
    response?: string;
    responseCode?: number;
    command?: string;
}
// Функция для отправки письма с верификационным кодом
export async function sendVerificationEmail(email: string, verificationCode: string): Promise<string | void> {
    const keyMail = process.env.NEXT_MAIL_KEY;
    const Mail = process.env.NEXT_MAIL;
    const transporter = nodemailer.createTransport({

        service: 'gmail',
        auth: {
            user: Mail,
            pass: keyMail,
        },

    });
    // const mailContentHTML = render(MailContent(products));
    const mailVerifCodeHTML = render(MailVerifCode(verificationCode));

    const mailOptions = {
        from: Mail,
        to: email,
        subject: 'Verification Code',
        // text: `Your verification code is: ${verificationCode}`,
        html: mailVerifCodeHTML
    };

    // await transporter.sendMail(mailOptions);


    try {
        await transporter.sendMail(mailOptions);
    } catch (error) {
        const nodemailerError = error as NodemailerError;
        if (nodemailerError.response) {
            throw new Error(nodemailerError.response);
        }
        throw error;
    }
}