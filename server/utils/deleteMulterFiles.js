import fs from "node:fs";

export function DeleteMulterFiles(filePaths) {
	try {
		filePaths.forEach((filePath) => {
			if (fs.existsSync(filePath)) {
				fs.unlinkSync(filePath);
				console.log(`File ${filePath} deleted successfully`);
			} else {
				console.log(`File ${filePath} does not exist`);
			}
		});
	} catch (error) {
		console.log("Error deleting files :>> ", error);
	}
}
