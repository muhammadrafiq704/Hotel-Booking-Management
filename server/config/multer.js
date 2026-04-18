import fs from "node:fs";
import path from "node:path";
import multer from "multer";

const storage = multer.diskStorage({
	destination: (cb) => {
		const dir = path.join("uploads", "rooms");

		if (!fs.existsSync(dir)) {
			fs.mkdirSync(dir, { recursive: true });
		}

		cb(null, dir);
	},
	filename: (file, cb) => {
		const uniqueName = `${Date.now()}-${file.originalname}`;
		cb(null, uniqueName);
	},
});

const fileFilter = (file, cb) => {
	const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

	if (allowedTypes.includes(file.mimetype)) {
		cb(null, true);
	} else {
		cb(new Error("Only JPEG, PNG, WEBP allowed"), false);
	}
};

export const upload = multer({
	storage,
	limits: {
		fileSize: 5 * 1024 * 1024, //
		files: 5,
	},
	fileFilter,
}).array("files");
