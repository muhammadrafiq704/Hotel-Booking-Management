import mongoose from "mongoose";

const authSchema = mongoose.Schema(
	{
		username: {
			type: String,
			trim: true,
			required: true,
			minLength: [2, "Name must be at least 2 characters long"],
			maxLength: [30, "Name must be less than 30 characters long"],
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		role: {
			type: String,
			enum: ["user", "admin"],
			default: "user",
		},
		password: {
			type: String,
			required: true,
		},
		confirmPassword: {
			type: String,
		},
	},
	{ timestamps: true },
);

const Auth = mongoose.model("Auth", authSchema);

export default Auth;
