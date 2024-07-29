'use client'
import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import useProductsCount from '@/app/hooks/useProductsDataCount';
import { Box, CircularProgress, useMediaQuery } from '@mui/material';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { customTheme } from '@/app/theme/theme';
// import { ProductsCount } from '@/app/(pages)/api/productsRoute/productsData';
// import useSWR from 'swr'

// const fetcher = (count: number) => ProductsCount(count)

export default function Images() {
    const { data: session, status } = useSession()
    const count = 30
    const countData = useProductsCount(count)
    const pic = countData?.products.filter((product: { media_type: string; }) => product.media_type === 'image')[0]?.url

    // const { data, error } = useSWR([count], fetcher);

    const isSmallScreen = useMediaQuery(customTheme.breakpoints.down('lg'));
    const isExtraSmallScreen = useMediaQuery(customTheme.breakpoints.down('md'));
    const isUltraSmallScreen = useMediaQuery(customTheme.breakpoints.down('sm'));
    const isXUltraSmallScreen = useMediaQuery(customTheme.breakpoints.down('xs'));

    if (countData === null) {
        return <Box sx={{
            display: 'flex', justifyContent: 'center', alignItems: 'center', height: isExtraSmallScreen ? '100%' : '80%',
        }}>
            <CircularProgress />
        </Box >
    }

    return (
        <>
            {(status !== "authenticated") ?
                (
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        position: 'relative',
                        width: '100%',
                        height: isExtraSmallScreen ? '100%' : '80%'
                    }}>
                        {/* {(countData === null) ?
                        (
                        <CircularProgress />
                        ) : ( */}
                        <Image
                            alt="img"
                            src={pic}
                            fill
                            loading='lazy'
                        />
                        {/* )} */}
                    </Box>
                ) : (
                    <ImageList sx={{
                        width: '100%',
                        height: isExtraSmallScreen ? '100%' : '80%'
                    }}
                        cols={isXUltraSmallScreen ? 2 : isUltraSmallScreen ? 3 : isExtraSmallScreen ? 4 : 5}
                        rowHeight={144}
                    >
                        { countData.products
                            .filter(product => product.media_type === 'image')
                            .map((product, index) => (
                                <ImageListItem key={index}>
                                    <img
                                        // srcSet={`${product.url}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                                        srcSet={`${product.url}?w=248&fit=crop&auto=format&dpr=2 2x`}
                                        // src={`${product.url}?w=164&h=164&fit=crop&auto=format`}
                                        src={`${product.url}?w=248&fit=crop&auto=format`}
                                        alt={product.title}
                                        loading="lazy"
                                    />
                                </ImageListItem>
                            ))}
                    </ImageList>
                )}
        </>
    );
}