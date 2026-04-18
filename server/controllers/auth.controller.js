import bcrypt from "bcryptjs";
import Auth from "../models/auth.model.js";
import { generateJwtandSetCookie } from "../utils/generateJwtAndSetCookie.js";

export const register = async (req, res) => {
	try {
		const { username, email, password, confirmPassword } = req.body;
		if (!username || !email || !password || !confirmPassword) {
			return res.status(400).json({ message: "All fields are required" });
		}
		if (password !== confirmPassword) {
			return res
				.status(400)
				.json({ message: "Passwords do not match", error: true });
		}
		if (password.length < 6) {
			return res.status(400).json({
				message: "Password must be at least 6 characters",
				error: true,
			});
		}
		if (!/\S+@\S+\.\S+/.test(email)) {
			return res
				.status(400)
				.json({ message: "Invalid email address", error: true });
		}
		const isEmailExists = await Auth.findOne({ email });
		if (isEmailExists) {
			return res
				.status(400)
				.json({ message: "Email already exists", error: true });
		}
		//hashed and salted password
		const hashedPassword = await bcrypt.hash(password, 10);
		const newUser = new Auth({
			username,
			email,
			password: hashedPassword,
			confirmPassword: hashedPassword,
			role: "user",
		});
		await newUser.save();
		res
			.status(201)
			.json({ message: "User registered successfully", error: false });
	} catch (error) {
		console.error("Error in register controller:", error);
		res.status(500).json({ message: "Internal server error", error: true });
	}
};

export const login = async (req, res) => {
	try {
		const { email, password } = req.body;
		//compare hashed password with the password in the database
		if (!email || !password) {
			return res
				.status(400)
				.json({ message: "Email and password are required", error: true });
		}
		const user = await Auth.findOne({ email });
		if (!user) {
			return res
				.status(400)
				.json({ message: "Invalid email or password", error: true });
		}
		const isPasswordValid = await bcrypt.compare(password, user.password);
		if (!isPasswordValid) {
			return res
				.status(400)
				.json({ message: "Invalid email or password", error: true });
		}

		//coookie and token
		generateJwtandSetCookie(user._id, res);

		res.status(200).json({
			message: "User logged in successfully",
			error: false,
			data: user,
		});
	} catch (error) {
		console.error("Error in login controller:", error);
		res.status(500).json({ message: "Internal server error", error: true });
	}
};

export const logout = (res) => {
	try {
		res.clearCookie("token", "", {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			sameSite: "strict",
		});
		res.status(200).json({ message: "Logged out successfully", error: false });
	} catch (error) {
		console.error("Error in logout controller:", error);
		res.status(500).json({ message: "Internal server error", error: true });
	}
};
