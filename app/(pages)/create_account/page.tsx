"use client"
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Box, Button, Divider, TextField, Typography } from "@mui/material";
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
            <Box sx={{
                width: '36ch',
                alignItems: 'center',
                textAlign: 'center',
                // background: '#D9D9D9',
                // p: 1,
                // borderRadius: 1,
                // boxShadow: '0px 0px 20px -8px',
            }}>
                <Box sx={{ mt: 1 }}>
                    {(error === "") ? (
                        <Typography variant="h6" fontSize={24} sx={{ color: 'cyan' }} >
                            Create Aсcount
                        </Typography>
                    ) : (
                        <Typography sx={{ color: 'red' }}>
                            {error}
                        </Typography>)}
                </Box>
                <Divider />
                <Typography >
                    Do you have an account?{" "}
                    <Link
                        href="/login"
                        underline="none"
                        activeClassName="false"
                        sx={{ color: 'cyan' }}
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
                        sx={{ mt: 5 }}
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
                        sx={{ mt: 3 }}
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
                        sx={{ mt: 3 }}
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
