# IQT-FSD-2026 Setup and Installation Instructions

Follow these instructions to run the Full Stack Task Manager locally.

---

## 1. Prerequisites
- **Node.js**: Recommended version 18.x or 20.x.
- **npm** (comes with Node.js) or another package manager like Yarn.
- **Internet Connection**: Required to connect to MongoDB Atlas and query the GitHub API.

---

## 2. Backend Environment Setup

### Environment Variables
Configure the backend `.env` file located in the `/backend` folder. It should contain:
```ini
PORT=5000
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/taskmanager
```
*(Note: A MongoDB Atlas database connection has been configured inside `/backend/.env` for this assessment and will work out of the box).*

### Installation & Execution
1. Open a terminal and navigate to the backend folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server (runs nodemon on port 5000):
   ```bash
   npm run dev
   ```
   You should see:
   - `Server Running On Port 5000`
   - `MongoDB Atlas Connected`

---

## 3. Frontend Environment Setup

### Configuration
By default, the frontend is configured to call `http://localhost:5000/api/tasks`. If you wish to customize this, create a `.env.local` inside the `/frontend` directory:
```ini
NEXT_PUBLIC_API_URL=http://localhost:5000/api/tasks
```

### Installation & Execution
1. Open a new terminal and navigate to the frontend folder:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the Next.js development server:
   ```bash
   npm run dev
   ```
4. Access the web application at [http://localhost:3000](http://localhost:3000).

---

## 4. Troubleshooting
- **CORS Errors**: The backend permits all origins using the `cors` package. If issues arise, verify the frontend and backend addresses match port configurations.
- **MongoDB Connection**: If the backend fails to connect, ensure your local environment permits outbound connections to port `27017` and that the Atlas connection string in `/backend/.env` is correct.
- **Port Conflict**: If port `5000` or `3000` is already in use, you can update `PORT` inside `/backend/.env` or run Next.js on a different port:
  ```bash
  npm run dev -- -p 3001
  ```
