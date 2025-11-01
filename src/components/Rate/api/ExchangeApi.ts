import type { ExchangeRates } from "../../../types/currency.ts";

// Конфигурация для различных источников API
const API_SOURCES = {
    MOEX: {
        baseUrl: "https://iss.moex.com/iss/engines/currency/markets/selt/boards/CETS/securities",
        pairs: ["USD_RUB__TOM", "EUR_RUB__TOM"],
    },
    CB_RF: {
        baseUrl: "https://www.cbr-xml-daily.ru/daily_json.js",
    },
} as const;

// Получение курсов обмена с Московской биржи (MOEX)
export const fetchExchangeRatesMOEX = async (): Promise<ExchangeRates | null> => {
    try {
        const pairs = [];

        for (const pair of API_SOURCES.MOEX.pairs) {
            const response = await fetch(`${API_SOURCES.MOEX.baseUrl}/${pair}.json?iss.meta=off`);

            if (!response.ok) {
                continue;
            }

            const data = await response.json();
            const marketData = data.marketdata?.data?.[0];

            if (marketData) {
                const [last, low, high] = marketData;
                pairs.push({
                    code: pair.split("_")[0], // USD, EUR и т.д.
                    name: pair,
                    buyRate: last || 0,
                    sellRate: last || 0,
                    spread: high - low,
                    timestamp: new Date().toISOString(),
                });
            }
        }

        if (pairs.length === 0) {
            return null;
        }

        return {
            timestamp: new Date().toISOString(),
            base: "RUB",
            pairs,
        };
    } catch (error) {
        console.error("Error fetching MOEX data:", error);
        return null;
    }
};

// Получение курсов обмена с Центрального Банка РФ
export const fetchExchangeRatesCBRF = async (): Promise<ExchangeRates | null> => {
    try {
        const response = await fetch(API_SOURCES.CB_RF.baseUrl);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        const pairs = [];

        // Обрабатываем основные валюты
        const currencies = ["USD", "EUR", "GBP", "CNY"];

        for (const currency of currencies) {
            const currencyData = data.Valute?.[currency];

            if (currencyData) {
                pairs.push({
                    code: currency,
                    name: currencyData.Name,
                    buyRate: currencyData.Value,
                    sellRate: currencyData.Value,
                    spread: 0,
                    timestamp: data.Date,
                });
            }
        }

        return {
            timestamp: data.Date,
            base: "RUB",
            pairs,
        };
    } catch (error) {
        console.error("Error fetching CBRF data:", error);
        return null;
    }
};

// Основная функция для получения курсов обмена
export const fetchExchangeRates = async (source: "MOEX" | "CBRF" = "MOEX"): Promise<ExchangeRates | null> => {
    if (source === "MOEX") {
        return await fetchExchangeRatesMOEX();
    } else {
        return await fetchExchangeRatesCBRF();
    }
};
