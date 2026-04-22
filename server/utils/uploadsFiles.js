import fs from "node:fs";
import path from "node:path";
import multer from "multer";
import sharp from "sharp";
import { upload } from "../config/multer.js";

export const uploadFiles = (req, res, next) => {
	upload(req, res, async (err) => {
		try {
			if (err instanceof multer.MulterError) {
				return res.status(400).json({
					error: true,
					message: err.message,
					errorType: "MulterError",
				});
			} else if (err) {
				return res.status(500).json({
					error: true,
					message: err.message,
					errorType: "UnknownError",
				});
			}

			if (!req.files || req.files.length === 0) {
				return res
					.status(400)
					.json({ error: true, message: "No files uploaded" });
			}

			const convertedFiles = [];

			for (const file of req.files) {
				const baseName = path.parse(file.originalname).name;

				const outputFileName = `room-${baseName}.webp`;
				const outputPath = path.join("uploads", outputFileName);

				await sharp(file.path).webp({ quality: 80 }).toFile(outputPath);

				fs.unlinkSync(file.path);

				convertedFiles.push(outputPath);
			}
			req.convertedFiles = convertedFiles;
			next();
		} catch (error) {
			console.log("error in uploadFiles :>> ", error);
			return res.status(500).json({
				error: true,
				message: "Error processing images",
			});
		}
	});
};
