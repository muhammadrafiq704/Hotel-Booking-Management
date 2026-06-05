import express from "express";
import {
	createPayment,
	stripeWebhook,
} from "../controllers/payment.controller.js";

const router = express.Router();

router.post("/create-intent/:bookingId", createPayment);
router.post("/webhook", stripeWebhook);

export default router;
