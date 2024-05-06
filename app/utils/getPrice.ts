'use client'
import usePriceData from "../hooks/usePriceData";

//расчет прайса


const getPrice = (url: string) => {
    const complexPriceData = usePriceData()
    if (url) {
        const parts: string[] = url.split('/');
        const numberIndex = parts.findIndex((part: string) => part === 'image') + 1// Находим индекс элемента 'image' и прибавляем 1, чтобы получить следующий элемент
        const number = parts[numberIndex];
        if (number) {
            // Выполняем расчет
            const bitcoinPrice = complexPriceData && complexPriceData.bpi.USD.rate_float; // доступ к данным о цене биткоина
            const result = bitcoinPrice && (bitcoinPrice / parseInt(number)) / 10; // Парсим цифры в целое число и выполняем расчет
            return `price: ${result && result.toFixed(1)}`; // Возвращаем результат с округлением до ? знаков после запятой
        } else {
            return 'price: 0.5'; // Возвращаем "что-то", если не удается извлечь число из URL
        }
    }
};

export default getPrice;