import express from "express";
import dotenv from "dotenv"; // Import dotenv
import cookieParser from "cookie-parser";
import { connectDB } from "./db/connectDB.js";
import authRoutes from "./routes/auth-route.js";
import cors from "cors";

// Call dotenv.config() to load environment variables from .env file
dotenv.config(); // This should be called before using process.env.MONGO_URI

const app = express();
const PORT = process.env.PORT;

app.use(express.json()); // allow us to parse incoming request: rq.body
app.use(cookieParser());

// CORS configuration
const corsOptions = {
  origin: "http://localhost:5173", // The origin of your Vue.js frontend
  methods: ["GET", "POST", "PUT", "DELETE"], // Allow specific methods
  credentials: true, // Allow cookies to be sent with requests (optional, but useful if you store a token in cookies)
};

// Apply CORS middleware globally
app.use(cors(corsOptions));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/auth", authRoutes);

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error starting the server:", error);
  });
