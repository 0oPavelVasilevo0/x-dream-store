'use client'
import InputDate from '@/app/components/inputDate/InputDate'
import usePriceData from '@/app/hooks/usePriceData'
import useProductsData from '@/app/hooks/useProductsData'
import productStore from '@/app/store/productStore'
import ThemeContextProvider from '@/app/theme/ThemeContextProvider'
import { customTheme } from '@/app/theme/theme'
import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Typography, Modal, Box, CircularProgress, Tooltip, CssBaseline, Snackbar, SnackbarOrigin, Alert } from '@mui/material'
import { useMediaQuery } from '@mui/system'
import { observer } from 'mobx-react'
import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'

interface StateAlert extends SnackbarOrigin {
    openAlert: boolean;
}

export default observer(function Space() {

    const isSmallScreen = useMediaQuery(customTheme.breakpoints.down('lg'))
    const isExtraSmallScreen = useMediaQuery(customTheme.breakpoints.down('md'))
    const isUltraSmallScreen = useMediaQuery(customTheme.breakpoints.down('sm'))
    const isXUltraSmallScreen = useMediaQuery(customTheme.breakpoints.down('xs'))

    const [loadedCount, setLoadedCount] = useState(12); // Состояние для отслеживания текущего количества загруженных объектов

    useEffect(() => {
        const handleScroll = () => {
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;
            const scrollTop = window.scrollY || document.documentElement.scrollTop;

            if (windowHeight + scrollTop >= documentHeight) {
                // Если пользователь доскроллил до конца страницы, загрузите дополнительные объекты
                // Вместо константы 12 можно использовать любое значение, например, 12, 24, 36 и т.д., в зависимости от вашего дизайна
                setLoadedCount(prevCount => prevCount + 12);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
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

    //проверка нахождения обьекта в localstorage
    const cheсkLocalProduct = (product: any[]) => productStore.selectedBuyInfoProduct.some(item => JSON.stringify(item) === JSON.stringify(product))

    //расчет прайса
    const complexPriceData = usePriceData()
    const codeUSD = complexPriceData && complexPriceData.bpi.USD.code

    const getPrice = (url: string) => {
        if (url) {
            const parts: string[] = url.split('/');
            const numberIndex = parts.findIndex((part: string) => part === 'image') + 1// Находим индекс элемента 'image' и прибавляем 1, чтобы получить следующий элемент
            const number = parts[numberIndex];
            if (number) {
                // Выполняем расчет
                const bitcoinPrice = complexPriceData && complexPriceData.bpi.USD.rate_float; // доступ к данным о цене биткоина
                const result = bitcoinPrice && (bitcoinPrice / parseInt(number)) / 10; // Парсим цифры в целое число и выполняем расчет
                return `price: ${result && result.toFixed(1)} ${codeUSD}`; // Возвращаем результат с округлением до ? знаков после запятой
            } else {
                return `price: 0.5 ${codeUSD}`; // Возвращаем "что-то", если не удается извлечь число из URL
            }
        }
    };

    const { data: session, status } = useSession()

    //alert for sign in
    // const [openAlert, setOpenAlert] = React.useState(false);
    const [stateAlert, setStateAlert] = React.useState<StateAlert>({
        openAlert: false,
        vertical: 'top',
        horizontal: 'center',
    });
    const { vertical, horizontal, openAlert } = stateAlert;

    // const handleClickAlert = () => {
    //     setOpenAlert(true);
    // };
    const handleClickAlert = (newStateAlert: SnackbarOrigin) => () => {
        setStateAlert({ ...newStateAlert, openAlert: true });
    };

    // const handleCloseAlert = (event: React.SyntheticEvent | Event, reason?: string) => {
    //     if (reason === 'clickaway') {
    //         return;
    //     }
    //     setOpenAlert(false);
    // };
    const handleCloseAlert = () => {
        setStateAlert({ ...stateAlert, openAlert: false });
    };

    if (complexData === null) {
        return <Box sx={{
            display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'
        }}>
            <CircularProgress />
        </Box >
    }

    return (
        <Box sx={{ my: 12, px: isXUltraSmallScreen ? 1 : null }}>
            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                mb: 2,
                // mt: 12
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
                    .slice(0, loadedCount) // Отображаем только загруженное количество объектов
                    .map((product, index) => (
                        // index < displayCount &&
                        <Card key={index} sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            // background: '#D9D9D9',
                            // p: 1,
                            justifyContent: 'space-between',
                        }}>
                            <Tooltip title='see preview' arrow sx={{ cursor: 'pointer', }}>
                                <CardActionArea
                                    sx={{ borderRadius: 0 }}
                                    onClick={() => {
                                        handleOpen(product)
                                    }}
                                >
                                    <CardMedia
                                        component="img"
                                        height="250"
                                        image={product.url}
                                        alt={product.title}
                                    // sx={{ borderRadius: '4px 4px 0 0' }}
                                    />
                                    <CardContent sx={{ p: 1 }}>
                                        <Typography noWrap gutterBottom variant="h5" component="div">
                                            {product.title}
                                        </Typography>
                                        <Typography noWrap variant="body2" color="text.secondary">
                                            {product.explanation}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Tooltip>
                            <CardContent sx={{ p: 1 }}>
                                <Typography fontSize={10}>
                                    {product.date}
                                </Typography>
                                <Typography fontSize={12}>
                                    {product.url && getPrice(product.url)}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button
                                    disabled={cheсkLocalProduct(product)}
                                    fullWidth
                                    variant='outlined'
                                    color='warning'
                                    // sx={{
                                    //     background: '#222222'
                                    // }}
                                    onClick={() => {
                                        if (status !== "authenticated") {
                                            handleClickAlert({ vertical: 'top', horizontal: 'center' })();
                                        } else {
                                            handleBuyInfo(product);
                                        }
                                    }}
                                >
                                    {cheсkLocalProduct(product) ? 'in cart' : 'add to cart'}
                                </Button>
                                {/* <Button onClick={handleClickAlert({ vertical: 'top', horizontal: 'center'})}>Open</Button> */}
                                <Snackbar
                                    anchorOrigin={{ vertical, horizontal }}
                                    open={openAlert}
                                    autoHideDuration={6000}
                                    onClose={handleCloseAlert}
                                    // message="To perform actions you need to log in!"
                                    key={vertical + horizontal}
                                >
                                    <Alert
                                        // onClose={handleCloseAlert}
                                        severity="error"
                                        variant="filled"
                                        sx={{ width: '100%' }}
                                    >
                                        To perform actions you need to log in!
                                    </Alert>
                                    </Snackbar>
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
                            <CardContent sx={{
                                p: 0,
                                //  bgcolor: '#D9D9D9'
                            }}>
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
        </Box>
    )
}
)