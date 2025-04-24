# 🎓 Timesheet API

This project was developed as part of a **Bachelor’s Degree Final Project in Information Systems**. It leverages [ElysiaJS](https://elysiajs.com/) as the backend framework, [Bun](https://bun.sh/) as the JavaScript runtime, and [Prisma ORM](https://www.prisma.io/) for database management.

---

## 🚀 Installation and Setup

Follow the steps below to install and run the project locally.

### 1. Clone the Repository
```bash
git clone https://github.com/arikmpt/timesheet-api
cd timesheet-api
```

### 2. Install Depedencies
```bash
bun install
```

### 3. Configure Environment Variables
Windows Platform
```bash
copy .env.example .env
```
Linux Platform
```bash
cp .env.example .env
```

Edit the .env file with your configuration. Example:
```bash
DATABASE_URL="postgresql://USERNAME:PASSWORD@localhost:5432/DATABASENAME?schema=public"
JWT_SECRET="secret"
DEFAULT_PASSWORD="secret"
```

### 4. Run Database Migration
```bash
bunx prisma migrate dev

```

### 5. Seed the Database
```bash
bunx prisma db seed
```

### 6. Start the Development Server
```bash
bun dev
```

### 7. Access the API
Open your browser and navigate to:
```
http://localhost:3000/
```

## 📚 API Documentation

The API documentation is available at:
```bash
http://localhost:3000/swagger
```

## Project Structure
```
├── prisma/
│   ├── schema.prisma         # Prisma schema definition
│   ├── seeders/              # Database seed scripts
│   └── migrations/           # Prisma migration files
├── src/
│   ├── config.ts             # Global configuration
│   ├── constant.ts           # Constant values
│   ├── controllers/          # Request handlers
│   ├── exceptions/           # Custom exception handlers
│   ├── models/               # Database models
│   ├── plugins/              # Elysia plugins
│   ├── routes/               # API route definitions
│   ├── services/             # Business logic
│   ├── index.ts              # Entry point
│   └── types.ts              # TypeScript type definitions
├── .env.example              # Example environment variables
├── .gitignore                # Git ignored files
├── .prettierrc               # Prettier configuration
├── eslint.config.mjs         # ESLint configuration
├── README.md                 # Project documentation
├── tsconfig.json             # TypeScript configuration
└── bun.lockb                 # Bun lock file
                  
```

## ✅ TODO
 - Implement dynamic color theme
 - Integrate email API
 - Add unit tests
 - Add email notification system



## 📄 License
This project is licensed under the MIT License.
You are free to use, modify, and distribute this project in accordance with the license terms.