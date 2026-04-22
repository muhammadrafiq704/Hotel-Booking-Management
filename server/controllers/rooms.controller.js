import Room from "../models/rooms.model.js";
import { DeleteMulterFiles } from "../utils/deleteMulterFiles.js";

export const createRoom = async (req, res) => {
	try {
		const { roomNumber, type, price, amenities, availability } = req.body;

		// check room number already exists
		const existingRoom = await Room.findOne({ roomNumber });
		if (existingRoom) {
			return res.status(400).json({
				error: true,
				message: "Room number already exists",
			});
		}

		// images coming from multer and converted to webp in uploadFiles middleware
		const availabilityB = availability === "true";
		const room = new Room({
			roomNumber,
			type,
			price,
			amenities: amenities,
			availability: availabilityB,
			images: req.convertedFiles,
		});

		await room.save();

		res.status(201).json({
			error: false,
			message: "Room created successfully",
			data: room,
		});
	} catch (error) {
		res.status(500).json({
			error: true,
			message: error.message,
		});
	}
};
export const getAllRooms = async (req, res) => {
	const { page, limit } = req.query;
	try {
		const skip = (page - 1) * limit; //rooms to skip for pagination based on page number and limit of rooms per page
		// filter rooms by availability and sort by createdAt in descending order(newest first)
		const rooms = await Room.find({ availability: true })
			.skip(skip)
			.limit(limit)
			.sort({ createdAt: -1 });
		const totalRooms = await Room.countDocuments({ availability: true });

		res.status(200).json({
			error: false,
			message: "Rooms fetched successfully",
			data: rooms,
			total: totalRooms,
		});
	} catch (error) {
		res.status(500).json({
			error: true,
			message: error.message,
		});
	}
};
export const getRoomById = async (req, res) => {
	const { id } = req.params;
	try {
		const room = await Room.findById(id);
		if (!room) {
			return res.status(404).json({
				error: true,
				message: "Room not found",
			});
		}
		res.status(200).json({
			error: false,
			message: "Room fetched successfully",
			data: room,
		});
	} catch (error) {
		res.status(500).json({
			error: true,
			message: error.message,
		});
	}
};
export const updateRoom = async (req, res) => {
	const { id } = req.params;
	try {
		const images = req.convertedFiles;
		if (!images || images.length === 0) {
			return res.status(400).json({
				error: true,
				message: "At least one image is required",
			});
		}
		// if room availability is false(booked) then we can't update the room details
		const checkRoom = await Room.findById(id);
		if (!checkRoom.availability) {
			return res.status(400).json({
				error: true,
				message: "Cannot update a booked room",
			});
		}

		const room = await Room.findByIdAndUpdate(
			id,
			{ ...req.body, images },
			{ new: true },
		);

		if (!room) {
			return res.status(404).json({
				error: true,
				message: "Room not found",
			});
		}
		res.status(200).json({
			error: false,
			message: "Room updated successfully",
			data: room,
		});
	} catch (error) {
		console.log("Error in room updateController  :>> ", error);
		res.status(500).json({
			error: true,
			message: error.message,
		});
	}
};
export const deleteRoom = async (req, res) => {
	const { id } = req.params;
	try {
		const room = await Room.findById(id);
		if (!room) {
			return res.status(404).json({
				error: true,
				message: "Room not found",
			});
		}
		// if room availability is false(room booked) then booked room cannot be deleted
		if (!room.availability) {
			return res.status(400).json({
				error: true,
				message: "Cannot delete a booked room",
			});
		}
		// also delete the images from uploads folder
		if (room.images && room.images.length > 0) {
			DeleteMulterFiles(room.images);
		}
		await Room.findByIdAndDelete(id);
		if (!room) {
			return res.status(404).json({
				error: true,
				message: "Room not found",
			});
		}
		res.status(200).json({
			error: false,
			message: "Room deleted successfully",
		});
	} catch (error) {
		console.log("Error in room deleteController  :>> ", error);
		res.status(500).json({
			error: true,
			message: error.message,
		});
	}
};
