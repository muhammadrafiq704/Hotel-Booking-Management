import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import connectDB from "./config/mongodb.js";

// routes
import authRoutes from "./routes/auth.routes.js";
import bookingRoutes from "./routes/booking.routes.js";
import paymentRoutes from "./routes/payment.routes.js";
import roomsRoutes from "./routes/rooms.routes.js";

//cron automatically run and cancel pending bookings after 15 mins of booking if payment not done
import "./jobs/booking.cron.js";

import dotenv from "dotenv";

dotenv.config({ quiet: true });

const app = express();
const PORT = process.env.PORT || 5000;
connectDB();

app.use("/uploads", express.static("uploads"));
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json());
app.use(cookieParser());

//auth routes
app.use("/api/auth", authRoutes);
app.use("/api/rooms", roomsRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/payments", paymentRoutes);

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
