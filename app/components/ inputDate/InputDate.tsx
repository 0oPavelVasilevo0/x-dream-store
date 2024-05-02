import * as React from 'react';
import dayjs from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
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

    const [startDate, setStartDate] = useState(dayjs(productStore.selectedStartDate));
    const [endDate, setEndDate] = useState(dayjs(productStore.selectedEndDate));

    const handleStartDateChange = (value: dayjs.Dayjs | null) => {
        if (value !== null) {
            const startDateDayjs = dayjs(value);
            setStartDate(startDateDayjs);
            productStore.setSelectedDates(startDateDayjs.format('YYYY-MM-DD'), dayjs(endDate).format('YYYY-MM-DD'));
        }
    };

    const handleEndDateChange = (value: dayjs.Dayjs | null) => {
        if (value !== null) {
            const endDateDayjs = dayjs(value);
            setEndDate(endDateDayjs);
            productStore.setSelectedDates(dayjs(startDate).format('YYYY-MM-DD'), endDateDayjs.format('YYYY-MM-DD'));
        }
    };


    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Box sx={{
                display: 'flex',
                color: 'white',
                // alignItems: 'center',
                width: isXUltraSmallScreen ? '100%' : isUltraSmallScreen ? '49ch' : isExtraSmallScreen ? '56ch' : isSmallScreen ? '89ch' : '120ch',
                justifyContent: 'end'
            }}>
                <DemoContainer
                    sx={{
                        width: isXUltraSmallScreen ? '100%' : isUltraSmallScreen ? '100%' : isExtraSmallScreen ? '32ch' : isSmallScreen ? '32ch' : '52ch',
                    }}
                    components={[
                        'DatePicker',
                    ]}
                >
                    <DemoItem label="Start Date">
                        <DatePicker
                            sx={{
                                '& input': {
                                    color: 'white', // Цвет текста в поле ввода
                                },
                                '& .MuiFormControl-root': {
                                    // width: '100%', // Ширина поля ввода
                                },
                            }}
                            value={startDate}
                            onChange={handleStartDateChange}
                        />
                    </DemoItem>
                    <DemoItem label="End Date">
                        <DatePicker
                            sx={{
                                '& input': {
                                    color: 'white',
                                },
                                '& .MuiFormControl-root': {
                                    // width: '100%',
                                },
                            }}
                            value={endDate}
                            onChange={handleEndDateChange}
                        />
                    </DemoItem>
                </DemoContainer>
            </Box>
        </LocalizationProvider>
    );
}