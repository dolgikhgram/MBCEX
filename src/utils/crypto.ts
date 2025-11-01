import type { CryptoKey } from "../types/crypto";
import { CRYPTO_NAMES, CRYPTO_IMAGE_PATHS } from "../constants/crypto";

/**
 * Получить отображаемое имя криптовалюты
 * @param key - ключ криптовалюты
 * @returns отображаемое имя или исходный ключ
 */
export const getCryptoDisplayName = (key: CryptoKey): string => {
    return CRYPTO_NAMES[key] || key;
};

/**
 * Получить путь к изображению криптовалюты
 * @param key - ключ криптовалюты
 * @returns путь к изображению или путь к изображению по умолчанию
 */
export const getCryptoImagePath = (key: CryptoKey): string => {
    const path = CRYPTO_IMAGE_PATHS[key] || "default-crypto.svg";
    return `${import.meta.env.BASE_URL}${path}`;
};

/**
 * Форматировать цену до 2 знаков после точки
 * @param price - цена
 * @returns отформатированная цена
 */
export const formatCryptoPrice = (price: number): string => {
    return price.toFixed(2);
};

/**
 * Форматировать процентное изменение с цветом
 * @param change - изменение в процентах
 * @returns объект с отформатированным текстом и цветом
 */
export const formatCryptoChange = (change: number) => {
    const isPositive = change >= 0;
    const formattedChange = Math.abs(change).toFixed(2);
    const sign = isPositive ? "+ " : "- ";
    const color = isPositive ? "#00ff00" : "#ff0000";

    return {
        text: `${sign}${formattedChange}%`,
        color,
        isPositive,
    };
};

/**
 * Проверить, является ли ключ валидной криптовалютой
 * @param key - ключ для проверки
 * @returns true если ключ валидный
 */
export const isValidCryptoKey = (key: string): key is CryptoKey => {
    return key in CRYPTO_NAMES;
};
