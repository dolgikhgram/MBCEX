# Настройка Prettier в WebStorm для автоформатирования при Cmd+S

## Шаг 1: Включение Prettier Integration

1. Откройте **Settings** (Cmd+,)
2. Перейдите в **Languages & Frameworks → JavaScript → Prettier**
3. В разделе **Prettier package** выберите **Manual** или используйте установленную версию
4. Проверьте, что указан путь: `node_modules/prettier`

## Шаг 2: Включение Actions on Save

1. Откройте **Settings → Tools → Actions on Save**
2. Отметьте галочку **Run Prettier**
3. Отметьте галочку **Reformat code**

## Альтернатива: Настройка Code Style

Если Prettier не работает, можно использовать встроенный форматтер:

1. **Settings → Editor → Code Style**
2. Для каждого языка настройте:
    - Tab size: 4
    - Indent: 4
    - Continuation indent: 8
3. **Settings → Editor → General → "Reformat code" on save** - включите

## Проверка работы

Откройте любой `.ts` или `.tsx` файл, нажмите Cmd+S - код должен автоматически выровняться с отступами 4 пробела.
