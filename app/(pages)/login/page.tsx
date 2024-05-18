"use client";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Box, Button, Divider, TextField, Typography, useTheme } from "@mui/material";
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
            <Box sx={{
                width: '36ch',
                alignItems: 'center',
                textAlign: 'center',
                // bgcolor: '#121212',
                // bgcolor: 'inherit',
                // boxShadow: '0px 0px 20px -8px',
                // p:2,
                // borderRadius: 1,
            }}>
                <Box>
                    {(error === "") ? (
                        <Typography variant="h6" fontSize={24} sx={{ color: 'cyan' }} >
                            Log in to your account
                        </Typography>
                    ) : (
                        <Typography sx={{ color: 'red' }}>
                            {error}
                        </Typography>)}
                </Box>
                <Divider />
                <Typography >
                    Don&apos;t have an account?{" "}
                    <Link
                        href="/create_account"
                        underline="none"
                        activeClassName="false"
                        sx={{ color: 'cyan' }}
                    >
                        Sign up
                    </Link>
                </Typography>
                <Button
                    fullWidth
                    onClick={() => signIn("google")}
                    variant="contained"
                    // color="info"
                    color="inherit"
                    sx={{mt: 5}}
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
                    // color="info"
                    color="inherit"
                    sx={{mt: 2}}
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
                            // background: '#222222',
                            mt: 3
                        }}
                    >
                        Log In
                    </Button>
                </form>
            </Box>
        </Box>
    );
}