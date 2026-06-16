import { transporter } from "./mailer.js";

export const sendEmail = async ({ to, booking }) => {
	await transporter.sendMail({
		from: `"Hotel Booking Management" <${process.env.SMTP_USER}>`,
		to,
		subject: "🎉 Booking Confirmed - Payment Successful",
		html: `
<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
</head>

<body style="margin:0;padding:0;background:#f4f7fb;font-family:Arial,Helvetica,sans-serif;">

	<table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f7fb;padding:30px 15px;">
		<tr>
			<td align="center">

				<table width="650" cellpadding="0" cellspacing="0"
					style="
						background:#ffffff;
						border-radius:16px;
						overflow:hidden;
						box-shadow:0 10px 30px rgba(0,0,0,0.08);
					">

					<!-- Header -->
					<tr>
						<td
							align="center"
							style="
								background:linear-gradient(135deg,#0f172a,#1e293b);
								padding:40px 20px;
							"
						>
							<h1
								style="
									margin:0;
									color:#ffffff;
									font-size:30px;
									font-weight:bold;
								"
							>
								🏨 Hotel Booking Management
							</h1>

							<p
								style="
									margin-top:12px;
									color:#cbd5e1;
									font-size:15px;
								"
							>
								Your reservation has been successfully confirmed
							</p>
						</td>
					</tr>

					<!-- Success Icon -->
					<tr>
						<td align="center" style="padding:40px 30px 20px;">
							<div
								style="
									width:90px;
									height:90px;
									line-height:90px;
									border-radius:50%;
									background:#dcfce7;
									font-size:42px;
									margin:auto;
								"
							>
								✅
							</div>

							<h2
								style="
									margin-top:20px;
									margin-bottom:10px;
									color:#16a34a;
								"
							>
								Payment Successful
							</h2>

							<p
								style="
									color:#64748b;
									font-size:16px;
									line-height:1.7;
									margin:0;
								"
							>
								Thank you for your payment. Your booking has been
								successfully confirmed and is ready for your stay.
							</p>
						</td>
					</tr>

					<!-- Booking Details -->
					<tr>
						<td style="padding:20px 30px 30px;">

							<table
								width="100%"
								cellpadding="12"
								cellspacing="0"
								style="
									border:1px solid #e2e8f0;
									border-radius:12px;
									background:#fafafa;
								"
							>

								<tr>
									<td
										colspan="2"
										style="
											font-size:20px;
											font-weight:bold;
											color:#0f172a;
											padding:18px;
											background:#f8fafc;
											border-bottom:1px solid #e2e8f0;
										"
									>
										📋 Booking Details
									</td>
								</tr>

								<tr>
									<td><strong>Booking ID</strong></td>
									<td>${booking._id}</td>
								</tr>

								<tr>
									<td><strong>Status</strong></td>
									<td style="color:#16a34a;font-weight:bold;">
										${booking.status}
									</td>
								</tr>

								<tr>
									<td><strong>Payment Status</strong></td>
									<td style="color:#16a34a;font-weight:bold;">
										${booking.payment?.status}
									</td>
								</tr>

								<tr>
									<td><strong>Total Amount</strong></td>
									<td>
										PKR ${booking.totalPrice?.toLocaleString()}
									</td>
								</tr>

								<tr>
									<td><strong>Check-In</strong></td>
									<td>
										${new Date(booking.checkIn).toLocaleDateString()}
									</td>
								</tr>

								<tr>
									<td><strong>Check-Out</strong></td>
									<td>
										${new Date(booking.checkOut).toLocaleDateString()}
									</td>
								</tr>

								<tr>
									<td><strong>Guests</strong></td>
									<td>${booking.guests || "N/A"}</td>
								</tr>

								${
									booking.room
										? `
								<tr>
									<td><strong>Room</strong></td>
									<td>${booking.room.title}</td>
								</tr>
								<tr>
									<td><strong>Room</strong></td>
									<td>${booking.room.roomNumber}</td>
								</tr>
								`
										: ""
								}

							</table>
						</td>
					</tr>

					<!-- CTA -->
					<tr>
						<td align="center" style="padding-bottom:35px;">

							<a
								href="${process.env.CLIENT_URL}/bookings"
								style="
									display:inline-block;
									padding:14px 30px;
									background:#2563eb;
									color:#ffffff;
									text-decoration:none;
									border-radius:8px;
									font-weight:bold;
									font-size:15px;
								"
							>
								View My Booking
							</a>

						</td>
					</tr>

					<!-- Footer -->
					<tr>
						<td
							style="
								background:#f8fafc;
								padding:30px;
								text-align:center;
								border-top:1px solid #e2e8f0;
							"
						>

							<h3
								style="
									margin:0;
									color:#0f172a;
								"
							>
								Hotel Booking Management
							</h3>

							<p
								style="
									margin:12px 0;
									color:#64748b;
									line-height:1.6;
								"
							>
								Making hotel reservations simple, secure,
								and reliable.
							</p>

							<p style="margin:8px 0;">
								🌐
								<a
									href="${process.env.CLIENT_URL}"
									style="
										color:#2563eb;
										text-decoration:none;
									"
								>
									Visit Website
								</a>
							</p>

							<p
								style="
									margin:8px 0;
									color:#64748b;
								"
							>
								📧 support@hotelbooking.com
							</p>

							<p
								style="
									margin:8px 0;
									color:#64748b;
								"
							>
								📞 +92 300 1234567
							</p>

							<p
								style="
									margin-top:20px;
									font-size:12px;
									color:#94a3b8;
								"
							>
								© ${new Date().getFullYear()}
								Hotel Booking Management.
								All rights reserved.
							</p>

						</td>
					</tr>

				</table>

			</td>
		</tr>
	</table>

</body>
</html>
`,
	});
};
