import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
			index: true,
		},

		room: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Room",
			required: true,
			index: true,
		},

		checkIn: {
			type: Date,
			required: true,
		},

		checkOut: {
			type: Date,
			required: true,
		},

		guests: {
			adults: { type: Number, required: true, min: 1 },
			children: { type: Number, default: 0 },
		},

		pricePerNight: {
			type: Number,
			required: true,
		},

		totalNights: {
			type: Number,
			required: true,
		},

		totalPrice: {
			type: Number,
			required: true,
		},

		status: {
			type: String,
			enum: ["pending", "confirmed", "cancelled", "completed"],
			default: "pending",
			index: true,
		},

		payment: {
			method: {
				type: String,
				enum: ["card", "cash", "stripe", "paypal"],
			},
			status: {
				type: String,
				enum: ["pending", "paid", "failed", "refunded"],
				default: "pending",
			},
			transactionId: String,
		},

		isActive: {
			type: Boolean,
			default: true,
		},

		notes: String,

		isDeleted: {
			type: Boolean,
			default: false,
		},
	},
	{ timestamps: true },
);

// Index for fast availability queries
BookingSchema.index({
	room: 1,
	checkIn: 1,
	checkOut: 1,
	status: 1,
});

const Booking = mongoose.model("Booking", BookingSchema);
export default Booking;
