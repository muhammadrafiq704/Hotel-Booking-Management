export const roomValidator = {
	$jsonSchema: {
		bsonType: "object",
		required: ["roomNumber", "type", "price", "amenities", "availability"],
		properties: {
			roomNumber: {
				bsonType: "string",
				description: "Room number is required and must be a string",
			},
			type: {
				bsonType: "string",
				description: "Room type is required and must be a string",
			},
			price: {
				bsonType: "number",
				description: "Room price is required and must be a number",
			},
			amenities: {
				bsonType: "array",
				items: {
					bsonType: "string",
				},
				description: "Amenities must be an array of strings",
			},
			availability: {
				bsonType: "bool",
				description: "Availability must be a boolean",
			},
		},
	},
};
