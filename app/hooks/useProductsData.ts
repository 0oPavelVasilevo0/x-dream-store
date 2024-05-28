import { useState, useEffect } from 'react';
import { Products } from '../(pages)/api/productsRoute/productsData';

interface Product {
    products: any[];
    // code?: number,
    // msg?: string
    // title: string;
    // explanation: string;
    // date: string;
    // url: string;
    // hdurl: string;
    // media_type: string;
    // service_version: string;
}
// interface ProductError {
//     code?: number,
//     msg?: string
// }

const useProductsData = (startDate: string, endDate: string) => {
    const [data, setData] = useState<Product | null>(null);
    const [isLoading, setIsLoading] = useState(true);//состояние отслеживания загрузки
    // const [error, setError] = useState<ProductError | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);//начало загрузки
                const productsData = await Products(startDate, endDate);
                setError(null);
                setData({
                    products: productsData,
                    // products: Array.isArray(productsData) ? productsData : [],
                });

            } catch (error: any) {

                console.error('Error fetching complex data:', error);

                if (error.response && error.response.data && error.response.data.msg) {
                    setError(error.response.data.msg); // сохранить сообщение об ошибке
                } else {
                    setError('An unexpected error occurred');
                }
            } finally {
                setIsLoading(false);//после завершения загрузки
            }
        };
        fetchData();
    }, [startDate, endDate]
    );

    return { data, isLoading, error };

};

export default useProductsData;