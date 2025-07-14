# Кинопоиск SPA

Простое SPA-приложение для просмотра информации о фильмах с использованием React, TypeScript и VKUI.

## 📋 Структура проекта

```
kino-spa/
├── public/
├── src/
│   ├── api/              # API-клиент Kinopoisk.dev
│   ├── components/       # Общие компоненты, если есть
│   ├── pages/            # Страницы (MainPage, FilmPage, FavoritesPage)
│   ├── store/            # MobX-сторы (filmStore, favoritesStore)
│   ├── App.tsx           # Основной компонент с маршрутизацией
│   └── main.tsx          # Точка входа
├── .env                  # Переменные окружения
├── package.json
└── vite.config.ts
```

## 🚀 Быстрый старт

### 1. Клонировать репозиторий

```bash
git clone <URL_репозитория>
cd kino-spa
```

### 2. Установить зависимости

```bash
npm install
```

### 3. Настроить переменные окружения

1. Скопируйте файл `.env.default` в `.env`:

   ```bash
   cp .env.default .env
   ```
2. В файле `.env` заполните:

   ```dotenv
   VITE_KINOPOISK_API_URL=https://api.kinopoisk.dev
   VITE_KINOPOISK_API_KEY=ваш_API_ключ
   ```

### 4. Запустить в режиме разработки

```bash
npm run dev
```

Откройте в браузере [http://localhost:5173](http://localhost:5173).

### 5. Собрать приложение для продакшена

```bash
npm run build
```

Сборка будет размещена в папке `dist/`.

## 💡 Подробности

* **Главная страница** (`/`): список фильмов с бесконечным скроллом и фильтрами по жанрам.
* **Страница фильма** (`/movie/:id`): детальная информация о выбранном фильме.
* **Избранное** (`/favorites`): фильмы, добавленные в список избранных (сохранение в `localStorage`).

## 🛠️ Технологии

* React
* TypeScript
* VKUI (VKontakte UI)
* MobX + MobX React Lite
* Axios
* Vite
* React Router
