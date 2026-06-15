import express from "express";
import {
	createPayment,
	stripeWebhook,
	verifyCheckoutSession,
} from "../controllers/payment.controller.js";

const router = express.Router();

router.post("/create-intent/:bookingId", createPayment);
router.post(
	"/webhook",
	express.raw({ type: "application/json" }),
	stripeWebhook,
);
router.get("/verify-session/:sessionId", verifyCheckoutSession);

export default router;
