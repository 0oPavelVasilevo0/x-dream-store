'use client'
import useJokesData from '@/app/hooks/useJokesData'
import { customTheme } from '@/app/theme/theme'
import { Box, CircularProgress, Paper, Typography, useMediaQuery } from '@mui/material'
import { useSession } from 'next-auth/react'

export default function Jokes() {
  const isSmallScreen = useMediaQuery(customTheme.breakpoints.down('lg'))
  const isExtraSmallScreen = useMediaQuery(customTheme.breakpoints.down('md'))
  const isUltraSmallScreen = useMediaQuery(customTheme.breakpoints.down('sm'))
  const isXUltraSmallScreen = useMediaQuery(customTheme.breakpoints.down('xs'))

  const { data: session, status } = useSession()

  const complexData = useJokesData()
  if ((complexData === null) || (status === 'loading')) {
    return <Box sx={{
      display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'
    }}>
      <CircularProgress />
    </Box >
  }
  return (
    <Box sx={{
      display: isSmallScreen ? 'grid' : 'grid',
      gridTemplateColumns: isXUltraSmallScreen ? undefined : isUltraSmallScreen ? '24ch 24ch' : isExtraSmallScreen ? '27ch 27ch' : isSmallScreen ? '27ch 27ch 27ch' : '27ch 27ch 27ch 27ch',
      gap: isUltraSmallScreen ? '1ch' : isExtraSmallScreen ? '2ch' : '4ch',
      justifyContent: isSmallScreen ? 'center' : 'center',
      px: isXUltraSmallScreen ? 1 : null,
      py: 12,
    }}
    >
      {complexData?.jokes.map((jokes, index) => (
        <Paper key={index} elevation={6} sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-around',
          minHeight: '27ch',
          // borderRadius: 1,
          // background: '#D9D9D9',
          p: 2
        }}>
          <Box textAlign={'justify'}>
            <Typography sx={{ color: 'cyan' }}>
              <span style={{ color: 'magenta' }}>{'if ( '}</span>
              {jokes.setup}
              <span style={{ color: 'magenta' }}>{' )'}</span>
            </Typography>
          </Box>
          <Box textAlign={'justify'}>
            <Typography sx={{ color: 'lightgreen' }}>
              <span style={{ color: 'magenta' }}>{'return ( '}</span>
              {jokes.punchline}
              <span style={{ color: 'magenta' }}>{' )'}</span>
            </Typography>
          </Box>
        </Paper>
      ))}
    </Box>
  )
}