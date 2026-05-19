import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config({ quiet: true });

if (!process.env.MONGO_URI) {
	throw new Error("MongoDB URI missing in .env");
}
const connectDB = async () => {
	try {
		await mongoose.connect(process.env.MONGO_URI);
		console.log("MongoDB connected");
	} catch (error) {
		console.error("MongoDB connection error:", error);
		process.exit(1);
	}
};

export default connectDB;
