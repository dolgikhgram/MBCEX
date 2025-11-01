import { z } from "zod";

const CryptoCurrencySchema = z.object({
    usd: z.number(),
    usd_24h_change: z.number(),
});

export const CryptoDataSchema = z.object({
    bitcoin: CryptoCurrencySchema,
    ethereum: CryptoCurrencySchema,
    litecoin: CryptoCurrencySchema,
    solana: CryptoCurrencySchema,
    tron: CryptoCurrencySchema,
    "the-open-network": CryptoCurrencySchema,
});

export type CryptoData = z.infer<typeof CryptoDataSchema>;
export type CryptoCurrency = z.infer<typeof CryptoCurrencySchema>;

// Тип для ключей криптовалют
export type CryptoKey = keyof CryptoData;

// Тип для массива ключей криптовалют
export type CryptoKeys = CryptoKey[];
