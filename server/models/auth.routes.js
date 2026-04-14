import mongoose from "mongoose";

const authSchema = mongoose.Schema(
	{
		username: {
			type: String,
			required: true,
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
