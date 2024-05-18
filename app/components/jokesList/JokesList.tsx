import React from 'react'
import { Typography, Box, Paper, ImageList, CircularProgress, useMediaQuery } from '@mui/material';
import useJokesData from '@/app/hooks/useJokesData';
import { useSession } from 'next-auth/react';
import { customTheme } from '@/app/theme/theme';

export default function JokesList() {

    const complexData = useJokesData()

    const { data: session, status } = useSession()

    const isSmallScreen = useMediaQuery(customTheme.breakpoints.down('lg'));
    const isExtraSmallScreen = useMediaQuery(customTheme.breakpoints.down('md'));
    const isUltraSmallScreen = useMediaQuery(customTheme.breakpoints.down('sm'));
    const isXUltraSmallScreen = useMediaQuery(customTheme.breakpoints.down('xs'));

    if (complexData === null) {
        return <Box sx={{
            display: 'flex', justifyContent: 'center', alignItems: 'center', height: isExtraSmallScreen ? '100%' : '80%'
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
                        width: '100%'
                    }}>
                        <Typography sx={{ color: 'cyan', fontSize: '30px', }}>
                            <span style={{ color: 'magenta' }}>{'if ( '}</span>
                            {complexData?.jokes[0].setup}
                            <span style={{ color: 'magenta' }}>{' )'}</span>
                        </Typography>
                        <Typography sx={{ color: 'lightgreen', fontSize: '30px' }}>
                            <span style={{ color: 'magenta' }}>{'return ( '}</span>
                            {complexData?.jokes[0].punchline}
                            <span style={{ color: 'magenta' }}>{' )'}</span>
                        </Typography>
                    </Box>
                ) : (
                    <ImageList sx={{ width: '100%', height: '90%' }} cols={isXUltraSmallScreen ? 2 : isUltraSmallScreen ? 3 : isExtraSmallScreen ? 4 : 5}>
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
