# Order Summary API

Express + TypeScript + Prisma + PostgreSQL

## Project Structure

```
src/
├── index.ts              # Express app entry point
├── prisma.ts             # Prisma client instance
├── types/
│   └── summaryQuery.ts   # Query type definitions
├── controllers/
│   ├── order.controller.ts
│   └── category.controller.ts
├── routes/
│   ├── order.route.ts
│   └── category.route.ts
├── services/
│   ├── order.service.ts
│   ├── order-mock.service.ts
│   ├── category.service.ts
│   └── category-mock.service.ts
└── seed/
    └── seed.ts           # Database seeder
prisma/
├── schema.prisma
└── migrations/
```

## ER Diagram

![ER Diagram](assets/er-diagram.jpg)

## Setup

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Setup database**
   ```bash
   # Option A: Using Docker
   docker-compose up -d

   # Option B: PostgreSQL locally
   # Create database "order_summary_db"
   ```

3. **Configure environment**
   ```bash
   # Edit .env with your DATABASE_URL
   DATABASE_URL="postgresql://admin:admin@localhost:5432/order_summary_db"
   ```

4. **Run database migrations**
   ```bash
   npx prisma migrate dev
   ```

5. **Generate Prisma client**
   ```bash
   npx prisma generate
   ```

6. **Seed database (optional)**
   ```bash
   npm run seed
   ```

## Development

```bash
# Start dev server with hot reload
npm run dev
```

Server runs on `http://localhost:3000`

## API Endpoints

- `GET /api/orders/summary` - Get order summary with filters
- `GET /api/categories` - Get categories (with optional subCategoryId filter)

### Query Parameters (Orders)

| Parameter | Type | Description |
|-----------|------|-------------|
| startDate | string | Filter orders from date (ISO) |
| endDate | string | Filter orders to date (ISO) |
| categoryId | string | Filter by category ID |
| subCategoryId | string | Filter by subcategory ID |
| orderId | string | Search by order ID |
| orderIdMatch | string | Order ID match type: "exact" or "contains" (default: "contains") |
| minPrice | number | Minimum price filter |
| maxPrice | number | Maximum price filter |
| grade | string | Filter by grade (A, B, C, D) |
| page | number | Page number (default: 1) |
| limit | number | Items per page (default: 20) |
