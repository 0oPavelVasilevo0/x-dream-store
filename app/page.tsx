'use client'
import { Box, CardMedia, useMediaQuery } from "@mui/material";
import { customTheme } from "./theme/theme";
import { useSession } from "next-auth/react";
import { Image } from "@mui/icons-material";

export default function Home() {
  const isSmallScreen = useMediaQuery(customTheme.breakpoints.down('lg'));
  const isExtraSmallScreen = useMediaQuery(customTheme.breakpoints.down('md'));
  const isUltraSmallScreen = useMediaQuery(customTheme.breakpoints.down('sm'));
  const isXUltraSmallScreen = useMediaQuery(customTheme.breakpoints.down('xs'));

  const { data: session, status } = useSession()

  return (
    <main>
      <Box
        sx={{
          background: '#222222',
          display: 'grid',
          gridTemplateColumns: isXUltraSmallScreen ? null : isUltraSmallScreen ? '49ch' : isExtraSmallScreen ? '56ch' : isSmallScreen ? '89ch' : '120ch',
          gap: isUltraSmallScreen ? '4ch' : isExtraSmallScreen ? '8ch' : '16ch',
          justifyContent: isSmallScreen ? 'center' : 'center',
          p: isXUltraSmallScreen ? '0ch 2ch' : '2ch 0ch',
        }}
      >
      <div style={{ marginTop: '60px' }}> 
          {(status !== "authenticated") ? ('home') : (
          <CardMedia
            component="img"
            height="50"
            // width="40"
            // image={session && session.user?.image}
              src={session.user?.image || ''}
            alt={'1'}
            sx={{ borderRadius: '4px 4px 0 0', width: '40px'}}
          />)}
          {/* <img src={ session && session.user?.image} alt="profile" width={'40px'} height={'80px'}/> */}
      </div>
        <div style={{ marginTop: '60px' }}>
          {(status !== "authenticated") ? ('home') : (session.user?.name)}
          {/* <CardMedia
            component="img"
            height="250"
            image={session.user.image}
            alt={'1'}
            sx={{ borderRadius: '4px 4px 0 0' }}
          /> */}
        </div>
      </Box>
    </main>
  );
}
