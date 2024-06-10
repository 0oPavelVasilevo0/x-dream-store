import { createUserWithAccount, getUserByEmail } from '@/app/utils/user';  // Import user-related utilities
import bcrypt from 'bcryptjs'; // Import bcryptjs instead of bcrypt
import { NextRequest, NextResponse } from "next/server";

// export const POST = async (req: NextRequest, res: NextResponse) => {                     //res?
export const POST = async (req: NextRequest) => {
    try {
        const { name, email, password } = await req.json();

        // Check if the email already exists in the database
        const existingUser = await getUserByEmail(email);
        if (existingUser) {
            return NextResponse.json({
                message: "Email is already in use.",
            }, { status: 400 });
        }

        // Check if the password has at least 10 characters
        if (password.length < 10) {
            return NextResponse.json({
                message: "Password must be at least 10 characters long.",
            }, { status: 400 });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt); // Salt round of 10

        // Create the new user if the email doesn't exist
        const newUser = await createUserWithAccount({
            name,
            email,
            password: hashedPassword, // Use the hashed password
        });

        return NextResponse.json({
            message: "User created",
            data: {
                ...newUser
            }
        }, { status: 201 })

    } catch (err) {
        return NextResponse.json({
            message: "Error",
            err
        }, { status: 500 });
    }
}
