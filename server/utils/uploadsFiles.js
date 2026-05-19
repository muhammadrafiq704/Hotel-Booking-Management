import fs from "node:fs/promises";
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
				return res.status(400).json({
					error: true,
					message: "No files uploaded",
				});
			}

			const convertedFiles = [];

			for (const file of req.files) {
				const ext = path.extname(file.originalname).toLowerCase();
				const baseName = path.parse(file.originalname).name;

				let outputPath;

				if (ext === ".webp") {
					// already webp → just move/keep
					outputPath = file.path;
				} else {
					const outputFileName = `room-${baseName}.webp`;
					outputPath = path.join("uploads/rooms", outputFileName);

					await sharp(file.path).webp({ quality: 80 }).toFile(outputPath);

					try {
						await fs.unlink(file.path);
					} catch (_e) {
						console.warn("Could not delete temp file:", file.path);
					}
				}

				convertedFiles.push(outputPath.replace(/\\/g, "/"));
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
