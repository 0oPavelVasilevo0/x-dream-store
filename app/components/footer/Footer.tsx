'use client'
import { customTheme } from '@/app/theme/theme';
import { AppBar, Box, Divider, Link, MenuItem, MenuList, Toolbar, Typography, useMediaQuery } from '@mui/material'
import React from 'react'

export default function Footer() {
    const isSmallScreen = useMediaQuery(customTheme.breakpoints.down('lg'));
    const isExtraSmallScreen = useMediaQuery(customTheme.breakpoints.down('md'));
    const isUltraSmallScreen = useMediaQuery(customTheme.breakpoints.down('sm'));
    const isXUltraSmallScreen = useMediaQuery(customTheme.breakpoints.down('xs'));
    return (
        <AppBar position="static" color="primary" sx={{ top: 'auto', bottom: 0, alignItems: isXUltraSmallScreen ? undefined : 'center' }}>
            <Toolbar sx={{
                width: isXUltraSmallScreen ? '100%' : isUltraSmallScreen ? '49ch' : isExtraSmallScreen ? '56ch' : isSmallScreen ? '89ch' : '120ch',
                display: 'flex',
                gap: isUltraSmallScreen ? '1ch' : isExtraSmallScreen ? '2ch' : '4ch',
                flexDirection: 'row',
                justifyContent: isXUltraSmallScreen ? 'center' : 'space-between',
                alignItems: 'start',
                p: 1
            }}>
                <Box sx={{ width: isXUltraSmallScreen ? '48%' : null }}>
                    <Box sx={{ p: 1 }}>
                        <Typography>API</Typography>
                    </Box>
                    <MenuList dense sx={{ display: 'flex', flexDirection: isExtraSmallScreen ? 'column' : 'row' }} >
                        <MenuItem >
                            <Link
                                underline="none"
                                color='cornflowerblue'
                                href='https://api.nasa.gov/'
                                target="_blank"
                                data-tooltip="Open in Block Explorer"
                                rel="noreferrer">
                                NASA
                            </Link>
                        </MenuItem>
                        <MenuItem >
                            <Link
                                underline="none"
                                color='cornflowerblue'
                                href='https://github.com/15Dkatz/official_joke_api'
                                target="_blank"
                                data-tooltip="Open in Block Explorer"
                                rel="noreferrer">
                                OFFICIAL JOKE
                            </Link>
                        </MenuItem>
                        <MenuItem >
                            <Link
                                underline="none"
                                color='cornflowerblue'
                                href='https://www.coindesk.com/'
                                target="_blank"
                                data-tooltip="Open in Block Explorer"
                                rel="noreferrer">
                                COINDESK
                            </Link>
                        </MenuItem>
                    </MenuList>
                </Box>
                <Divider orientation='vertical' flexItem sx={{ display: isXUltraSmallScreen ? null : 'none' }} />
                <Box sx={{ width: isXUltraSmallScreen ? '48%' : null }}>
                    <Box sx={{ p: 1 }}>
                        <Typography>Source</Typography>
                    </Box>
                    <MenuList dense sx={{ display: 'flex', flexDirection: isExtraSmallScreen ? 'column' : 'row', color: 'cornflowerblue' }}>
                        <MenuItem >
                            <Link
                                underline="none"
                                color='cornflowerblue'
                                href='https://github.com/0oPavelVasilevo0/x-dream-store'
                                target="_blank"
                                data-tooltip="Open in Block Explorer"
                                rel="noreferrer">
                                CODE
                            </Link>
                        </MenuItem>
                        <MenuItem >
                            <Link
                                underline="none"
                                color='cornflowerblue'
                                href='https://github.com/0oPavelVasilevo0'
                                target="_blank"
                                data-tooltip="Open in Block Explorer"
                                rel="noreferrer">
                                PAWASIL
                            </Link>
                        </MenuItem>
                    </MenuList>
                </Box>
            </Toolbar>
        </AppBar>
    )
}
