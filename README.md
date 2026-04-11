# sportpit-app

Невеликий MVP-додаток для обліку спортивних товарів:
- frontend: React + Vite;
- backend: Express + MongoDB (Mongoose);
- базовий CRUD для товарів, відправки та статистика.

## Структура

- `src/` - frontend.
- `backend/` - API сервер і модель даних.
- `tests/` - smoke-тести frontend-структури.

## Вимоги

- Node.js 18+
- npm
- MongoDB локально або у хмарі

## Налаштування

### Backend `.env`

Створи файл `backend/.env`:

```env
MONGO_URI=mongodb://localhost:27017/sportpit
PORT=5000
```

### Frontend `.env`

Опційно створи файл `.env` у корені, якщо API працює не на `http://localhost:5000`:

```env
VITE_API_URL=http://localhost:5000
```

## Встановлення

У корені:

```bash
npm install
```

У backend:

```bash
cd backend
npm install
```

## Запуск у development

Backend:

```bash
cd backend
npm start
```

Frontend з кореня проєкту:

```bash
npm run dev
```

## Перевірки

```bash
npm run lint
npm run build
npm run test:backend
npm run test:frontend
npm run check
```

## Seed-скрипти

У папці `backend/` доступні:
- `seed.js`
- `seedShipments.js`
- `seedShipmentsAuto.js`

Запускати напряму через Node:

```bash
cd backend
node seed.js
```

## Примітки

- Frontend бере API адресу з `VITE_API_URL`, або за замовчуванням використовує `http://localhost:5000`.
- Для повної роботи потрібне активне підключення backend до MongoDB.
