'use client'
import { Box, Button, CardMedia, IconButton, Paper, Typography, useMediaQuery } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import React, { useEffect, useState, } from 'react'
import { observer } from 'mobx-react'
import { customTheme } from '@/app/theme/theme'
import productStore from '@/app/store/productStore'
import usePriceData from '@/app/hooks/usePriceData'
import { useSession } from 'next-auth/react'
import { postHandler } from '../api/emailRoute/route'
import { toJS } from 'mobx'
import { Session } from 'next-auth'

export default observer(function Orders() {
    const { data: session, status } = useSession()

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

    const handleOrder = async (session: Session | null) => {
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
        } catch (error) {
            console.error(error);
            // Обработка ошибок при отправке письма
        } finally {
            setIsOrdering(false);
        }
    };
    return (
        <Box
            sx={{
                justifyContent: 'center',
                display: 'grid',
                gap: 2,
                mb: 2,
                mt: 12,
                p: '0 10px'
            }}>
            <Box>
                <Typography variant='h6'>Your order{session?.user?.email}</Typography>
            </Box>
            {(status !== "authenticated") ? (
                <Typography variant='h6'>You have no available orders! Login or register!</Typography>
            ) : (
                <>
                    {selectedBuyInfoProduct && selectedBuyInfoProduct.map((product: any, index: number) => (
                        <Paper key={index} elevation={3}
                            sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                height: "160",
                                justifyContent: 'space-between',
                                // p: 2
                            }}>
                            <Box sx={{ width: '20ch' }}>
                                <CardMedia
                                    component="img"
                                    height="160"
                                    sx={{ borderRadius: '4px 0 0 4px' }}
                                    image={product.url}
                                    alt={product.title}
                                />
                            </Box>
                            <Box sx={{ maxWidth: '40ch', display: 'flex', flexDirection: 'column', p: 1 }}>
                                <Box sx={{ height: '50%', width: '100%', display: 'flex', alignItems: 'flex-end', p: 1 }}>
                                    <Typography fontSize={isXUltraSmallScreen ? 16 : 20} sx={{ textAlign: 'justify' }}>
                                        {product.title}
                                    </Typography>
                                </Box>
                                <Box sx={{ height: '50%', width: '100%', display: 'flex', alignItems: 'flex-end' }}>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', flexDirection: isXUltraSmallScreen ? 'column' : 'row', width: '100%' }}>
                                        <Typography fontSize={isXUltraSmallScreen ? 14 : 16} sx={{ textAlign: isXUltraSmallScreen ? 'center' : null, color: 'gold', p: 1 }}>
                                            {product.url && getPrice(product.url)}
                                        </Typography>
                                        <Box sx={{ display: isXUltraSmallScreen ? 'flex' : null, justifyContent: 'center' }}>
                                            <IconButton
                                                size={isXUltraSmallScreen ? 'small' : undefined}
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
                    <Box sx={{
                        display: 'flex',
                        flexDirection: isXUltraSmallScreen ? 'column' : 'row',
                        gap: '6px',
                        justifyContent: 'space-between',
                        p: 2
                    }}>
                        <Button
                            disabled={isOrdering}
                            onClick={() =>  handleOrder(session) }
                            variant='outlined'
                            sx={{ height: '40px', width: isXUltraSmallScreen ? '100%' : '195px' }}>
                            {isOrdering ? 'Ordering...' : 'Order'}
                        </Button>
                    </Box>
                </>
            )}
        </Box>
    )
}
)
