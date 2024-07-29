'use client'
import { customTheme } from '@/app/theme/theme';
import { AppBar, Box, Tab, Tabs, Typography, useMediaQuery } from '@mui/material';
import React, { useState } from 'react'
import Images from '../images/Images';
import JokesList from '../jokesList/JokesList';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 0 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function DisplayHome() {

    const [value, setValue] = useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };


    const isSmallScreen = useMediaQuery(customTheme.breakpoints.down('lg'))
    const isExtraSmallScreen = useMediaQuery(customTheme.breakpoints.down('md'))
    const isUltraSmallScreen = useMediaQuery(customTheme.breakpoints.down('sm'))
    const isXUltraSmallScreen = useMediaQuery(customTheme.breakpoints.down('xs'))
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            width: isXUltraSmallScreen ? '100%' : isUltraSmallScreen ? '49ch' : isExtraSmallScreen ? '56ch' : isSmallScreen ? '89ch' : '120ch',
            // justifyContent: isSmallScreen ? 'center' : 'center',
            pt: 12,
            px: isXUltraSmallScreen ? 1 : null
        }}
        >
        <AppBar position='fixed' color='inherit' sx={{top: '80px'}}>
            <Box sx={{
                // width: 140,
                // m: isExtraSmallScreen ? 0.5 : 2,
                borderBottom: 0,
                borderColor: 'divider',
            }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab sx={{
                        p: isSmallScreen ? 1 : 2,
                        // m: isSmallScreen ? 'auto' : '0'
                    }}
                        label="Space Images" {...a11yProps(0)} />
                    <Tab sx={{
                        p: isSmallScreen ? 1 : 2,
                        // m: isSmallScreen ? 'auto' : '0'
                    }}
                        label="Jokes" {...a11yProps(1)} />
                </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
                <Images />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
                <JokesList />
            </CustomTabPanel>
        </AppBar>
        </Box>
    )
}
