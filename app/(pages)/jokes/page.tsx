'use client'
import useJokesData from '@/app/hooks/useJokesData'
import { customTheme } from '@/app/theme/theme'
import { Box, CircularProgress, Typography, useMediaQuery } from '@mui/material'

export default function Jokes() {
  const isSmallScreen = useMediaQuery(customTheme.breakpoints.down('lg'))
  const isExtraSmallScreen = useMediaQuery(customTheme.breakpoints.down('md'))
  const isUltraSmallScreen = useMediaQuery(customTheme.breakpoints.down('sm'))
  const isXUltraSmallScreen = useMediaQuery(customTheme.breakpoints.down('xs'))

  const complexData = useJokesData()
  if (complexData === null) {
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
      mb: 2,
      mt: 12
    }}
    >
      {complexData.jokes.map((jokes, index) => (
        <Box key={index} sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-around',
          minHeight: '27ch',
          borderRadius: 1,
          bgcolor: 'background.paper',
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
        </Box>
      ))}
    </Box>
  )
}