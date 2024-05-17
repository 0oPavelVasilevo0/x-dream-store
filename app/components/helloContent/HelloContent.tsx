import { customTheme } from '@/app/theme/theme';
import { Box, Divider, Typography, useMediaQuery } from '@mui/material'
import { useSession } from 'next-auth/react'
import React from 'react'

export default function HelloContent() {
    const { data: session, status } = useSession()

    const isSmallScreen = useMediaQuery(customTheme.breakpoints.down('lg'));
    const isExtraSmallScreen = useMediaQuery(customTheme.breakpoints.down('md'));
    const isUltraSmallScreen = useMediaQuery(customTheme.breakpoints.down('sm'));
    const isXUltraSmallScreen = useMediaQuery(customTheme.breakpoints.down('xs'));
    return (
        <>
            <Box sx={{
                display: 'flex',
                justifyContent: isXUltraSmallScreen ? "end" : 'center',
                flexDirection: isXUltraSmallScreen ? 'column' : isExtraSmallScreen ? 'row' : 'column',
                alignItems: isXUltraSmallScreen ? "center" : isExtraSmallScreen ? 'flex-end' : 'center',
                width: '100%',
                height: isExtraSmallScreen ? null : 'calc(50vh - 12px)',
                minHeight: isExtraSmallScreen ? '200px' : null,
            }}>
                {(status !== "authenticated") ? (
                    <Typography fontSize={22} >
                        Hello! Dream Store is glad to see you! You can register or login to make unusual purchases, or just look at cool content!
                    </Typography>
                ) : (
                    <>
                            <Typography fontSize={22} sx={{ p : isExtraSmallScreen? 1: null  }} >
                            {'Hello, '}{session.user?.name}{'!'}
                        </Typography>
                            <Divider variant="fullWidth" orientation={isXUltraSmallScreen ? "horizontal" : isExtraSmallScreen ? "vertical" : "horizontal"} flexItem />
                            <Typography fontSize={16} sx={{ p: isExtraSmallScreen ? 1 : null }}>
                            {'Welcome to the Dream Store! Enjoy these extraordinary products!'}
                        </Typography>
                    </>
                )}
            </Box>
            <Divider flexItem />
            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                height: isExtraSmallScreen ? null : 'calc(50vh - 12px)',
                minHeight: isExtraSmallScreen ? '200px' : null,
                p: isExtraSmallScreen ? 1: null,
            }}>
                {'This store is made for fun. No payments, everything is fictitious. Cool pictures obtained using the NASA API, as well as funny jokes that not everyone will understand. The fictitious price calculation is taken from the Bitcoin APi)))'}
            </Box>
        </>
    )
}
