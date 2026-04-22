import cron from "node-cron";
import Booking from "../models/booking.model.js";

cron.schedule("*/1 * * * *", async () => {
	const expiryTime = new Date(Date.now() - 15 * 60 * 1000);

	await Booking.updateMany(
		{
			status: "pending",
			createdAt: { $lt: expiryTime },
		},
		{
			status: "cancelled",
			isActive: false,
			"payment.status": "failed",
		},
	);

	console.log("Expired bookings cleaned");
});
