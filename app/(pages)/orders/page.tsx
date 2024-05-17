'use client'
import { IMaskInput } from 'react-imask'
import { Box, Button, CardMedia, FormControl, IconButton, InputLabel, OutlinedInput, Paper, Typography, useMediaQuery, } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import React, { forwardRef, useEffect, useState } from 'react'
import { observer } from 'mobx-react'
import { customTheme } from '@/app/theme/theme'
import productStore from '@/app/store/productStore'
import usePriceData from '@/app/hooks/usePriceData'
import { useSession } from 'next-auth/react'

interface CustomProps {
    onChange: (event: { target: { name: string; value: string } }) => void;
    name: string;
}

const TextMaskCustom = forwardRef<HTMLInputElement, CustomProps>(
    function TextMaskCustom(props, ref) {
        const { onChange, ...other } = props;
        return (
            <IMaskInput
                {...other}
                mask="+7(000) 000-00-00"
                // definitions={{
                //     '#': /[1-9]/,
                // }}
                inputRef={ref}
                onAccept={(value: any) => onChange({ target: { name: props.name, value } })}
                overwrite
            />
        );
    },
);

export default observer(function Orders() {
    const { data: session, status } = useSession()

    const isSmallScreen = useMediaQuery(customTheme.breakpoints.down('lg'))
    const isExtraSmallScreen = useMediaQuery(customTheme.breakpoints.down('md'))
    const isUltraSmallScreen = useMediaQuery(customTheme.breakpoints.down('sm'))
    const isXUltraSmallScreen = useMediaQuery(customTheme.breakpoints.down('xs'))

    const [values, setValues] = useState({
        textmask: '(000) 000-00-00',
        numberformat: '1320',
    })

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValues({
            ...values,
            [event.target.name]: event.target.value,
        });
    };

    const selectedBuyInfoProduct = productStore.selectedBuyInfoProduct;

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
                <Typography variant='h6'>Your order</Typography>
            </Box>
            {(status !== "authenticated") ? (
                <Typography variant='h6'>You have no available orders! Login or register!</Typography>
            ) : (
                <>
                    {selectedBuyInfoProduct && selectedBuyInfoProduct.map((product: any, index: number) => (
                        <Paper key={index} elevation={3}
                            sx={{
                                display: 'flex',
                                // maxWidth: '80ch',
                                // background: '#D9D9D9',
                                //  bgcolor: 'background.paper',
                                // borderRadius: 1,
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
                                <Box sx={{ height: '50%', display: 'flex', alignItems: 'flex-end', p: 1 }}>
                                    <Typography fontSize={isXUltraSmallScreen ? 16 : 20} sx={{ textAlign: 'justify' }}>
                                        {product.title}
                                    </Typography>
                                </Box>
                                <Box sx={{ height: '50%', display: 'flex', alignItems: 'flex-end' }}>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', flexDirection: isXUltraSmallScreen ? 'column' : 'row', width: '100%' }}>
                                        <Typography fontSize={isXUltraSmallScreen ? 14 : 16} sx={{ textAlign: isXUltraSmallScreen ? 'center' : null, color: 'gold', p: 1 }}>
                                            {product.url && getPrice(product.url)}
                                        </Typography>
                                        {/* <Button sx={{ alignItems: isXUltraSmallScreen ? 'center': null }}
                                    color='inherit'
                                    variant='outlined'
                                    onClick={() => handleDelete(index)}
                                >
                                    Delete
                                </Button> */}
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

                            {/* <Button variant='outlined' onClick={() => handleDelete(index)}>Delete</Button> */}
                        </Paper>
                    ))}
                    <Box sx={{
                        display: 'flex',
                        flexDirection: isXUltraSmallScreen ? 'column' : 'row',
                        gap: '6px',
                        justifyContent: 'space-between',
                        p: 2
                    }}>
                        <FormControl>
                            <InputLabel htmlFor="formatted-text-mask-input">your phone number</InputLabel>
                            <OutlinedInput
                                label="your phone number"
                                size='small'
                                value={values.textmask}
                                onChange={handleChange}
                                name="textmask"
                                id="formatted-text-mask-input"
                                inputComponent={TextMaskCustom as any}
                                sx={{
                                    textAlign: 'center',
                                    justifyContent: 'center'
                                }}
                            />
                        </FormControl>
                        <Button
                            variant='outlined'
                            sx={{ height: '40px', width: isXUltraSmallScreen ? '100%' : '195px' }}>
                            order
                        </Button>
                    </Box>
                </>
            )}
        </Box>
    )
}
)
