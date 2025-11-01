import type { CryptoData } from "../../../../types/crypto.ts";

export const fetchCryptoData = async (): Promise<CryptoData | null> => {
    try {
        const response = await fetch(
            "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,litecoin,solana,tron,the-open-network&vs_currencies=usd&include_24hr_change=true"
        );

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching crypto data:", error);
        return null;
    }
};
