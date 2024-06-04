"use client";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Box, Button, CircularProgress, Divider, Paper, TextField, Typography } from "@mui/material";
import Link from "@/app/components/link/Link";
import SvgGoogle from "@/app/components/svg/google/SvgGoogle";
import SvgGithub from "@/app/components/svg/github/SvgGithub";

export default function Login() {
    const { status } = useSession();
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSignIn = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        signIn("credentials", { email, password, redirect: false }).then(async (response) => {
            if (response?.error) {
                setError("Invalid email/password")
            } else {
                router.push("/");
            }
        })
    };
    if (status === "authenticated") {
        router.push("/");
    }

    return (
        <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            height: '100vh',
            minHeight: '560px'
        }}
        >
            {(status === 'loading' || status === 'authenticated') ? (
                <Box>
                    <CircularProgress />
                </Box>
            ) : (
                <>
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
                                        log in
                                    </Typography>
                                        <Typography variant="button" fontSize={12} >
                                        to your account
                                    </Typography>
                                </Box>
                            ) : (
                                        <Typography variant="button" fontSize={14} sx={{ color: 'white' }}>
                                    {error}
                                </Typography>)}
                        </Box>
                            <Divider sx={{ display: error ? 'none' : null }} />
                            <Typography variant="button" fontSize={12} >
                            Don&apos;t have an account?{" "}
                            <Link
                                href="/create_account"
                                underline="none"
                                activeClassName="false"
                                sx={{ color: 'cyan', fontSize: 16 }}
                            >
                                SIGN UP
                            </Link>
                        </Typography>
                        <Button
                            fullWidth
                            onClick={() => signIn("google")}
                            variant="contained"
                            color="inherit"
                            sx={{ mt: 4 }}
                            startIcon={<SvgGoogle />}
                        >
                            <Typography ml={4} textTransform={'none'}>
                                Sign in with Google
                            </Typography>
                        </Button>
                        <Button
                            fullWidth
                            onClick={() => signIn("github")}
                            variant="contained"
                            color="inherit"
                            sx={{ mt: 2 }}
                            startIcon={<SvgGithub />}
                        >
                            <Typography ml={4} textTransform={'none'}>
                                Sign in with GitHub
                            </Typography>
                        </Button>
                        <Divider sx={{ mt: 3 }}>
                            or
                        </Divider>
                        <form onSubmit={handleSignIn}>
                            <TextField
                                fullWidth
                                size="small"
                                color="warning"
                                id="email"
                                label="Email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="John@example.com"
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
                                placeholder="******"
                                required
                                autoComplete="off"
                                sx={{ mt: 2 }}
                            />
                            <Button
                                fullWidth
                                type="submit"
                                variant="contained"
                                color="warning"
                                sx={{
                                    mt: 3
                                }}
                            >
                                Log In
                            </Button>
                        </form>
                    </Box>
                </>
            )}
        </Box>
    );
}