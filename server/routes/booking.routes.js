import express from "express";
import {
	cancelBooking,
	createBooking,
	getUserBookings,
} from "../controllers/booking.controller.js";
import VerifyUserToken from "../middlewares/VerifyUserToken.js";

const router = express.Router();

router.post("/", VerifyUserToken, createBooking);
router.get("/user-bookings", VerifyUserToken, getUserBookings);
router.put("/cancel/:id", VerifyUserToken, cancelBooking);
// router.get("/", getAllRooms);
// router.get("/:id", getRoomById);
// router.put("/:id", VerifyUserToken, uploadFiles, updateRoom);
// router.delete("/:id", VerifyUserToken, deleteRoom);

export default router;
