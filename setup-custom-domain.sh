#!/bin/bash
# Скрипт для настройки пользовательского домена
# Использование: ./setup-custom-domain.sh yourdomain.com

DOMAIN=$1

if [ -z "$DOMAIN" ]; then
    echo "Ошибка: Укажите домен"
    echo "Использование: ./setup-custom-domain.sh yourdomain.com"
    exit 1
fi

# Создаем CNAME файл в public (он будет скопирован в dist при сборке)
echo "$DOMAIN" > public/CNAME

# Обновляем package.json homepage
node -e "
const fs = require('fs');
const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
pkg.homepage = 'https://$DOMAIN';
fs.writeFileSync('package.json', JSON.stringify(pkg, null, 2) + '\n');
"

echo "✅ CNAME файл создан: public/CNAME"
echo "✅ homepage обновлен в package.json"
echo ""
echo "Следующие шаги:"
echo "1. Настройте DNS записи у вашего регистратора домена"
echo "2. Добавьте домен в GitHub Pages настройках"
echo "3. Выполните: npm run deploy:custom"

