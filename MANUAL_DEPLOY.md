# Инструкция по ручному деплою на GitHub Pages

## Настройка GitHub Pages для ручного деплоя

1. **Откройте настройки репозитория:**
    - Перейдите в `Settings` → `Pages`

2. **Измените источник:**
    - В разделе `Build and deployment` → `Source`
    - Выберите **"Deploy from a branch"** (вместо "GitHub Actions")
    - В выпадающем списке выберите ветку: **`gh-pages`**
    - В папке выберите: **`/ (root)`**
    - Нажмите **"Save"**

3. **Деплой:**

    ```bash
    npm run deploy
    ```

4. **Проверьте результат:**
    - После выполнения команды появится ветка `gh-pages`
    - GitHub Pages автоматически задеплоит содержимое
    - Сайт будет доступен через 1-2 минуты по адресу:
      `https://dolgikhgram.github.io/MBCEX/`

## Что делает команда `npm run deploy`

Команда `npm run deploy` автоматически:

1. Запускает `npm run build` (собирает проект)
2. Использует `gh-pages` для публикации папки `dist` в ветку `gh-pages`

## Если возникают проблемы

### Ошибка: "gh-pages command not found"

```bash
npm install --save-dev gh-pages
```

### Ошибка: "fatal: A branch named 'gh-pages' already exists"

Ветка `gh-pages` уже существует. Команда автоматически обновит её.

### Проверка что всё работает:

```bash
# Проверьте что сборка работает
npm run build

# Проверьте что папка dist создана
ls -la dist

# Задеплойте
npm run deploy
```

### Проверка ветки gh-pages:

```bash
git branch -a | grep gh-pages
```

## Настройка переменных окружения для production

Если нужно использовать свои API домены:

```bash
# Linux/Mac
export VITE_API_CBRF_URL="https://your-api.com/cbrf"
export VITE_API_MOEX_URL="https://your-api.com/moex"
npm run deploy

# Windows (PowerShell)
$env:VITE_API_CBRF_URL="https://your-api.com/cbrf"
$env:VITE_API_MOEX_URL="https://your-api.com/moex"
npm run deploy

# Windows (CMD)
set VITE_API_CBRF_URL=https://your-api.com/cbrf
set VITE_API_MOEX_URL=https://your-api.com/moex
npm run deploy
```
