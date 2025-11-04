# Инструкция по деплою на GitHub Pages

## Быстрый старт

### Автоматический деплой (рекомендуется)

1. **Включите GitHub Pages:**
   - GitHub → Settings → Pages
   - Source: выберите **"GitHub Actions"**

2. **Сделайте push в main:**
   ```bash
   git push origin main
   ```

3. **Готово!** Сайт будет доступен через несколько минут по адресу:
   `https://dolgikhgram.github.io/MBCEX/`

### Ручной деплой

```bash
npm run deploy
```

## Настройка API доменов для production

Если нужно использовать свой домен для API в production:

1. **GitHub Secrets** (для автоматического деплоя):
   - Settings → Secrets and variables → Actions
   - Добавьте секреты:
     - `VITE_API_CBRF_URL`
     - `VITE_API_MOEX_URL`

2. **Или задайте переменные перед ручным деплоем:**
   ```bash
   export VITE_API_CBRF_URL="https://your-api.com/cbrf"
   export VITE_API_MOEX_URL="https://your-api.com/moex"
   npm run deploy
   ```

## Проверка после деплоя

✅ Откройте сайт и проверьте:
- Загружаются ли все ресурсы
- Работают ли API запросы
- Корректно ли отображаются курсы валют
