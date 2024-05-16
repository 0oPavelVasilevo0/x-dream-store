import { useState, useEffect } from 'react';
import { ProductsCount } from '../(pages)/api/productsRoute/productsData';

interface Product {
    products: any[];
}

const useProductsCount = (count: number) => {
    const [data, setData] = useState<Product | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const productsData = await ProductsCount(count);
                setData({
                    products: productsData,
                });
            } catch (error) {
                console.error('Error fetching complex data:', error);
            }
        };

        fetchData();
    }, [count]
    );

    return data;

};

export default useProductsCount;