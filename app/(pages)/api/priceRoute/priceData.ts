import axios, { AxiosRequestConfig } from 'axios';

export async function Price() {
    try {
        const config: AxiosRequestConfig = {
            headers: {
                'content-type': 'application/json'
            }
        };

        const response = await axios.get('https://api.coindesk.com/v1/bpi/currentprice/BTC.json', config);
        return response.data;
    } catch (error) {
        console.error('Error fetching reviews:', error);
        throw new Error('Error fetching reviews');
    }
}