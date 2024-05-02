'use client'
import { createTheme } from "@mui/material";

export const customTheme = createTheme(
    {
        components: {
            MuiButton: {
                variants: [
                    {
                        props: (props) =>
                            props.variant === 'text',
                        style: {
                            padding: '6px 16px',
                        },
                    },
                ],
            }
        },
        breakpoints: {
            values: {
                xs: 400,
                sm: 480,
                md: 740,
                lg: 980,
                xl: 1536,
            },
        },
    }
);