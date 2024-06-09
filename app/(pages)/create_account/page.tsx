'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from "next/navigation";
import { Box, Button, Divider, Paper, TextField, Typography } from "@mui/material";
import Link from "@/app/components/link/Link";

export default function CreateAccount() {
    const [step, setStep] = useState(1); // Step 1: enter email, Step 2: enter verification code, Step 3: create account
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [verificationCode, setVerificationCode] = useState('');
    const [isSending, setIsSending] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [error, setError] = useState('');
    const [countdown, setCountdown] = useState(0); // 15 minutes in seconds
    const router = useRouter();

    const handleEmailSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSending(true);
        setSuccessMessage('');
        setError('');
        try {
            const response = await axios.post('/api/users-create', { email });
            console.log(response.data);
            if (response.status === 200) {
                // Обработка успешного ответа
                // Display the message
                setSuccessMessage(response.data.message);
                const expirationTime = new Date(response.data.expiresAt).getTime();
                const currentTime = new Date().getTime();
                const remainingTime = Math.floor((expirationTime - currentTime) / 1000);
                setCountdown(remainingTime);
                // setTimeout(() => {
                //     setStep(2);
                //     setSuccessMessage('');
                // }, 5000); // Show message for 5 seconds before switching steps
            } else {
                // Обработка ошибки
                setError(response.data.message);
            }
        } catch (error: any) {
            setError(error.response.data.message);
        } finally {
            setIsSending(false);
        }
    };

    const handleVerificationSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSuccessMessage('');
        setIsSending(true);
        setError('');
        try {
            const response = await axios.post('/api/users-verif', {
                name,
                email,
                password,
                verificationCode,
            });
            console.log(response.data);
            if (response.status === 201) {
                // Обработка успешного ответа
                setSuccessMessage(response.data.message);
                // setTimeout(() => {
                //     router.push('/login');
                // }, 5000);
            } else {
                // Обработка ошибки
                setError(response.data.message || 'Failed to create user.');
            }
        } catch (error: any) {
            setError(error.response?.data?.message);
        }
        finally {
            setIsSending(false);
        }
    };

    useEffect(() => {
        let timer: number;
        if (countdown > 0) {
            timer = window.setInterval(() => {
                setCountdown((prevCountdown) => {
                    if (prevCountdown <= 1) {
                        clearInterval(timer);
                        setStep(1);
                        setError('Verification code expired. Please request a new code.');
                        return 0;
                    }
                    return prevCountdown - 1;
                });
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [countdown]);

    const nextStep = () => {
        if (step === 1) {
            setStep(2);
            setSuccessMessage('');
        } else if (step === 2) {
            router.push('/login');
        }
    };

    const TimerCode = (
        <>
            {countdown > 0 && (
                <>
                    <Typography sx={{ mt: 2 }} >
                        code expires in<span style={{ color: 'red', fontSize: 18, fontWeight: 'bold' }}> {Math.floor(countdown / 60)}:{('0' + (countdown % 60)).slice(-2)}</span>
                    </Typography>
                    <Typography
                        component={Button}
                        sx={{ color: 'cyan', fontSize: 12 }}
                        onClick={() => { setStep(1) }}
                    >
                        return to enter email
                    </Typography>
                    <Typography fontSize={12} sx={{ color: 'cornflowerblue' }}>
                        didn't receive the code? check the entered email address
                    </Typography>
                    
                </>
            )}
        </>
    )

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
                <Box sx={{ bgcolor: error ? 'red' : null, borderRadius: error ? 1 : null, padding: error ? '6px 16px' : null }}>
                    {(error === "") ? (
                        <Box sx={{ display: 'flex', flexDirection: 'column', }}>
                            <Typography variant="button" fontSize={20} sx={{ color: 'cyan' }} >
                                create
                            </Typography>
                            <Typography variant="button" fontSize={12} >
                                account
                            </Typography>
                        </Box>
                    ) : (
                        <Typography variant="button" fontSize={14} sx={{ color: 'white' }}>
                            {error}
                        </Typography>)}
                </Box>
                <Divider sx={{ display: error ? 'none' : null }} />
                <Typography variant="button" fontSize={12} >
                    do You have an account?{" "}
                    <Link
                        href="/login"
                        underline="none"
                        activeClassName="false"
                        sx={{ color: 'cyan', fontSize: 16 }}
                    >
                        LOG IN
                    </Link>
                </Typography>
                {successMessage === '' ? (
                    <>
                        {step === 1 && (
                            <form onSubmit={handleEmailSubmit}>
                                <TextField
                                    fullWidth
                                    size="small"
                                    color="warning"
                                    type="email"
                                    id="email"
                                    label="Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    autoComplete="off"
                                    sx={{ mt: 4 }}
                                />
                                <Button
                                    fullWidth
                                    type="submit"
                                    variant="contained"
                                    color="warning"
                                    disabled={isSending}
                                    sx={{ mt: 3 }}
                                >
                                    {isSending ? 'Sending Code...' : 'Send Verification Code'}
                                </Button>
                            </form>
                        )}
                        {step === 2 && (
                            <>
                                {TimerCode}
                                <form onSubmit={handleVerificationSubmit}>
                                    <TextField
                                        fullWidth
                                        size="small"
                                        color="warning"
                                        type="text"
                                        id="verificationCode"
                                        label="Verification Code"
                                        value={verificationCode}
                                        onChange={(e) => setVerificationCode(e.target.value)}
                                        required
                                        autoComplete="off"
                                        sx={{ mt: 1 }}
                                    />
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
                                        disabled={isSending}
                                    >
                                        {isSending ? 'Creating a User...' : 'Create User'}
                                    </Button>
                                </form>
                            </>
                        )}
                    </>
                ) : (
                    <Box sx={{ mt: 2 }}>
                        <>
                            {step === 1 && countdown > 0 && (TimerCode)}
                        </>
                        <Typography
                            variant="button"
                            fontSize={14}
                            sx={{ color: 'yellow' }}
                        >
                            {successMessage}
                        </Typography>
                        <Button
                            fullWidth
                            variant='contained'
                            color='warning'
                            sx={{ mt: 1 }}
                            onClick={nextStep}
                        >
                            Next
                        </Button>
                    </Box>
                )}
            </Box>
        </Box>
    )
}
