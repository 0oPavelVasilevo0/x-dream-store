'use client'
import { Box, Button, CardActionArea, CardMedia, CircularProgress, IconButton, Paper, Typography, useMediaQuery } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import React, { useEffect, useState, } from 'react'
import { observer } from 'mobx-react'
import { customTheme } from '@/app/theme/theme'
import productStore from '@/app/store/productStore'
import usePriceData from '@/app/hooks/usePriceData'
import { useSession } from 'next-auth/react'
import { toJS } from 'mobx'
import { Session } from 'next-auth'
import { postHandler } from '../api/mailRoute/mailData'
import ModalWindow from '@/app/components/modalWindow/ModalWindow'

export default observer(function Orders() {
    const { data: session, status } = useSession()

    const isExtraSmallScreen = useMediaQuery(customTheme.breakpoints.down('md'))
    const isXUltraSmallScreen = useMediaQuery(customTheme.breakpoints.down('xs'))

    const selectedBuyInfoProduct = productStore.selectedBuyInfoProduct;

    const [isOrdering, setIsOrdering] = useState(false);

    useEffect(() => {
        // Load selected products from localStorage when the component mounts
        productStore.loadFromLocalStorage();
    }, []);

    const handleDelete = (index: number) => {
        productStore.removeSelectedBuyInfoProduct(index);
    };

    const [open, setOpen] = useState(false);

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

    const clearCart = () => {
        productStore.clearSelectedBuyInfoProduct();
    };

    const handleOrder = async (session: Session | null, products: any[]) => {
        setIsOrdering(true);

        try {
            const userMail = session?.user?.email; // Получаем адрес электронной почты пользователя из сеанса
            console.log('User email:', userMail);
            const response = await postHandler({
                method: 'POST',
                body: JSON.stringify({
                    userEmail: userMail,
                    products: toJS(selectedBuyInfoProduct),
                }),
            });
            console.log(response);
            // Дополнительная логика при успешной отправке письма
            products.forEach((product: any) => {
                productStore.setSelectedHistoryInfoProduct(product);
            });
            productStore.clearSelectedBuyInfoProduct();
            clearCart()
        } catch (error) {
            console.error(error);
            // Обработка ошибок при отправке письма
        } finally {
            setIsOrdering(false);
        }
    };

    if (status === 'loading') {
        return (
            <Box sx={{
                display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'
            }}>
                <CircularProgress />
            </Box >
        )
    }

    return (
        <Box
            sx={{
                justifyContent: 'center',
                display: 'grid',
                gap: 2,
                minHeight: '100vh',
                alignItems: selectedBuyInfoProduct.length === 0 ? null : 'center',
                py: 12,
                px: 1
            }}>

            {(status !== "authenticated") ? (
                <Typography variant='h6'>You have no available orders! Login or register!</Typography>
            ) : (
                <>
                    <Box>
                        <Typography variant='h6'>{session?.user?.name}, Your order:</Typography>
                    </Box>
                    {selectedBuyInfoProduct && selectedBuyInfoProduct.map((product: any, index: number) => (
                        <Paper key={index} elevation={6}
                            sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                height: "160",
                                justifyContent: 'space-between',
                            }}>
                            <Box sx={{ width: isExtraSmallScreen ? '20ch' : '30ch' }}>
                                <CardActionArea onClick={() => {
                                    handleOpen(product)
                                }}>
                                    <CardMedia
                                        component="img"
                                        height="180"
                                        sx={{ borderRadius: '4px 0 0 4px' }}
                                        image={product.url}
                                        alt={product.title}
                                        loading='lazy'
                                    />
                                </CardActionArea>
                            </Box>
                            <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', p: 1 }}>
                                <Box sx={{ height: '50%', width: '100%', display: 'flex', alignItems: isXUltraSmallScreen ? 'center' : 'flex-end', p: 1, justifyContent: isXUltraSmallScreen ? 'center' : 'left' }}>
                                    <Typography fontSize={isXUltraSmallScreen ? 16 : 20} sx={{ textAlign: 'center' }} >
                                        {product.title}
                                    </Typography>
                                </Box>
                                <Box sx={{ height: '50%', width: '100%', display: 'flex', alignItems: 'flex-end' }}>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', flexDirection: isXUltraSmallScreen ? 'column' : 'row', width: '100%' }}>
                                        <Typography fontSize={isXUltraSmallScreen ? 14 : 16} sx={{ textAlign: isXUltraSmallScreen ? 'center' : null, p: 1 }}>
                                            {product.url && getPrice(product.url)}
                                        </Typography>
                                        <Box sx={{ display: isXUltraSmallScreen ? 'flex' : null, justifyContent: 'center' }}>
                                            <IconButton
                                                size={isXUltraSmallScreen ? 'small' : undefined}
                                                color='warning'
                                                aria-label="delete"
                                                onClick={() => handleDelete(index)}
                                            >
                                                <DeleteIcon fontSize={isXUltraSmallScreen ? 'small' : undefined} />
                                            </IconButton>
                                        </Box>
                                    </Box>
                                </Box>
                            </Box>
                        </Paper>
                    ))}
                    <ModalWindow open={open} handleClose={handleClose} />
                    {selectedBuyInfoProduct.length === 0 ? (
                        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', textAlign: 'center' }}>
                            <Typography color={'yellow'} fontSize={30}>
                                Empty
                            </Typography>
                        </Box>
                    ) : (
                        <Box sx={{
                            display: 'flex',
                            flexDirection: isExtraSmallScreen ? 'column' : 'row',
                            gap: '6px',
                            justifyContent: 'space-between',
                        }}>
                            <Button
                                disabled={isOrdering}
                                onClick={() => {
                                    { handleOrder(session, selectedBuyInfoProduct) }
                                }}
                                variant='outlined'
                                sx={{ height: '40px', width: isExtraSmallScreen ? '100%' : '176px' }}>
                                {isOrdering ? 'Ordering...' : 'Order'}
                            </Button>

                            <Typography fontSize={12} sx={{ color: 'cornflowerblue', textAlign: 'center', p: 1 }}>
                                your order will be sent to {session?.user?.email}
                            </Typography>
                        </Box>
                    )}
                </>
            )}
        </Box>
    )
}
)
