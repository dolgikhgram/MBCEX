import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
    base: '/MBCEX/',
    plugins: [
        react({
            babel: {
                plugins: [['babel-plugin-react-compiler']],
            },
        }),
    ],
    build: {
        rollupOptions: {
            output: {
                manualChunks: {
                    // Разделяем vendor библиотеки на отдельные чанки
                    'react-vendor': ['react', 'react-dom'],
                    'lottie-vendor': ['@lottiefiles/dotlottie-react'],
                },
            },
        },
        // Увеличиваем лимит предупреждения до 1000 KB
        chunkSizeWarningLimit: 1000,
    },
})
