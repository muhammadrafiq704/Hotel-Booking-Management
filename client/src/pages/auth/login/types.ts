export type LoginResponseDTO<T> = {
	error: true | false;
	message: string;
	data?: T;
};
