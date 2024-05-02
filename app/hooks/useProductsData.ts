
import { useState, useEffect } from 'react';
import { Products } from '../(pages)/api/products/productsData';

interface Product {
    products: any[];
    // title: string;
    // explanation: string;
    // date: string;
    // url: string;
    // hdurl: string;
    // media_type: string;
    // service_version: string;
}

const useProductsData = (startDate: string, endDate: string) => {
    const [data, setData] = useState<Product | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const productsData = await Products(startDate, endDate);

                setData({
                    products: productsData,
                });
            } catch (error) {
                console.error('Error fetching complex data:', error);
            }
        };

        fetchData();
    }, [startDate, endDate]
    );

    return data;

};

export default useProductsData;