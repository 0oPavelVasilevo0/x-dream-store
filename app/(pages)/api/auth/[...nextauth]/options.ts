// import GoogleProvider from "next-auth/providers/google";
// import GitHubProvider from "next-auth/providers/github";
// import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/lib/prisma";
import bcrypt from 'bcryptjs';
import { SessionOptions } from "next-auth";
// import { SessionStrategy } from "next-auth";
const GoogleProvider = require("next-auth/providers/google").default;
const GitHubProvider = require("next-auth/providers/github").default;
const CredentialsProvider = require("next-auth/providers/credentials").default;

interface Credentials {
    email: string;
    password: string;
}

// type AuthProvider = ReturnType<typeof GoogleProvider> | ReturnType<typeof GitHubProvider> | ReturnType<typeof CredentialsProvider>;

export const options = {
// export const options: {
//     adapter: any; // Присваивает тип вашего адаптера
//     providers: AuthProvider[]; // Замените any на тип ваших провайдеров
//     session: SessionStrategy; // Указывает тип для сессии
//     pages: { signIn: string };
// } = {
    adapter: PrismaAdapter(prisma) as any,
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        GitHubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
        }),
        CredentialsProvider({
            type: "credentials",
            credentials: {
                email: {
                    label: "Email",
                    type: "email",
                    placeholder: "hello@example.com",
                },
                password: {
                    label: "Password",
                    type: "password",
                    placeholder: '**********'
                },
            },
            async authorize(credentials: Credentials) {
                const { email, password } = credentials;
                // const user = {
                //     id: "39",
                //     name: "Pipin",
                //     email: "pipin@examle.com",
                //     password: "12345"
                // }

                //chek in db
                const user = await prisma.user.findUnique({

                    where: {
                        email: email,
                    },
                });

                if (!user) return null;//доподнительная проверка

                // const hashedPassword =  user?.password;
                const hashedPassword = (user as unknown as { password: string }).password;
                // Compare the plain-text password with the hashed password
                const passwordMatch = await bcrypt.compare(password, hashedPassword);

                if (passwordMatch) {
                    return user;
                } else {
                    return null;
                }

            },
        }),
    ],
    session: {
        strategy: "jwt",
        // jwt: true
    } as Partial<SessionOptions>, // явное указание на тип SessionOptions, 
    //if you use client-side login:
    pages: {
        signIn: "/login",
    },
};
