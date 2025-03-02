# Lab JWT

## 📌 Prerequisites

Ensure you have the following installed on your local machine:

- [Node.js](https://nodejs.org/) (LTS version recommended)
- [PostgreSQL](https://www.postgresql.org/)
- Installation for macos [Postgresapp](https://postgresapp.com/)
- Installation for windows [PostgresSQL](https://www.w3schools.com/postgresql/postgresql_install.php)
- [Git](https://git-scm.com/)

---

## 🚀 Setup Instructions

### 1️⃣ Clone the Repository

```sh
git clone https://github.com/wittech/lab-jwt.git
cd lab-jwt
```

### 2️⃣ Install Dependencies

```sh
npm install
```

### 3️⃣ Setup Environment Variables

Create a `.env` file based on `.env.example`:

```sh
cp .env.example .env
```

Then, update the `.env` file with your database credentials and secret keys.

### 4️⃣ Run PostgreSQL Database

Ensure your local PostgreSQL server is running and create the database as per your `.env` file.

### 5️⃣ Run Database Migrations

```sh
npm run migrate
npm run seed
```

### 6️⃣ Start the Development Server

```sh
npm start
```

By default, the server runs on `http://localhost:3000`.

---

## 🛠 API Testing

Use [Postman](https://www.postman.com/) or `curl` to test API endpoints.
For example, testing the authentication API:

```sh
curl -X POST http://localhost:3000/api/auth/login -H "Content-Type: application/json" -d '{"email":"test@example.com", "password":"password"}'
```

---

## 📁 Project Structure

```
/node-express-postgres-jwt
  ├── src
  │   ├── config
  │   ├── controllers
  │   ├── db
  │       ├── migration
  │       ├── seeders
  │   ├── middlewares
  │   ├── routes
  │   ├── server.js
  ├── .env.example
  ├── package.json
  ├── README.md
```

---

## 📜 Additional Notes

- Use `npm run dev` for hot-reloading during development.
- Configure logging in `config/logger.js`.
- Follow security best practices when handling JWT secrets.
