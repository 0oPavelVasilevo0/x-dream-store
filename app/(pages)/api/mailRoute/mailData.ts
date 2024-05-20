'use server';
import nodemailer from 'nodemailer';
import { render } from '@react-email/render';
import { MailContent } from '@/app/components/mailContent/MailContent';

interface Request {
    method: string;
    body: string; // Тело запроса в формате JSON
}

export async function postHandler(req: Request): Promise<{ success: boolean; message: string }> {
    const { method, body } = req;

    if (method === 'POST') {
        // Распарсить тело запроса
        const parsedBody = JSON.parse(body);
        const { userEmail, products } = parsedBody;
        const keyMail = process.env.NEXT_MAIL_KEY;
        const Mail = process.env.NEXT_MAIL;

        // Лог значения для отладки
        console.log('Parsed Body:', parsedBody);
        console.log('User Email:', userEmail);

        // Проверяем наличие userEmail
        if (!userEmail) {
            throw new Error('User email is not defined');
        }

        // Создаем транспорт для отправки писем
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: Mail,
                pass: keyMail,
            },
        });

        // Генерируем HTML содержимое письма
        const mailContentHTML = render(MailContent(products));
        // Опции отправки письма
        const mailOptions = {
            from: Mail,
            to: userEmail,
            subject: 'Your Order',
            // html: htmlContent,
            html: mailContentHTML,
        };

        // Возвращаем Promise, который разрешается после отправки письма
        return new Promise((resolve, reject) => {
            // Отправляем письмо
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.error(error);
                    reject({ success: false, message: 'Failed to send email' });
                } else {
                    console.log('Email sent: ' + info.response);
                    resolve({ success: true, message: 'Email sent successfully' });
                }
            });
        });
    } else {
        // Если метод запроса не POST, возвращаем ошибку
        throw new Error(`Method ${method} Not Allowed`);
    }
}