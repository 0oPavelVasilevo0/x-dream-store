'use client'
import { Box, useMediaQuery } from "@mui/material";
import { customTheme } from "./theme/theme";

export default function Home() {
  const isSmallScreen = useMediaQuery(customTheme.breakpoints.down('lg'));
  const isExtraSmallScreen = useMediaQuery(customTheme.breakpoints.down('md'));
  const isUltraSmallScreen = useMediaQuery(customTheme.breakpoints.down('sm'));
  const isXUltraSmallScreen = useMediaQuery(customTheme.breakpoints.down('xs'));
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
      home
      </div>
      </Box>
    </main>
  );
}
