'use client'
import DisplayHome from '@/app/components/displayHome/DisplayHome'
import { customTheme } from '@/app/theme/theme'
import { useMediaQuery } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'

export default function Test() {
    const isSmallScreen = useMediaQuery(customTheme.breakpoints.down('lg'))
    const isExtraSmallScreen = useMediaQuery(customTheme.breakpoints.down('md'))
    const isUltraSmallScreen = useMediaQuery(customTheme.breakpoints.down('sm'))
    const isXUltraSmallScreen = useMediaQuery(customTheme.breakpoints.down('xs'))
    return (
        <Box sx={{
           display: 'flex',
           justifyContent: 'center',
        //    alignItems: 'center',
           height: '100vh'
        }}>
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            width: isXUltraSmallScreen ? '100%' : isUltraSmallScreen ? '49ch' : isExtraSmallScreen ? '56ch' : isSmallScreen ? '89ch' : '120ch',
            // justifyContent: isSmallScreen ? 'center' : 'center',
            pt: 12,
            px: isXUltraSmallScreen ? 1 : null
        }}
        >
            <DisplayHome />
        </Box>
        </Box>
    )
}
