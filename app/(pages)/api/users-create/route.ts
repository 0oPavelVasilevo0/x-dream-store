import { NextRequest, NextResponse } from "next/server";
import { getUserByEmail } from '@/app/utils/user';
import { sendVerificationEmail } from '@/app/utils/email-verif';
import { generateVerificationCode } from '@/app/utils/code-verif';
import prisma from '@/lib/prisma'; // Import Prisma client

export const POST = async (req: NextRequest) => {
    try {
        const { email } = await req.json();

        const existingUser = await getUserByEmail(email);
        if (existingUser) {
            return NextResponse.json({
                message: "Email is already in use.",
            }, { status: 400 });
        }

        const verificationCode = generateVerificationCode();
        const expiresAt = new Date();
        expiresAt.setMinutes(expiresAt.getMinutes() + 5); // Код истекает через 5 минут

        // Сохранение верификационного кода в базе данных
        await prisma.verificationCode.create({
            data: {
                email,
                code: verificationCode,
                expiresAt,
            },
        });

    //    Schedule a background task to remove expired codes after 15 minutes.
        setTimeout(async () => {
            await prisma.verificationCode.deleteMany({
                where: {
                    expiresAt: {
                        lte: new Date(), // Delete codes whose expiration time is less than or equal to the current time
                    },
                },
            });
        }, 5 * 60 * 1000); // 5 minutes in milliseconds
        
        try {
            await sendVerificationEmail(email, verificationCode);
            return NextResponse.json({
                message: "Verification code sent to email!",
                expiresAt: expiresAt.toISOString(), // Send expiration time to the client
            }, { status: 200 });
        } catch (error) {
            console.error('Failed to send verification email:', error);
            await prisma.verificationCode.deleteMany({
                where: {
                    email: email,
                },
            });
            return NextResponse.json({
                message: "Failed to send verification email.",
            }, { status: 500 });
        }

    } catch (err) {
        return NextResponse.json({
            message: "Error",
            err
        }, { status: 500 });
    }
}
