'use client'
import { Box, Divider, Typography, useMediaQuery } from "@mui/material";
import { customTheme } from "./theme/theme";
import Images from "./components/images/Images";
import JokesList from "./components/jokesList/JokesList";
import HelloContent from "./components/helloContent/HelloContent";

export default function Home() {
  const isSmallScreen = useMediaQuery(customTheme.breakpoints.down('lg'));
  const isExtraSmallScreen = useMediaQuery(customTheme.breakpoints.down('md'));
  const isUltraSmallScreen = useMediaQuery(customTheme.breakpoints.down('sm'));
  const isXUltraSmallScreen = useMediaQuery(customTheme.breakpoints.down('xs'));

  return (
    <main>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          p: isXUltraSmallScreen ? '0ch 2ch' : 0,
        }}
      >
        <Box sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
          height: '100vh',
          width: isXUltraSmallScreen ? '100%' : isUltraSmallScreen ? '49ch' : isExtraSmallScreen ? '56ch' : isSmallScreen ? '89ch' : '120ch',
          minHeight: '560px'
        }}>
          <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '20%',
          }}>
            <Box sx={{
              width: 'calc(100% - 32px)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              textAlign: 'center'
            }}>
              <HelloContent />
            </Box>
          </Box>
          <Divider orientation="vertical" flexItem />
          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: '80%'
          }}>
            <Box sx={{
              display: 'flex',
              justifyContent: 'end',
              flexDirection: 'column',
              alignItems: 'center',
              width: 'calc(100% - 32px)',
              height: 'calc(50vh - 12px)'
            }}>
              <Images />
            </Box>
            <Divider variant="middle" flexItem>
              Space or Jokes
            </Divider>
            <Box sx={{
              display: 'flex',
              justifyContent: 'top',
              flexDirection: 'column',
              alignItems: 'center',
              width: 'calc(100% - 32px)',
              height: 'calc(50vh - 12px)'
            }}>
              <JokesList />
            </Box>
          </Box>
        </Box>
      </Box>
    </main>
  );
}
