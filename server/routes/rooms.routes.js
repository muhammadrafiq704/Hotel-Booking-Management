import express from "express";
import {
	createRoom,
	deleteRoom,
	getAllRooms,
	getRoomById,
	updateRoom,
} from "../controllers/rooms.controller.js";
import VerifyUserToken from "../middlewares/VerifyUserToken.js";
import { uploadFiles } from "../utils/uploadsFiles.js";

const router = express.Router();

router.post("/create", VerifyUserToken, uploadFiles, createRoom);
router.get("/", getAllRooms);
router.get("/:id", getRoomById);
router.put("/:id", VerifyUserToken, uploadFiles, updateRoom);
router.delete("/:id", VerifyUserToken, deleteRoom);

export default router;
