/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_API_CBRF_URL?: string;
    readonly VITE_API_MOEX_URL?: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
