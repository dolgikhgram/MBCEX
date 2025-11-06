import type { ExchangeRates } from "../../../types/currency.ts";

// Конфигурация для различных источников API
// Используйте переменные окружения VITE_API_MOEX_URL и VITE_API_CBRF_URL для указания своего домена
const API_SOURCES = {
    MOEX: {
        baseUrl:
            import.meta.env.VITE_API_MOEX_URL ||
            "https://iss.moex.com/iss/engines/currency/markets/selt/boards/CETS/securities",
        pairs: ["USD_RUB__TOM", "EUR_RUB__TOM"],
    },
    CB_RF: {
        baseUrl: import.meta.env.VITE_API_CBRF_URL || "https://www.cbr-xml-daily.ru/daily_json.js",
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
        // Добавляем cache-busting параметр для предотвращения кэширования
        // Используем несколько параметров для максимальной защиты от кэширования
        const timestamp = Date.now();
        const random = Math.random().toString(36).substring(7);
        const url = `${API_SOURCES.CB_RF.baseUrl}?t=${timestamp}&r=${random}&_=${timestamp}&nocache=${timestamp}`;

        console.log("Fetching CBRF rate from:", url, {
            timestamp: new Date().toISOString(),
            url: API_SOURCES.CB_RF.baseUrl,
        });

        const response = await fetch(url, {
            method: "GET",
            cache: "no-store", // Предотвращаем кэширование браузером
            mode: "cors", // Явно указываем CORS режим
            credentials: "omit", // Не отправляем cookies
            referrerPolicy: "no-referrer", // Не отправляем referrer
        });

        console.log("CBRF API response status:", response.status, response.statusText);

        if (!response.ok) {
            const errorText = await response.text().catch(() => "Unknown error");
            throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
        }

        // Проверяем content-type (API возвращает application/javascript, но это нормально для .js файла)
        const contentType = response.headers.get("content-type");
        // API ЦБ возвращает application/javascript, но содержимое - это валидный JSON
        // Поэтому не выдаем предупреждение, если это JavaScript файл с JSON данными

        const data = await response.json().catch((parseError) => {
            throw new Error(`Failed to parse JSON response: ${parseError.message}`);
        });

        // Проверяем актуальность данных
        const responseDate = data?.Date ? new Date(data.Date) : null;
        const currentDate = new Date();
        const daysDifference = responseDate
            ? Math.floor((currentDate.getTime() - responseDate.getTime()) / (1000 * 60 * 60 * 24))
            : null;

        console.log("CBRF API response received:", {
            hasData: !!data,
            hasValute: !!data?.Valute,
            date: data?.Date,
            responseDate: responseDate?.toISOString(),
            currentDate: currentDate.toISOString(),
            daysDifference,
            valuteKeys: data?.Valute ? Object.keys(data.Valute) : [],
        });

        // Предупреждаем, если данные устарели более чем на 1 день
        if (daysDifference !== null && daysDifference > 1) {
            console.warn(
                `CBRF API data is ${daysDifference} days old. This may be due to weekends/holidays or API caching.`
            );
        }

        // Проверяем наличие данных
        if (!data || !data.Valute) {
            console.error("Invalid CBRF API response: missing Valute data", data);
            return null;
        }

        const pairs = [];

        // Обрабатываем основные валюты
        const currencies = ["USD", "EUR", "GBP", "CNY"];

        for (const currency of currencies) {
            const currencyData = data.Valute[currency];

            if (currencyData && currencyData.Value !== undefined && currencyData.Value !== null) {
                // Преобразуем Value в число (на случай, если API вернет строку)
                const value =
                    typeof currencyData.Value === "string"
                        ? parseFloat(currencyData.Value.replace(",", "."))
                        : Number(currencyData.Value);

                // Проверяем, что значение валидное число
                if (!isNaN(value) && isFinite(value) && value > 0) {
                    pairs.push({
                        code: currency,
                        name: currencyData.Name || currency,
                        buyRate: value,
                        sellRate: value,
                        spread: 0,
                        timestamp: data.Date || new Date().toISOString(),
                    });
                } else {
                    console.warn(`Invalid value for ${currency}:`, currencyData.Value);
                }
            }
        }

        // Если не удалось получить ни одной валюты, возвращаем null
        if (pairs.length === 0) {
            console.error("No valid currency pairs found in CBRF API response");
            return null;
        }

        return {
            timestamp: data.Date || new Date().toISOString(),
            base: "RUB",
            pairs,
        };
    } catch (error) {
        // Детальное логирование ошибок для отладки
        const errorMessage = error instanceof Error ? error.message : String(error);
        const isNetworkError = error instanceof TypeError && error.message.includes("fetch");

        console.error("Error fetching CBRF data:", {
            error: errorMessage,
            url: API_SOURCES.CB_RF.baseUrl,
            timestamp: new Date().toISOString(),
            isNetworkError,
            stack: error instanceof Error ? error.stack : undefined,
        });

        // Если это сетевая ошибка, это может быть проблема с CORS или доступностью API
        if (isNetworkError) {
            console.error("Network error detected. Possible causes: CORS, network connectivity, or API unavailable.");
        }

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
