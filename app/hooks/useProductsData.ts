
import { useState, useEffect } from 'react';
import { Products } from '../(pages)/api/productsRoute/productsData';

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
    const [isLoading, setIsLoading] = useState(true);//состояние отслеживания загрузки

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);//начало загрузки
                const productsData = await Products(startDate, endDate);
                setData({
                    products: productsData,
                });
            } catch (error) {
                console.error('Error fetching complex data:', error);
            } finally {
                setIsLoading(false);//после завершения загрузки
            }
        };

        fetchData();
    }, [startDate, endDate]
    );

    return { data, isLoading };

};

export default useProductsData;