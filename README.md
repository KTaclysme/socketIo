Here's a README for your project based on the `package.json` file you provided.

---

# Messaging Application (socketIo)

A real-time messaging application built with Express, Socket.IO, TypeScript, JWT, and Prisma.

## Project Setup

### Prerequisites

Ensure you have the following installed on your machine:
- **Node.js** (v16+)
- **PostgreSQL** or **MongoDB** (depending on your setup)
- **Docker** (optional, if running via Docker)

### Installation

1. **Clone the repository:**

   ```
   git clone git@github.com:KTaclysme/socketIo.git
   cd socketIo
   ```

2. **Install dependencies:**

   Install the required Node.js dependencies using `npm` or `yarn`.

   ```
   npm install
   ```

   or

   ```
   yarn install
   ```

3. **Configure environment variables:**

   Create a `.env` file in the root directory and configure your database:

   ```
   DATABASE_URL=postgresql://username:password@localhost:5432/mydb
   ```

   Adjust the `DATABASE_URL` to match your PostgreSQL/MongoDB credentials.

4. **Set up Prisma:**

   Initialize Prisma and generate the client based on your schema.

   ```
   npx prisma migrate dev
   ```

   This will apply your database migrations.

5. **Seed the database:**

   Run the seeding script to add a default user.

   ```
   npm run seed
   ```

### Running the Project

#### 1. Development Mode

To start the application in development mode:

```
npm run dev
```

This will use `tsx` to watch your TypeScript files and restart the server on changes.

#### 2. Running with Docker (Optional)

If you prefer using Docker, you can run the application with Docker Compose:

```
npm run dev:docker
```

This will spin up the application along with any defined services in `docker-compose.yml`.

### Features

- **Real-time messaging:** Built using Socket.IO for real-time chat functionality.
- **User authentication:** Secure user login and registration using JWT.
- **Friend system:** Add and view friends using Prisma's database integration.
- **Online status:** Display whether users are online or offline.

### Technologies Used

- **Backend:**
  - [Express](https://expressjs.com/) - Web framework for Node.js
  - [Socket.IO](https://socket.io/) - Real-time engine
  - [Prisma](https://www.prisma.io/) - ORM for database management
  - [JWT](https://jwt.io/) - Authentication using JSON Web Tokens
  - [PostgreSQL](https://www.postgresql.org/) or [MongoDB](https://www.mongodb.com/) - Database

- **Development:**
  - [TypeScript](https://www.typescriptlang.org/) - Typed JavaScript
  - [tsx](https://github.com/esbuild-kit/tsx) - TS execution for Node.js

### Development Notes

- **Prisma Client:** Every time you modify the Prisma schema, run:

  ```
  npx prisma generate
  ```

  This ensures the Prisma client is updated with your latest schema changes.

- **Database Migrations:** To create new database migrations, use:

  ```
  npx prisma migrate dev --name migration_name
  ```

### License

This project is licensed under the ISC License.

---

Feel free to replace `https://github.com/yourusername/socketIo.git` with the actual repository link if you want to include it. Let me know if you'd like any additional sections!
