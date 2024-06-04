import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcryptjs';
import { createUserWithAccount } from '@/app/utils/user';
import prisma from '@/lib/prisma'; // Import Prisma client

export const POST = async (req: NextRequest) => {
    try {
        const { name, email, password, verificationCode } = await req.json();

        // Проверка верификационного кода
        const verificationEntry = await prisma.verificationCode.findUnique({
            where: { email },
        });

        if (!verificationEntry || verificationEntry.code !== verificationCode || verificationEntry.expiresAt < new Date()) {
            return NextResponse.json({
                message: "Invalid or expired verification code.",
            }, { status: 400 });
        }

        if (password.length < 10) {
            return NextResponse.json({
                message: "Password must be at least 10 characters long.",
            }, { status: 400 });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await createUserWithAccount({
            name,
            email,
            password: hashedPassword,
        });

        // Удаление использованного верификационного кода
        await prisma.verificationCode.delete({
            where: { email },
        });

        return NextResponse.json({
            message: "User created! Now login:",
            data: {
                ...newUser
            }
        }, { status: 201 });

    } catch (err) {
        return NextResponse.json({
            message: "Error",
            err
        }, { status: 500 });
    }
}
