import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import dynamic from 'next/dynamic'
import { Box } from "@mui/material";
import AuthProvider from "@/context/AuthProvider";

const _NavBar = dynamic(() => import('./components/navbar/NavBar'), { ssr: false })

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <AuthProvider>
        <body>
          <_NavBar />
          <Box>
            {children}
          </Box>
        </body>
      </AuthProvider>
    </html>
  );
}
