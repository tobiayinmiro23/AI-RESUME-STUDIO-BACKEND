import mongoose from "mongoose";

export const shutdown = async (signal: string) => {
  console.log(`[server] ${signal} received. Shutting down...`);
  await mongoose.disconnect();
  console.log("[db] MongoDB disconnected");
  process.exit(0);
};

export const unhandledError  = async (reason: Error | string) => {
  console.error("[process] Unhandled rejection:", reason);
  process.exit(1);
};