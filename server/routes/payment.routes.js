import express from "express";
import {
	createPayment,
	verifyCheckoutSession,
} from "../controllers/payment.controller.js";

const router = express.Router();

router.post("/create-intent/:bookingId", createPayment);
router.get("/verify-session/:sessionId", verifyCheckoutSession);

export default router;
