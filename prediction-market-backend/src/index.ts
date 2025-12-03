import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import dotenv from "dotenv";
import router from "./router";
import http from "http";
import mongoose from "mongoose";
import { initialize } from "./controller";
import { connectMongoDB, initialSettings } from "./config";
import { Cluster } from "@solana/web3.js";

// Load environment variables
dotenv.config();

// Environment configuration
const PORT = process.env.PORT || "9000";
const NODE_ENV = process.env.NODE_ENV || "development";
const SOLANA_CLUSTER = (process.env.SOLANA_CLUSTER as Cluster) || "devnet";

// Validate required environment variables
const requiredEnvVars = ["DB_URL"];
const missingEnvVars = requiredEnvVars.filter((key) => !process.env[key]);

if (missingEnvVars.length > 0) {
  console.error("❌ Missing required environment variables:", missingEnvVars.join(", "));
  process.exit(1);
}

// Initialize Express application
const app = express();
const server = http.createServer(app);

// Security and performance middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN || "*",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// Body parsing middleware (removed duplicate body-parser usage)
app.use(express.json({ 
  limit: '50mb',
  verify: (req: Request, res: Response, buf: Buffer) => {
    // Store raw body for potential signature verification
    (req as any).rawBody = buf;
  }
}));
app.use(express.urlencoded({ 
  limit: '50mb', 
  extended: true 
}));

// Request logging middleware
if (NODE_ENV === "development") {
  app.use((req: Request, res: Response, next: NextFunction) => {
    const start = Date.now();
    res.on("finish", () => {
      const duration = Date.now() - start;
      console.log(`${req.method} ${req.originalUrl} ${res.statusCode} - ${duration}ms`);
    });
    next();
  });
}

// Health check endpoint (before routes for quick access)
app.get("/health", (req: Request, res: Response) => {
  res.status(200).json({
    status: "ok",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: NODE_ENV,
    cluster: SOLANA_CLUSTER
  });
});

// Root endpoint
app.get("/", (req: Request, res: Response) => {
  res.json({
    message: "💕 Welcome to Prediction market server! 💕",
    version: "1.0.0",
    status: "running",
    documentation: "/api"
  });
});

// API routes
app.use("/api", router);

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({
    error: "Not Found",
    message: `Cannot ${req.method} ${req.originalUrl}`,
    path: req.originalUrl
  });
});

// Global error handler middleware (must be last)
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error("❌ Unhandled error:", err);

  const statusCode = (err as any).statusCode || 500;
  const message = NODE_ENV === "production" 
    ? "Internal Server Error" 
    : err.message;

  res.status(statusCode).json({
    error: "Internal Server Error",
    message,
    ...(NODE_ENV === "development" && { stack: err.stack })
  });
});

// Initialize services
const initializeServices = async () => {
  try {
    // Connect to MongoDB
    await connectMongoDB();

    // Initialize Solana program
    const { creatorFeeAmount, marketCount, decimal, fundFeePercentage, bettingFeePercentage } = initialSettings;
    
    await initialize(SOLANA_CLUSTER, {
      creatorFeeAmount,
      marketCount,
      decimal,
      fundFeePercentage,
      bettingFeePercentage
    });

    console.log(`✅ Services initialized successfully`);
  } catch (error) {
    console.error("❌ Failed to initialize services:", error);
    process.exit(1);
  }
};

// Graceful shutdown handler
const gracefulShutdown = (signal: string) => {
  console.log(`\n${signal} received. Starting graceful shutdown...`);

    server.close(() => {
      console.log("✅ HTTP server closed");
      
      // Close MongoDB connection
      mongoose.connection.close(false, () => {
        console.log("✅ MongoDB connection closed");
        process.exit(0);
      });

      // Force exit after timeout
      setTimeout(() => {
        console.error("❌ Forced shutdown after timeout");
        process.exit(1);
      }, 10000);
    });
};

// Handle shutdown signals
process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
process.on("SIGINT", () => gracefulShutdown("SIGINT"));

// Handle unhandled promise rejections
process.on("unhandledRejection", (reason: unknown, promise: Promise<unknown>) => {
  console.error("❌ Unhandled Rejection at:", promise, "reason:", reason);
});

// Handle uncaught exceptions
process.on("uncaughtException", (error: Error) => {
  console.error("❌ Uncaught Exception:", error);
  gracefulShutdown("uncaughtException");
});

// Start server
const startServer = async () => {
  try {
    // Initialize services first
    await initializeServices();

    // Start HTTP server
    server.listen(PORT, () => {
      console.log(`\n${"=".repeat(60)}`);
      console.log(`│${" ".repeat(58)}│`);
      console.log(`│ 🤩 Server is running on port ${PORT.padEnd(42)}│`);
      console.log(`│ Environment: ${NODE_ENV.padEnd(47)}│`);
      console.log(`│ Solana Cluster: ${SOLANA_CLUSTER.padEnd(44)}│`);
      console.log(`│ Health Check: http://localhost:${PORT}/health${" ".repeat(16)}│`);
      console.log(`│${" ".repeat(58)}│`);
      console.log(`${"=".repeat(60)}\n`);
    });

    // Handle server errors
    server.on("error", (error: Error & { code?: string; syscall?: string }) => {
      if (error.syscall !== "listen") {
        throw error;
      }

      switch (error.code) {
        case "EACCES":
          console.error(`❌ Port ${PORT} requires elevated privileges`);
          process.exit(1);
          break;
        case "EADDRINUSE":
          console.error(`❌ Port ${PORT} is already in use`);
          process.exit(1);
          break;
        default:
          throw error;
      }
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error);
    process.exit(1);
  }
};

// Start the application
startServer();
