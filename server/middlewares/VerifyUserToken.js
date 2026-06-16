import jwt from "jsonwebtoken";
import Auth from "../models/auth.model.js";

const VerifyUserToken = async (req, res, next) => {
	const token = req.cookies.token;
	try {
		if (!token) {
			return res
				.status(401)
				.json({ error: true, message: "Unauthorized: No token provided" });
		}
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		if (!decoded) {
			return res
				.status(401)
				.json({ error: true, message: "Unauthorized: Invalid token" });
		}
		const user = await Auth.findOne({ _id: decoded.userId }).select(
			"-password",
		);
		if (!user) {
			return res
				.status(401)
				.json({ error: true, message: "Unauthorized: User not found" });
		}
		req.user = user;
		next();
	} catch (error) {
		console.log("Error in VerifyUserToken middleware :>> ", error);
		return res
			.status(500)
			.json({ error: true, message: "Internal Server Error" });
	}
};

export default VerifyUserToken;
