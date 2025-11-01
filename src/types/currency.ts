import { z } from "zod";

// Схема для отдельной валютной пары
export const CurrencyPairSchema = z.object({
    code: z.string(), // Код валюты (USD, EUR, RUB и т.д.)
    name: z.string(), // Название валюты
    buyRate: z.number(), // Курс покупки
    sellRate: z.number(), // Курс продажи
    spread: z.number().optional(), // Спред
    timestamp: z.string(), // Время обновления
});

export type CurrencyPair = z.infer<typeof CurrencyPairSchema>;

// Схема для ответа API обменных курсов
export const ExchangeRatesSchema = z.object({
    timestamp: z.string(),
    base: z.string(), // Базовая валюта
    pairs: z.array(CurrencyPairSchema),
});

export type ExchangeRates = z.infer<typeof ExchangeRatesSchema>;

// Типы для работы с валютами
export type CurrencyCode = "USD" | "EUR" | "RUB" | "GBP" | "CNY" | string;
