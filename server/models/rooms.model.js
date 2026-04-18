import mongoose from "mongoose";

const RoomSchema = new mongoose.Schema(
	{
		roomNumber: {
			type: String,
			required: true,
			unique: true,
			trim: true,
		},
		images: {
			type: [String],
			required: true,
		},
		type: {
			type: String,
			enum: ["single", "double", "suite", "deluxe"],
			required: true,
			trim: true,
		},
		price: {
			type: Number,
			required: true,
		},
		amenities: {
			type: [String],
			required: true,
			trim: true,
		},
		availability: {
			type: Boolean,
			default: true,
		},
	},
	{ timestamps: true },
);

const Room = mongoose.model("Room", RoomSchema);

export default Room;
