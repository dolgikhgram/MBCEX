import {useEffect, useState} from "react";
import {fetchExchangeRates} from "./ExchangeApi.ts";
import type {ExchangeRates} from "../../../types/currency.ts";

/**
 * Пример использования API для получения курсов обмена валют
 * Этот компонент демонстрирует, как использовать API для получения данных с MOEX или ЦБ РФ
 */
export const ExchangeRatesExample = () => {
    const [rates, setRates] = useState<ExchangeRates | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadRates = async () => {
            setLoading(true);
            setError(null);

            try {
                // Используем MOEX как источник данных
                const data = await fetchExchangeRates("MOEX");

                // Или можно использовать ЦБ РФ:
                // const data = await fetchExchangeRates('CBRF');

                if (data) {
                    setRates(data);
                } else {
                    setError("Не удалось получить данные");
                }
            } catch (err) {
                console.error("Error fetching exchange rates:", err);
                setError("Ошибка при загрузке данных");
            } finally {
                setLoading(false);
            }
        };

        // Загружаем данные сразу
        loadRates();

        // Обновляем каждые 5 минут
        const interval = setInterval(loadRates, 300000);

        return () => clearInterval(interval);
    }, []);

    if (loading) return <div>Загрузка курсов...</div>;
    if (error) return <div>Ошибка: {error}</div>;
    if (!rates) return <div>Нет данных</div>;

    return (
        <div>
            <h2>Курсы обмена валют</h2>
            <p>Обновлено: {new Date(rates.timestamp).toLocaleString()}</p>
            <p>Базовая валюта: {rates.base}</p>

            <div>
                {rates.pairs.map((pair, index) => (
                    <div key={index}>
                        <h3>
                            {pair.code}: {pair.name}
                        </h3>
                        <p>Курс: {pair.buyRate.toFixed(2)}</p>
                        {pair.spread && <p>Спред: {pair.spread.toFixed(2)}</p>}
                    </div>
                ))}
            </div>
        </div>
    );
};

// Если у вас есть конкретный API MoscaEx, создайте отдельную функцию:
export const fetchMoscaExRates = async (): Promise<ExchangeRates | null> => {
    try {
        // Замените URL на реальный endpoint MoscaEx
        const response = await fetch("https://moscaex.com/api/rates");

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        // Преобразуйте данные в формат ExchangeRates
        return {
            timestamp: data.timestamp || new Date().toISOString(),
            base: data.base || "RUB",
            pairs: data.rates.map((rate: any) => ({
                code: rate.code,
                name: rate.name,
                buyRate: rate.buy,
                sellRate: rate.sell,
                spread: rate.spread,
                timestamp: rate.timestamp || new Date().toISOString(),
            })),
        };
    } catch (error) {
        console.error("Error fetching MoscaEx rates:", error);
        return null;
    }
};
