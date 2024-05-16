import axios, { AxiosRequestConfig } from 'axios';

export async function Products(startDate: string, endDate: string): Promise<any> {

    try {
        const config: AxiosRequestConfig = {
            headers: {
                'content-type': 'application/json'
            },
             params: {
                start_date: startDate,
                end_date: endDate,
            }
        };

        const apiKey = process.env.NEXT_PUBLIC_NASA_API_KEY;

        if (!apiKey) {
            throw new Error('NASA_API_KEY is not set in environment variables');
        }

        const url = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`;
        const response = await axios.get(url, config);
        return response.data;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw new Error('Error fetching products');
    }
}

export async function ProductsCount(count: number): Promise<any> {

    try {
        const config: AxiosRequestConfig = {
            headers: {
                'content-type': 'application/json'
            },
            params: {
                count: count
            }
        };

        const apiKey = process.env.NEXT_PUBLIC_NASA_API_KEY;

        if (!apiKey) {
            throw new Error('NASA_API_KEY is not set in environment variables');
        }

        const url = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`;
        const response = await axios.get(url, config);
        return response.data;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw new Error('Error fetching products');
    }
}