import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/lib/prisma";
import bcrypt from 'bcryptjs';
import { SessionOptions } from "next-auth";

const GoogleProvider = require("next-auth/providers/google").default;
const GitHubProvider = require("next-auth/providers/github").default;
const CredentialsProvider = require("next-auth/providers/credentials").default;

interface Credentials {
    email: string;
    password: string;
}

export const options = {
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

                //chek in db
                const user = await prisma.user.findUnique({

                    where: {
                        email: email,
                    },
                });

                if (!user) return null;//доподнительная проверка

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
