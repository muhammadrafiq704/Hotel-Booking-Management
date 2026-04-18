import Room from "../models/rooms.model.js";
import { DeleteMulterFiles } from "../utils/deleteMulterFiles.js";

export const createRoom = async (req, res) => {
	try {
		const { roomNumber, type, price, amenities, availability } = req.body;
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
export const getAllRooms = async (res) => {
	try {
		const rooms = await Room.find();
		res.status(200).json({
			error: false,
			message: "Rooms fetched successfully",
			data: rooms,
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
			data: room,
		});
	} catch (error) {
		console.log("Error in room deleteController  :>> ", error);
		res.status(500).json({
			error: true,
			message: error.message,
		});
	}
};
