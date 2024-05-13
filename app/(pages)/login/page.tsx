"use client";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Box, Button, Divider, TextField, Typography } from "@mui/material";
import Link from "@/app/components/link/Link";
import SvgGoogle from "@/app/components/svg/google/SvgGoogle";
import SvgGithub from "@/app/components/svg/github/SvgGithub";

export default function Login() {
    const { status } = useSession();
    const router = useRouter();
    // const pathname = usePathname();

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
                background: '#D9D9D9',
                p: 1,
                borderRadius: 1,
            }}>
                <Box sx={{ mt: 1 }}>
                    {(error === "") ? (
                        <Typography fontSize={24}>
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
                    >
                        Sign up
                    </Link>
                </Typography>
                <Button
                    fullWidth
                    onClick={() => signIn("google")}
                    variant="contained"
                    sx={{
                        background: '#222222',
                        mt: 3
                    }}
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
                    sx={{
                        background: '#222222',
                        mt: 1
                    }}
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
                        id="password"
                        label="Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="******"
                        required
                        autoComplete="off"
                        sx={{ mt: 3 }}
                    />
                    <Button
                        fullWidth
                        type="submit"
                        variant="contained"
                        sx={{
                            background: '#222222',
                            mt: 3
                        }}
                    >
                        Log In
                    </Button>
                    {/* <Typography >
                        Don&apos;t have an account?{" "}
                        <Link
                            href="/create_account"
                            underline="none"
                            activeClassName="false"
                        >
                            Sign up
                        </Link>
                    </Typography> */}
                </form>
            </Box>
        </Box>
    );
}