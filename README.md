# sportpit-app

Невеликий MVP-додаток для обліку спортивних товарів:
- **frontend**: React + Vite,
- **backend**: Express + MongoDB (Mongoose),
- базовий **CRUD** для товарів та простий інтерфейс відправок/статистики.

## Структура

- `src/` — фронтенд.
- `backend/` — API сервер і модель даних.

## Вимоги

- Node.js 18+
- npm
- MongoDB (локально або хмарно)

## Налаштування

### 1) Backend `.env`

Створи файл `backend/.env`:

```env
MONGO_URI=mongodb://localhost:27017/sportpit
PORT=5000
```

### 2) Frontend `.env` (опційно)

Створи файл `.env` в корені, якщо API працює не на `http://localhost:5000`:

```env
VITE_API_URL=http://localhost:5000
```

## Встановлення залежностей

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

### Backend

```bash
cd backend
npm start
```

### Frontend

В іншому терміналі з кореня:

```bash
npm run dev
```

## Перевірки

```bash
npm run lint
npm run build
```

## Seed-скрипти

У папці `backend/` доступні:
- `seed.js`
- `seedShipments.js`
- `seedShipmentsAuto.js`

Запускати напряму через Node (за потреби):

```bash
cd backend
node seed.js
```

## Примітки

- Фронтенд бере API адресу з `VITE_API_URL`, або за замовчуванням `http://localhost:5000`.
- Для коректної роботи потрібне активне підключення backend до MongoDB.
