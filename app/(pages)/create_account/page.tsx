"use client"
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Box, Typography } from "@mui/material";

export default function CreateAccount() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState("");
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/users', {
                name,
                email,
                password,
            });
            router.push('/');
        } catch (error) {
            if (error.response && error.response.status === 400) {
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
        <Box sx={{display: 'flex', justifyContent: 'center'}}>  
            <Box sx={{ color: 'white', width: '20ch' }}>
                <Typography >Create Account</Typography>
                <hr />
                <Typography sx={{ display: error === "" ? 'none' : 'block', color: error === "" ? '' : 'red' }}>{error}</Typography>
                <form onSubmit={handleSubmit}>
                    <Box >
                        <label htmlFor="name" >Name</label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                           
                        />
                    </Box>
                    <Box>
                        <label htmlFor="email" >Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            
                        />
                    </Box>
                    <Box>
                        <label htmlFor="password" >Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                         
                        />
                    </Box>
                    <button>Create User</button>

                </form>
            </Box>
        </Box>
    )
}