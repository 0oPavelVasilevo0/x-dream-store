import axios, { AxiosRequestConfig } from 'axios';

export async function Jokes() {
    try {
        const config: AxiosRequestConfig = {
            headers: {
                'content-type': 'application/json'
            }
        };

        const response = await axios.get('https://official-joke-api.appspot.com/jokes/programming/ten', config);
        return response.data;
    } catch (error) {
        console.error('Error fetching reviews:', error);
        throw new Error('Error fetching reviews');
    }
}