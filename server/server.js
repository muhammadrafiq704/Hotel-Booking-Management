import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import connectDB from "./config/mongodb.js";

// routes
import authRoutes from "./routes/auth.routes.js";
import roomsRoutes from "./routes/rooms.routes.js";

dotenv.config({ quiet: true });

const app = express();
const PORT = process.env.PORT || 5000;
connectDB();

app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json());
app.use(cookieParser());

//auth routes
app.use("/api/auth", authRoutes);
app.use("/api/rooms", roomsRoutes);

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
