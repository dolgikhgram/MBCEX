import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// Для пользовательского домена используйте base: '/'
// Для GitHub Pages subdomain используйте base: '/MBCEX/'
export default defineConfig({
    base: process.env.VITE_BASE_PATH || '/',
    plugins: [
        react({
            babel: {
                plugins: [['babel-plugin-react-compiler']],
            },
        }),
    ],
    define: {
        // Добавляем версию билда для отладки
        __BUILD_TIME__: JSON.stringify(new Date().toISOString()),
    },
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
