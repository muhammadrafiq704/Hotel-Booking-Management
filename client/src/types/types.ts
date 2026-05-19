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
};

export type RoomProps =
	| "all rooms"
	| "single"
	| "double"
	| "suite"
	| "deluxe"
	| "standard";
