'use client'
import { createTheme } from "@mui/material";
import { blueGrey, brown, cyan, grey, lime, red, teal } from "@mui/material/colors";

export const customColorTheme = createTheme(
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
        // breakpoints: {
        //     values: {
        //         xs: 400,
        //         sm: 480,
        //         md: 750,
        //         lg: 980,
        //         xl: 1536,
        //     },
        // },
        palette: {
            mode: 'dark',
            // palette values for light mode
            // primary: blueGrey,
            // success: teal,
            // info: brown,
            // error: red,
            // warning: lime,
            // text: {
            //     primary: grey[800],
            //     secondary: grey[500],
            // },
            primary: cyan,
            success: teal,
            info: brown,
            error: red,
            warning: lime,
            background: {
                default: '#2a292d',
                // default: 'paper'
                //   paper: '#2F4F4F'
                 },
            text: {
                primary: '#fff',
                secondary: grey[200],
            },

            // background: {default: '#fff'}
        }
    }
);
export const customTheme = createTheme(
    {
        breakpoints: {
            values: {
                xs: 460,
                sm: 530,
                md: 830,
                lg: 1100,
                xl: 1536,
            },
        },
    }
)