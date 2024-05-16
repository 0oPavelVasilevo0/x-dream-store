import { ThemeProvider } from '@mui/material';
import React, { ReactNode } from 'react'
import { customColorTheme } from './theme';

interface ThemeContextProvider {
    children: ReactNode;
}

export default function ThemeContextProvider({ children }: ThemeContextProvider) {
  return <ThemeProvider theme={customColorTheme}>{children}</ThemeProvider>
}
