"use client"
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Box, Button, Divider, Paper, TextField, Typography } from "@mui/material";
import Link, { NextLinkComposed } from "@/app/components/link/Link";

export default function CreateAccount() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState("");
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/users', {
                name,
                email,
                password,
            });
            router.push('/login');
        } catch (error: any) {
            if (error.response.status === 400) {
                // Handle 400 Bad Request (email already exists)
                setError("Email already exist");
            } else {
                // Handle other errors
                console.log("Error creating user with account: ", error.response);
                setError("An error occurred");
            }
        }
    }


    return (
        <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            height: '100vh',
            minHeight: '460px'
        }}
        >
            <Box component={Paper} elevation={6} sx={{
                width: '34ch',
                alignItems: 'center',
                textAlign: 'center',
                p: 1,

            }}>
                <Box sx={{ bgcolor: error ? 'red' : null, borderRadius: error ? 0.5 : null }}>
                    {(error === "") ? (
                        <Typography variant="h6" fontSize={22} sx={{ color: 'cyan' }} >
                            Create Aсcount
                        </Typography>
                    ) : (
                        <Typography variant="h6" fontSize={22} sx={{ color: 'white' }}>
                            {error}
                        </Typography>)}
                </Box>
                <Divider />
                <Typography fontSize={14} >
                    Do you have an account?{" "}
                    <Link
                        href="/login"
                        underline="none"
                        activeClassName="false"
                        sx={{ color: 'cyan', fontSize: 16 }}
                    >
                        Log in
                    </Link>
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        size="small"
                        color="warning"
                        id="name"
                        label="Name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        autoComplete="off"
                        sx={{ mt: 4 }}
                    />
                    <TextField
                        fullWidth
                        size="small"
                        color="warning"
                        id="email"
                        label="Email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        autoComplete="off"
                        sx={{ mt: 2 }}
                    />
                    <TextField
                        fullWidth
                        size="small"
                        color="warning"
                        id="password"
                        label="Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        autoComplete="off"
                        sx={{ mt: 2 }}
                    />
                    <Button
                        fullWidth
                        type="submit"
                        variant="contained"
                        color="warning"
                        sx={{ mt: 3 }}
                    >
                        Create User
                    </Button>
                </form>
                {/* <Divider sx={{ my: 2 }}>
                    or
                </Divider>
                <Button
                    fullWidth
                    component={NextLinkComposed}
                    to="/login"
                    variant="outlined"
                    color="inherit"
                >
                    Log in to your account
                </Button> */}
            </Box>
        </Box>
    )
}
