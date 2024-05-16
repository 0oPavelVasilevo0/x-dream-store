import React from 'react'
import { Typography, Box, Paper, ImageList, CircularProgress } from '@mui/material';
import useJokesData from '@/app/hooks/useJokesData';
import { useSession } from 'next-auth/react';

export default function JokesList() {

    const complexData = useJokesData()

    const { data: session, status } = useSession()

    if (complexData === null) {
        return <Box sx={{
            display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'
        }}>
            <CircularProgress />
        </Box >
    }
    return (
        <>
            {(status !== "authenticated") ?
                (
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        width: '50%'
                    }}>
                        <Typography sx={{ color: 'cyan' }}>
                            <span style={{ color: 'magenta' }}>{'if ( '}</span>
                            {complexData?.jokes[0].setup}
                            <span style={{ color: 'magenta' }}>{' )'}</span>
                        </Typography>
                        <Typography sx={{ color: 'lightgreen' }}>
                            <span style={{ color: 'magenta' }}>{'return ( '}</span>
                            {complexData?.jokes[0].punchline}
                            <span style={{ color: 'magenta' }}>{' )'}</span>
                        </Typography>
                    </Box>
                ) : (
                    <ImageList sx={{ width: '100%', height: '90%' }} cols={5}>
                        {complexData.jokes.map((jokes, index) => (
                            <Paper key={index} elevation={3} sx={{
                                textAlign: 'justify',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-around',
                                p: 1
                            }} >
                                <Typography sx={{ color: 'cyan' }}>
                                    <span style={{ color: 'magenta' }}>{'if ( '}</span>
                                    {jokes.setup}
                                    <span style={{ color: 'magenta' }}>{' )'}</span>
                                </Typography>
                                <Typography sx={{ color: 'lightgreen' }}>
                                    <span style={{ color: 'magenta' }}>{'return ( '}</span>
                                    {jokes.punchline}
                                    <span style={{ color: 'magenta' }}>{' )'}</span>
                                </Typography>
                            </Paper>
                        ))}
                    </ImageList>

                )}
        </>
    );
}
