import express from "express";
import dotenv from "dotenv";
import connectToMongoDB from "./db/connectToMongoDB.js";
import productRoutes from './routes/productRoutes.js';
import billRoutes from './routes/billRoutes.js';
import authRoutes from './routes/authRoutes.js';
import cors from 'cors'


const app = express();
const corsOptions = {
  origin: [
    "http://localhost:5173",
     "https://main.dsmyi9bdufzdv.amplifyapp.com"
  ],
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"],
};
  
  app.use(cors(corsOptions));


dotenv.config();
const PORT = 5000; // You can change the port as needed

// Middleware to parse JSON
app.use(express.json());

// Define a simple route
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.use('/api/auth', authRoutes);
app.use('/api/product', productRoutes);
app.use('/api/bills', billRoutes);

// Start the server
app.listen(PORT, () => {
    connectToMongoDB();
    console.log(`Server is running on PORT ${PORT}`);
});
