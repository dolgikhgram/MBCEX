# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

## Настройка API доменов

Для использования собственного домена для API запросов создайте файл `.env` в корне проекта:

```env
# API Configuration
# Если хотите использовать свой домен, укажите его здесь
# Оставьте пустым для использования оригинальных API

# Домен для API Центрального Банка РФ
# Пример: https://api.yourdomain.com/cbrf
VITE_API_CBRF_URL=https://www.cbr-xml-daily.ru/daily_json.js

# Домен для API Московской биржи (MOEX)
# Пример: https://api.yourdomain.com/moex
VITE_API_MOEX_URL=https://iss.moex.com/iss/engines/currency/markets/selt/boards/CETS/securities
```

**Важно:**

- В Vite переменные окружения должны начинаться с префикса `VITE_`
- После изменения `.env` файла перезапустите dev сервер
- Файл `.env` уже добавлен в `.gitignore` и не будет закоммичен в репозиторий

## Деплой на GitHub Pages

Проект поддерживает два способа деплоя на GitHub Pages:

### Способ 1: Автоматический деплой через GitHub Actions (Рекомендуется)

Проект автоматически деплоится при каждом push в ветку `main` через GitHub Actions workflow.

**Первоначальная настройка:**

1. Включите GitHub Pages в настройках репозитория:
    - Перейдите в `Settings` → `Pages`
    - В разделе `Source` выберите `GitHub Actions`

2. (Опционально) Если используете свой домен для API в production:
    - Перейдите в `Settings` → `Secrets and variables` → `Actions`
    - Нажмите `New repository secret`
    - Добавьте секреты:
        - `VITE_API_CBRF_URL` - URL для API ЦБ РФ
        - `VITE_API_MOEX_URL` - URL для API MOEX

3. Сделайте push в ветку `main`:

    ```bash
    git add .
    git commit -m "Deploy to GitHub Pages"
    git push origin main
    ```

4. GitHub Actions автоматически соберет и задеплоит проект. Проверьте статус в разделе `Actions`.

5. После успешного деплоя сайт будет доступен по адресу:
   `https://dolgikhgram.github.io/MBCEX/`

### Способ 2: Ручной деплой через gh-pages

Если нужно задеплоить вручную:

```bash
npm run deploy
```

Эта команда автоматически:

1. Соберет проект (`npm run build`)
2. Задеплоит содержимое папки `dist` в ветку `gh-pages`

**Важно для ручного деплоя:**

- Убедитесь, что в `package.json` указан правильный `homepage`
- Для production переменные окружения нужно задать перед сборкой:
    ```bash
    export VITE_API_CBRF_URL="https://your-api.com/cbrf"
    export VITE_API_MOEX_URL="https://your-api.com/moex"
    npm run deploy
    ```

### Проверка после деплоя

После деплоя проверьте:

- ✅ Сайт доступен по правильному URL
- ✅ Все ресурсы (CSS, JS, изображения) загружаются
- ✅ API запросы работают корректно
- ✅ Маршрутизация работает (если используете React Router)

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is enabled on this template. See [this documentation](https://react.dev/learn/react-compiler) for more information.

Note: This will impact Vite dev & build performances.

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
    globalIgnores(["dist"]),
    {
        files: ["**/*.{ts,tsx}"],
        extends: [
            // Other configs...

            // Remove tseslint.configs.recommended and replace with this
            tseslint.configs.recommendedTypeChecked,
            // Alternatively, use this for stricter rules
            tseslint.configs.strictTypeChecked,
            // Optionally, add this for stylistic rules
            tseslint.configs.stylisticTypeChecked,

            // Other configs...
        ],
        languageOptions: {
            parserOptions: {
                project: ["./tsconfig.node.json", "./tsconfig.app.json"],
                tsconfigRootDir: import.meta.dirname,
            },
            // other options...
        },
    },
]);
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from "eslint-plugin-react-x";
import reactDom from "eslint-plugin-react-dom";

export default defineConfig([
    globalIgnores(["dist"]),
    {
        files: ["**/*.{ts,tsx}"],
        extends: [
            // Other configs...
            // Enable lint rules for React
            reactX.configs["recommended-typescript"],
            // Enable lint rules for React DOM
            reactDom.configs.recommended,
        ],
        languageOptions: {
            parserOptions: {
                project: ["./tsconfig.node.json", "./tsconfig.app.json"],
                tsconfigRootDir: import.meta.dirname,
            },
            // other options...
        },
    },
]);
```
