export type DefaultError = {
	message: string;
};

export type Response<T extends Record<string, unknown>> = {
	data?: T;
	error?: DefaultError;
	status: number;
};
