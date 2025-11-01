import type { CryptoKey } from "../types/crypto";

export const CRYPTO_COINS: CryptoKey[] = ["bitcoin", "ethereum", "litecoin", "solana", "tron", "the-open-network"];

export const CRYPTO_NAMES: Record<CryptoKey, string> = {
    bitcoin: "BTC",
    ethereum: "ETH",
    litecoin: "LTC",
    solana: "SOL",
    tron: "TRX",
    "the-open-network": "TON",
};

export const CRYPTO_IMAGE_PATHS: Record<CryptoKey, string> = {
    bitcoin: "cryptoDisplay/BTC.svg",
    ethereum: "cryptoDisplay/ETH.svg",
    litecoin: "cryptoDisplay/LTC.svg",
    solana: "cryptoDisplay/SOL.svg",
    tron: "cryptoDisplay/TRX.svg",
    "the-open-network": "cryptoDisplay/TON.svg",
};

// Объединенный объект для удобства
export const CRYPTO_CONFIG = {
    coins: CRYPTO_COINS,
    names: CRYPTO_NAMES,
    images: CRYPTO_IMAGE_PATHS,
} as const;

// Утилиты для работы с криптовалютами
export const getCryptoDisplayName = (key: CryptoKey): string => {
    return CRYPTO_NAMES[key] || key;
};

export const getCryptoImagePath = (key: CryptoKey): string => {
    const path = CRYPTO_IMAGE_PATHS[key] || "default-crypto.svg";
    return `${import.meta.env.BASE_URL}${path}`;
};

// Валидация конфигурации
export const validateCryptoConfig = (): boolean => {
    const coins = Object.keys(CRYPTO_NAMES) as CryptoKey[];
    const images = Object.keys(CRYPTO_IMAGE_PATHS) as CryptoKey[];

    if (coins.length !== images.length) {
        console.error("Mismatch between crypto names and images");
        return false;
    }

    // Проверяем, что все монеты из CRYPTO_COINS есть в других объектах
    const missingInNames = CRYPTO_COINS.filter((coin) => !CRYPTO_NAMES[coin]);
    const missingInImages = CRYPTO_COINS.filter((coin) => !CRYPTO_IMAGE_PATHS[coin]);

    if (missingInNames.length > 0) {
        console.error("Missing names for coins:", missingInNames);
        return false;
    }

    if (missingInImages.length > 0) {
        console.error("Missing images for coins:", missingInImages);
        return false;
    }

    return true;
};
