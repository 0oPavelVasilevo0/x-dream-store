'use client'
import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import useProductsCount from '@/app/hooks/useProductsDataCount';
import { Box, CircularProgress } from '@mui/material';
import Image from 'next/image';
import { useSession } from 'next-auth/react';


export default function Images() {
    const { data: session, status } = useSession()
    const count = 30
    const countData = useProductsCount(count)
    const pic = countData?.products.filter((product: { media_type: string; }) => product.media_type === 'image')[0]?.url

    if (countData === null) {
        return <Box sx={{
            display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', width: '100%'
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
                        height: '80%'
                    }}>
                        <Image
                            alt="img"
                            src={pic}
                            fill
                        />
                    </Box>
                ) : (
                    <ImageList sx={{ width: '100%', height: '80%' }} cols={5} rowHeight={144}>
                        {countData.products
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