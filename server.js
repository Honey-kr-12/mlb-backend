import express from "express";
import dotenv from "dotenv";
import connectToMongoDB from "./db/connectToMongoDB.js";
import productRoutes from "./routes/productRoutes.js";
import billRoutes from "./routes/billRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import cors from "cors";

// Load environment variables
dotenv.config();

const app = express();
const PORT = 5000; // Use environment variable for PORT if available

// CORS configuration
const corsOptions = {
  origin: [
    "http://localhost:5173",
    "https://main.dsmyi9bdufzdv.amplifyapp.com",
    "https://mlb.prcompany.org",
  ],
  credentials: true, // Enable cookies and authorization headers
  allowedHeaders: ["Content-Type", "Authorization"], // Customize headers if needed
};
app.use(cors(corsOptions));

// Middleware to parse JSON
app.use(express.json());

// Test Route
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/product", productRoutes);
app.use("/api/bills", billRoutes);

// Start the server
app.listen(PORT, () => {
  connectToMongoDB(); // Ensure your database connection logs success or failure
  console.log(`Server is running on PORT ${PORT}`);
});
