import cron from "node-cron";
import Booking from "../models/booking.model.js";

cron.schedule("*/5 * * * *", async () => {
	//cron runs every 5 minutes
	const expiryTime = new Date(Date.now() - 15 * 60 * 1000); //15 minutes ago bookings are expired automatically

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
