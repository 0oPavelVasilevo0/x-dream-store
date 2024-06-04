'use client'
import { Box, CircularProgress, Divider, useMediaQuery } from "@mui/material";
import { customTheme } from "./theme/theme";
import Images from "./components/images/Images";
import JokesList from "./components/jokesList/JokesList";
import HelloContent from "./components/helloContent/HelloContent";
import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session, status } = useSession()
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
        {(status === 'loading') ? (
          <Box sx={{ height: '100vh', alignContent: 'center' }}>
            <CircularProgress />
          </Box>
        ) : (
          <>
            <Box sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: isExtraSmallScreen ? 'column' : 'row',
              height: isExtraSmallScreen ? null : '100vh',
              width: isXUltraSmallScreen ? '100%' : isUltraSmallScreen ? '49ch' : isExtraSmallScreen ? '56ch' : isSmallScreen ? '89ch' : '120ch',
              minHeight: '560px'
            }}>
              <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: isExtraSmallScreen ? '100%' : '20%',
              }}>
                <HelloContent />
              </Box>
              <Divider orientation={isExtraSmallScreen ? "horizontal" : "vertical"} flexItem />
              <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                width: isExtraSmallScreen ? '100%' : '80%'
              }}>
                <Box sx={{
                  display: 'flex',
                  justifyContent: 'end',
                  flexDirection: 'column',
                  alignItems: 'center',
                  width: isExtraSmallScreen ? '100%' : 'calc(100% - 32px)',
                  height: isExtraSmallScreen ? '300px' : 'calc(50vh - 12px)',
                }}>
                  <Images />
                </Box>
                <Divider variant={isExtraSmallScreen ? "fullWidth" : "middle"} flexItem>
                  Space or Jokes
                </Divider>
                <Box sx={{
                  display: 'flex',
                  justifyContent: (status !== "authenticated") ? 'center' : 'top',
                  flexDirection: 'column',
                  alignItems: 'center',
                  width: isExtraSmallScreen ? '100%' : 'calc(100% - 32px)',
                  height: isExtraSmallScreen ? '340px' : 'calc(50vh - 12px)',
                }}>
                  <JokesList />
                </Box>
              </Box>
            </Box>
          </>
        )}
      </Box>
    </main>
  );
}
