import mongoose from "mongoose";
import Booking from "../models/booking.model.js";
import Room from "../models/rooms.model.js";

export const createBooking = async (req, res) => {
	// prevent race conditions with transactions do not allow booking the same room at the same time
	const session = await mongoose.startSession();
	session.startTransaction();
	try {
		const { roomId, checkIn, checkOut, guests } = req.body;
		console.log("req.body :>> ", req.body);

		// validate checkin and checkout dates
		const checkInDate = new Date(checkIn);
		const checkOutDate = new Date(checkOut);
		const today = new Date();
		if (checkInDate >= checkOutDate) {
			return res.status(400).json({
				error: true,
				message: "Check-out date must be after check-in date",
			});
		}
		if (checkInDate < today) {
			return res
				.status(400)
				.json({ error: true, message: "Check-in date cannot be in the past" });
		}

		const room = await Room.findById(roomId).session(session);
		if (!room) {
			return res.status(404).json({ error: true, message: "Room not found" });
		}

		const conflictingBooking = await Booking.findOne({
			room: roomId,
			status: { $in: ["confirmed"] },
			$or: [
				{
					checkIn: { $lt: checkOutDate },
					checkOut: { $gt: checkInDate },
				},
			],
		}).session(session);

		if (conflictingBooking) {
			return res.status(400).json({
				error: true,
				message: "Room already booked for selected dates",
			});
		}

		const nights =
			(new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24);

		const totalPrice = nights * room.price;
		const userId = req.user._id;

		const booking = new Booking({
			user: userId,
			room: roomId,
			checkIn,
			checkOut,
			guests: { adults: guests.adults, children: guests.children },
			pricePerNight: room.price,
			totalNights: nights,
			totalPrice,
			isActive: false, // will be set to true after successful payment
		});

		await booking.save({ session });

		await session.commitTransaction();
		session.endSession();

		res.status(201).json({
			error: false,
			message: "Booking created",
			data: booking,
		});
	} catch (error) {
		await session.abortTransaction();
		session.endSession();
		res.status(500).json({ error: true, message: error.message });
	}
};

export const getUserBookings = async (req, res) => {
	try {
		const bookings = await Booking.find({ user: req.user._id })
			.populate("room")
			.sort({ createdAt: -1 });

		res.json({
			error: false,
			message: "User Booking retrieved Successfully",
			data: bookings,
		});
	} catch (error) {
		console.log("Error in getUserBookings :>> ", error);
		res.status(500).json({ error: true, message: error.message });
	}
};

export const cancelBooking = async (req, res) => {
	try {
		const booking = await Booking.findById(req.params.id);

		if (!booking) {
			return res
				.status(404)
				.json({ error: true, message: "Booking not found" });
		}

		if (booking.user.toString() !== req.user._id.toString()) {
			return res.status(403).json({
				error: true,
				message: "Unauthorized: You can only cancel your own bookings",
			});
		}

		booking.status = "cancelled";
		booking.isActive = false;

		await booking.save();

		res.json({ error: false, message: "Booking cancelled successfully" });
	} catch (error) {
		console.log("Error in cancelBooking :>> ", error);
		res.status(500).json({ error: true, message: error.message });
	}
};
