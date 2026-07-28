import express, { Application, Request, Response } from "express";
import router from "./route/index";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { errorHandler } from "./middleware/errorHandler";
import { apiLimiter } from "./middleware/rateLimiter";
import { notFound } from "./middleware/notFound";
import { shutdown, unhandledError } from "./config/server";



dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 5000;
const DB_URL = process.env.DB_URL;

// ---------- Global Middleware ----------
app.use(helmet());
app.use(cors({ origin: process.env.CLIENT_URL , credentials: true }));
app.use(express.json({}));
app.use(apiLimiter);


// ---------- Health Check ----------
app.get("/health", (_req: Request, res: Response) => {
  res.status(200).json({ status: "ok", uptime: process.uptime() });
});
 
// ---------- Routes ----------
app.use(router);
app.use(notFound);
app.use(errorHandler);


async function startServer() {
  try {
    if (!DB_URL) throw new Error("DATABASE_URL is not defined");
    await mongoose.connect(DB_URL);
    console.log("[db] MongoDB connected");
    app.listen(PORT, () => {
      console.log(`[server] Listening on port ${PORT} (${process.env.NODE_ENV || "development"})`);
    });
  } catch (err) {
    console.error("[startup] Failed to start server:", err);
    process.exit(1);
  }
}

// Graceful shutdown
process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));
process.on("uncaughtException",(error) => unhandledError(error));
process.on("uncaughtException",(reason) => unhandledError(reason));

startServer();

export default app; 