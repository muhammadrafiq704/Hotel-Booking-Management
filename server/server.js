import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";

import connectDB from "./config/mongodb.js";

import authRoutes from "./routes/auth.routes.js";
import bookingRoutes from "./routes/booking.routes.js";
import paymentRoutes from "./routes/payment.routes.js";
import roomsRoutes from "./routes/rooms.routes.js";

import "./jobs/booking.cron.js";
import { stripeWebhook } from "./controllers/payment.controller.js";

dotenv.config({ quiet: true });

const app = express();
const PORT = process.env.PORT || 5000;

// DB
connectDB();

app.get("/", (_req, res) => {
	res.json({
		success: true,
		message: "Hotel Booking API is running",
	});
});

app.use("/uploads", express.static("uploads"));

app.use(
	cors({
		origin: [
			"http://localhost:5173",
			"http://localhost:5174",
			"https://hotel-booking-management-two.vercel.app",
		],
		credentials: true,
	}),
);
app.post(
	"/api/payments/webhook",
	express.raw({ type: "application/json" }),
	stripeWebhook,
);

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/rooms", roomsRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/payments", paymentRoutes);

export default app;

if (process.env.NODE_ENV !== "production") {
	app.listen(PORT, () => {
		console.log(`Server is running on port ${PORT}`);
	});
}
