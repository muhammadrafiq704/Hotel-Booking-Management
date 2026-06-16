export type ActionProps = {
	error: boolean;
	message: string;
};

export type LoaderProps = {
	error: boolean;
	message: string;
	data?: Room[];
};

export type Room = {
	_id: number;
	title: string;
	type: string;
	name: string;
	description: string;
	price: number;
	amenities: string[];
	images: string[];
	roomNumber: string;
	availability: boolean;
	children?: number;
	adults?: number;
};

export type PaymentStatus = "pending" | "paid" | "failed" | "refunded";

export type BookingStatus = "pending" | "confirmed" | "cancelled";

export interface User {
	_id: string;
	username: string;
	email: string;
	role: string;
	createdAt: string;
	updatedAt: string;
}

export interface Booking {
	_id: string;

	user: User;
	room: Room;

	customerName: string;
	customerEmail: string;
	customerPhone: string;

	address: string;
	city: string;
	country: string;

	checkIn: string; // ISO date string
	checkOut: string; // ISO date string

	guests: {
		adults: number;
		children: number;
	};

	pricePerNight: number;
	totalNights: number;
	totalPrice: number;

	status: BookingStatus;

	payment: {
		status: PaymentStatus;
	};

	isActive: boolean;
	isDeleted: boolean;

	createdAt: string;
	updatedAt: string;
}

export type RoomProps =
	| "all rooms"
	| "single"
	| "double"
	| "suite"
	| "deluxe"
	| "standard";
