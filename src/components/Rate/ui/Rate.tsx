import s from "./Rate.module.css";
import { useEffect, useState } from "react";
import { fetchExchangeRatesCBRF } from "../api/ExchangeApi.ts";

const Rate = () => {
    const [usdRate, setUsdRate] = useState<number | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [lastUpdateTime, setLastUpdateTime] = useState<Date | null>(null);

    useEffect(() => {
        const loadRate = async (retryCount = 0) => {
            const MAX_RETRIES = 3;
            const RETRY_DELAY = 2000; // 2 секунды

            try {
                setError(null);
                setLoading(true);

                const data = await fetchExchangeRatesCBRF();

                if (data && data.pairs) {
                    // Находим USD курс
                    const usdData = data.pairs.find((pair) => pair.code === "USD");
                    if (usdData && usdData.buyRate) {
                        const newRate = usdData.buyRate;
                        const updateTime = new Date();

                        // Всегда обновляем время обновления для принудительного перерендера
                        setLastUpdateTime(updateTime);

                        // Принудительно обновляем состояние курса
                        setUsdRate(newRate);
                    } else {
                        if (retryCount < MAX_RETRIES) {
                            setTimeout(() => loadRate(retryCount + 1), RETRY_DELAY);
                            return;
                        }
                        setError("Курс USD не найден");
                    }
                } else {
                    if (retryCount < MAX_RETRIES) {
                        setTimeout(() => loadRate(retryCount + 1), RETRY_DELAY);
                        return;
                    }
                    setError("Ошибка загрузки курса");
                }
            } catch (err) {
                console.error("Error fetching USD rate:", err);

                if (retryCount < MAX_RETRIES) {
                    setTimeout(() => loadRate(retryCount + 1), RETRY_DELAY);
                    return;
                }

                setError("Ошибка загрузки курса");
            } finally {
                setLoading(false);
            }
        };

        loadRate();

        // Обновляем курс каждые 30 минут
        const interval = setInterval(() => {
            loadRate();
        }, 1800000);

        // Обновляем курс при возврате фокуса на окно браузера
        const handleFocus = () => {
            loadRate();
        };

        // Обновляем курс при изменении видимости страницы (возврат на вкладку)
        const handleVisibilityChange = () => {
            if (!document.hidden) {
                loadRate();
            }
        };

        window.addEventListener("focus", handleFocus);
        document.addEventListener("visibilitychange", handleVisibilityChange);

        return () => {
            clearInterval(interval);
            window.removeEventListener("focus", handleFocus);
            document.removeEventListener("visibilitychange", handleVisibilityChange);
        };
    }, []);

    // Рассчитываем курсы обмена (продажа на 4.73% больше от ЦБ для получения 84.7, покупка на 0.48% меньше от ЦБ для получения 80.5)
    const sellRate = usdRate ? usdRate * 1.0473 : null;
    const buyRate = usdRate ? usdRate * 0.9952 : null;

    return (
        <div className={s.container}>
            <div className={s.title}>Обменный курс USDT</div>
            <div className={s.boxContainer}>
                <div className={s.rateContainer}>
                    <div className={s.priceBox}>
                        <div className={s.priceLabel}>Продажа</div>
                        {loading ? (
                            <div className={s.loadingText}>Загрузка...</div>
                        ) : error || !sellRate ? (
                            <div className={s.errorText}>80₽</div>
                        ) : (
                            <div className={s.price}>{sellRate.toFixed(2)}₽</div>
                        )}
                    </div>
                    <div className={s.divider}></div>
                    <div className={s.priceBox}>
                        <div className={s.priceLabel}>Покупка</div>
                        {loading ? (
                            <div className={s.loadingText}>Загрузка...</div>
                        ) : error || !buyRate ? (
                            <div className={s.errorText}>84.4₽</div>
                        ) : (
                            <div className={s.price}>{buyRate.toFixed(2)}₽</div>
                        )}
                    </div>
                </div>
                <div className={s.informationContainer}>
                    <div className={s.infoItem}>
                        <div className={s.infoIcon}>✓</div>
                        <div className={s.infotext}>Точный курс фиксируется во время сделки</div>
                    </div>
                    <div className={s.infoItem}>
                        <div className={s.infoIcon}>
                            <svg
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" fill="none" />
                                <path
                                    d="M8 4V8L11 10"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </div>
                        <div className={s.infotext}>Время обработки заявки от 30 до 60 минут</div>
                    </div>
                    <div className={s.infoItem}>
                        <div className={s.infoIcon}>₽</div>
                        <div className={s.infotext}>Минимальная сумма сделки 20.000₽</div>
                    </div>
                </div>
                {!loading && usdRate && !error && (
                    <div className={s.cbrfBadge} key={lastUpdateTime?.getTime()}>
                        Курс ЦБ: {usdRate.toFixed(2)}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Rate;
