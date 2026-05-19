import mongoose from "mongoose";

const RoomSchema = new mongoose.Schema(
	{
		title: String,
		description: String,
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
		adults: {
			type: Number,
			required: true,
		},
		children: {
			type: Number,
			required: true,
			default: 0,
			min: 0,
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

RoomSchema.index({
	adults: 1,
	children: 1,
	availability: 1,
});

const Room = mongoose.model("Room", RoomSchema);

export default Room;
