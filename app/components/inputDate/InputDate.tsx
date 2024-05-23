import * as React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useState } from 'react';
import productStore from '@/app/store/productStore';
import { Box, useMediaQuery } from '@mui/material';
import { customTheme } from '@/app/theme/theme';

export default function InputDate() {

    const isSmallScreen = useMediaQuery(customTheme.breakpoints.down('lg'))
    const isExtraSmallScreen = useMediaQuery(customTheme.breakpoints.down('md'))
    const isUltraSmallScreen = useMediaQuery(customTheme.breakpoints.down('sm'))
    const isXUltraSmallScreen = useMediaQuery(customTheme.breakpoints.down('xs'))

    // Получаем начальные даты из хранилища
    const initialStartDate = dayjs(productStore.selectedStartDate);
    const initialEndDate = dayjs(productStore.selectedEndDate);

    // Устанавливаем начальную дату как 12 дней раньше текущей и конечную дату как текущую
    const [startDate, setStartDate] = useState(initialStartDate);
    const [endDate, setEndDate] = useState(initialEndDate);

    const handleStartDateChange = (value: dayjs.Dayjs | null) => {
        if (value !== null) {
            const startDateDayjs = dayjs(value);
            setStartDate(startDateDayjs);
            productStore.setSelectedDates(startDateDayjs.format('YYYY-MM-DD'), endDate.format('YYYY-MM-DD'));
        };
    }

    const handleEndDateChange = (value: dayjs.Dayjs | null) => {
        if (value !== null) {
            const endDateDayjs = dayjs(value);
            setEndDate(endDateDayjs);
            productStore.setSelectedDates(startDate.format('YYYY-MM-DD'), endDateDayjs.format('YYYY-MM-DD'));
        };
    }

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Box sx={{
                display: 'flex',
                  width: isXUltraSmallScreen ? '100%' : isUltraSmallScreen ? '49ch' : isExtraSmallScreen ? '56ch' : isSmallScreen ? '89ch' : '120ch',
                justifyContent: 'end',
                gap: isUltraSmallScreen ? '1ch' : isExtraSmallScreen ? '2ch' : isSmallScreen ? '4ch': '4ch',
            }}>
                    <DemoItem label="Start Date"
                    sx={{
                        width: isXUltraSmallScreen ? '100%' : isUltraSmallScreen ? '24ch' : isExtraSmallScreen ? '27ch' : isSmallScreen ? '27ch' : '27ch',
                    }}
                    >
                        <DatePicker
                            // sx={{
                            //     '& input': {
                            //         color: 'white', // Цвет текста в поле ввода
                            //     },
                            //     // '& .MuiFormControl-root': {
                            //     //     width: isXUltraSmallScreen ? '100%' : isUltraSmallScreen ? '24ch' : '47',
                            //     // },
                            slotProps={{ textField: { size: 'small', color: 'warning' } }}
                            value={startDate}
                            onChange={handleStartDateChange}
                        />
                    </DemoItem>
                    <DemoItem label="End Date"
                    sx={{
                        width: isXUltraSmallScreen ? '100%' : isUltraSmallScreen ? '24ch' : isExtraSmallScreen ? '27ch' : isSmallScreen ? '27ch' : '27ch',
                    }}
                    >
                        <DatePicker
                            // sx={{
                            //     // '& input': {
                            //     //     color: 'white',
                            //     // },
                            //     '& .MuiFormControl-root': {
                            //         width: isXUltraSmallScreen ? '100%' : isUltraSmallScreen ? '24ch' : '27',
                            //     }
                            // }}
                           slotProps={{ textField: { size: 'small', color: 'warning' } }}
                            disableFuture={true}
                            value={endDate}
                            onChange={handleEndDateChange}
                        />
                    </DemoItem>
            </Box>
        </LocalizationProvider>
    );
}