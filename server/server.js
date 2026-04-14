import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import connectDB from "./config/mongodb.js";

// routes
import authRoutes from "./routes/auth.routes.js";

dotenv.config({ quiet: true });

const app = express();
const PORT = process.env.PORT || 5000;
connectDB();

app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json());

//auth routes
app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
