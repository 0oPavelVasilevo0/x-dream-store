import { useState, useEffect } from 'react'
import { Jokes } from '../(pages)/api/jokesRoute/jokesData';

interface JokesData {
    jokes: any[];
}

const useJokesData = () => {
    const [data, setData] = useState<JokesData | null>(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const jokesData = await Jokes()
                setData({
                    jokes: jokesData,
                });
            } catch (error) {
                console.error('Error fetching complex data:', error)
            }
        };

        fetchData();
    }, []);

    return data;
};

export default useJokesData;