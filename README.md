# portal-backend

### При локальном запуске в свойствах базы данных (Definition) задаём:
Encoding        UTF-8

Template        Template0

Collation       ru_RU.UTF-8

Character type  ru_RU.UTF-8

### Работа с Docker
#### Перед запуском необходимо отредактировать значения БД в env файле

Запуск Docker контейнеров

docker-compose --project-name="ses" up -d

Остановка Docker контейнеров

docker-compose --project-name="ses" down
