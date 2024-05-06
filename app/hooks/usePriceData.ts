import { useState, useEffect } from 'react';
import { Price } from '../(pages)/api/priceRoute/priceData';

interface PriceData {
    time: {
        updated: string;
    };
    disclaimer: string;
    bpi: {
        USD: {
            code: string;
            rate: string;
            description: string;
            rate_float: number;
        };
        BTC: {
            code: string;
            rate: string;
            description: string;
            rate_float: number;
        };
    };
}

const usePriceData = () => {
    const [data, setData] = useState<PriceData | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const priceData = await Price();
                setData(priceData);
            } catch (error) {
                console.error('Error fetching price data:', error);
            }
        };

        fetchData();
    }, []);

    return data;
};

export default usePriceData;