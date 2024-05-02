'use client'
import InputDate from '@/app/components/ inputDate/InputDate'
import SelectCount from '@/app/components/selectCount/SelectCount'
import useProductsData from '@/app/hooks/useProductsData'
import productStore from '@/app/store/productStore'
import { customTheme } from '@/app/theme/theme'
import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Typography, Modal, Box, CircularProgress } from '@mui/material'
import { useMediaQuery } from '@mui/system'
import { observer } from 'mobx-react'
import React, { useState } from 'react'


export default observer(function Space() {

    const isSmallScreen = useMediaQuery(customTheme.breakpoints.down('lg'))
    const isExtraSmallScreen = useMediaQuery(customTheme.breakpoints.down('md'))
    const isUltraSmallScreen = useMediaQuery(customTheme.breakpoints.down('sm'))
    const isXUltraSmallScreen = useMediaQuery(customTheme.breakpoints.down('xs'))
    // const complexData = useProductsData();
    const complexData = useProductsData(productStore.selectedStartDate, productStore.selectedEndDate);

    const [open, setOpen] = useState(false);

    const selectedProduct = productStore.selectedProduct;

    const handleOpen = (product: any) => {
        console.log('Setting selected product:', product);
        productStore.setSelectedProduct(product);
        setOpen(true);
    };

    const handleClose = () => {
        console.log('Closing selected product');
        productStore.setSelectedProduct(null);
        setOpen(false);
    };

    const handleBuyInfo = (product: any) => {
        productStore.setselectedBuyInfoProduct(product);
    };

    // Получаем количество выводимых объектов из store
    // const displayCount = productStore.displayCount;

    if (complexData === null) {
        return <Box sx={{
            display: 'flex', justifyContent: 'center'
        }}>
            <CircularProgress />
        </Box >
    }

    return (
        <>
            <Box sx={{
                display:'flex',
                // width: isXUltraSmallScreen ? null : isUltraSmallScreen ? '49ch' : isExtraSmallScreen ? '56ch' : isSmallScreen ? '89ch' : '120ch',
                justifyContent: 'center',
                mb: 2
            }}>
            <InputDate />
            </Box>
            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: isXUltraSmallScreen ? '100%' : isUltraSmallScreen ? '24ch 24ch' : isExtraSmallScreen ? '27ch 27ch' : isSmallScreen ? '27ch 27ch 27ch' : '27ch 27ch 27ch 27ch',
                    gap: isUltraSmallScreen ? '1ch' : isExtraSmallScreen ? '2ch' : '4ch',
                    justifyContent: 'center',
                }}
            >
                {complexData && complexData.products && complexData.products
                    .filter(product => product.media_type === 'image')// Фильтруем только изображения
                    // .slice(0, displayCount)
                    .map((product, index) => (
                        // index < displayCount &&
                        <Card key={index} sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            background: '#D9D9D9',
                            p: 1,
                            justifyContent: 'space-between'
                        }}>
                            <CardActionArea
                                onClick={() => {
                                    handleOpen(product)
                                }}
                            >
                                <CardMedia
                                    component="img"
                                    height="250"
                                    image={product.url}
                                    alt={product.title}
                                    sx={{ borderRadius: '4px 4px 0 0' }}
                                />
                                <CardContent sx={{ p: 1 }}>
                                    <Typography height={120} gutterBottom variant="h5" component="div">
                                        {product.title}
                                    </Typography>
                                    <Typography noWrap variant="body2" color="text.secondary">
                                        {product.explanation}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                            <CardContent sx={{ p: 1 }}>
                                <Typography fontSize={10}>
                                    {product.date}
                                </Typography>
                                <Typography fontSize={12}>
                                    {'price: 10$'}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button
                                    fullWidth
                                    variant='contained'
                                    sx={{
                                        background: '#222222'
                                    }}
                                    onClick={() => { handleBuyInfo(product) }}
                                >
                                    buy
                                </Button>
                            </CardActions>
                        </Card>
                    ))}
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        boxShadow: 24,
                        borderRadius: 2,
                        width: isExtraSmallScreen ? '95%' : '88ch',
                        maxHeight: '98%',
                    }}>
                        <Card>
                            <CardMedia
                                component="img"
                                image={selectedProduct && selectedProduct.url}
                                alt={selectedProduct && selectedProduct.title}
                                sx={{
                                    maxHeight: '700px',
                                }}
                            />
                            <CardContent sx={{ p: 0, bgcolor: '#D9D9D9' }}>
                                <Typography variant="h6" component="h2" p={1}>
                                    {selectedProduct && selectedProduct.title}
                                    <Typography fontSize={12}>
                                        {selectedProduct && selectedProduct.date}
                                    </Typography>
                                </Typography>
                                <Typography variant="body2" component="p"
                                    sx={{
                                        p: 0.5,
                                        height: 100,
                                        overflowY: 'auto',
                                        bgcolor: 'background.paper'
                                    }}>
                                    {selectedProduct && selectedProduct.explanation}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Box>
                </Modal>
            </Box>
        </>
    )
}
)