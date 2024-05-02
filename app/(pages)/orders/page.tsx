'use client'
import { IMaskInput } from 'react-imask'
import { Box, Button, Card, CardContent, CardMedia, FormControl, InputLabel, OutlinedInput, Typography, useMediaQuery, } from '@mui/material'
import React, { forwardRef, useEffect, useState } from 'react'
import { observer } from 'mobx-react'
import { customTheme } from '@/app/theme/theme'
import productStore from '@/app/store/productStore'

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

    return (
        <Box sx={{
            background: '#D9D9D9',
            borderRadius: 1,
        }}>
            <Typography>Your order</Typography>
            {selectedBuyInfoProduct && selectedBuyInfoProduct.map((product: any, index: number) => (
                <Box key={index} sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: '6px',
                    justifyContent: 'space-between',
                    p: 2
                }}>
                    <CardMedia
                        component="img"
                        sx={{ width: 60, height: 40 }}
                        image={product.url}
                        alt={product.title}
                    />
                    <Typography width={'100%'} fontSize={16}>{product.title}</Typography>
                    <Typography width={'100%'} fontSize={16} textAlign={'right'}>{'amount'}</Typography>
                    <Typography width={'100%'} fontSize={16} textAlign={'right'}>{'total'}</Typography>

                    <Button variant='outlined' onClick={() => handleDelete(index)}>Delete</Button>
                </Box>
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
        </Box>
    )
}
)
