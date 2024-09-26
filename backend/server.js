import express from "express";
import db from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import adminRoutes from "./routes/adminRoutes.js";
import cookieParser from "cookie-parser";
import cors from "cors"
import path from 'path'
import { configDotenv } from 'dotenv';
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

configDotenv();


const app = express()
app.use(
  cors({
    origin: "http://localhost:5713",
    credentials: true,
    exposedHeaders: ["set-cookie"]
  })
)
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use("/", express.static("backend/uploads"));

// Routes
app.get('/', (req, res) => {
  res.send('MERN Backend is running');
});

app.use("/api/users" , userRoutes);
app.use("/api/admin" , adminRoutes)

// Start server
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
