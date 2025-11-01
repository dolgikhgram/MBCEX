import s from "./CryptoDisplay.module.css";
import { useEffect, useState } from "react";
import { fetchCryptoData } from "../api/CryptoApi.ts";
import type { CryptoData } from "../../../../types/crypto.ts";
import { CRYPTO_COINS, CRYPTO_NAMES, CRYPTO_IMAGE_PATHS } from "../../../../constants/crypto.ts";
import { formatCryptoPrice, formatCryptoChange } from "../../../../utils/crypto.ts";
const CryptoDisplay = () => {
    const [cryptoData, setCryptoData] = useState<CryptoData | null>(null);

    // Создаем дублированный массив для бесшовной анимации
    const duplicatedCoins = [...CRYPTO_COINS, ...CRYPTO_COINS];

    useEffect(() => {
        //первоначальная загрузка данных
        const loadData = async () => {
            try {
                const data = await fetchCryptoData();
                if (data) {
                    setCryptoData(data);
                }
            } catch (error) {
                console.error("Error fetching crypto data:", error);
            }
        };

        // вызываем сразу
        loadData();

        //затем устанвливаем интервал
        const interval = setInterval(loadData, 30000);

        return () => clearInterval(interval);
    }, []);
    return (
        <div className={s.container}>
            <hr className={s.line} />
            <div className={s.containerCoins}>
                <div className={s.animatedContainer}>
                    {duplicatedCoins.map((coin, index) => (
                        <div key={`${coin}-${index}`} className={s.containerCoin}>
                            <img src={CRYPTO_IMAGE_PATHS[coin]} alt={coin} />
                            <div className={s.coinName}>{CRYPTO_NAMES[coin]}</div>
                            {cryptoData && <div className={s.price}>${formatCryptoPrice(cryptoData[coin].usd)}</div>}
                            {cryptoData && (
                                <div className={s.price}>
                                    <span style={{ color: formatCryptoChange(cryptoData[coin].usd_24h_change).color }}>
                                        {formatCryptoChange(cryptoData[coin].usd_24h_change).text}
                                    </span>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
            <hr className={s.line} />
        </div>
    );
};

export default CryptoDisplay;
