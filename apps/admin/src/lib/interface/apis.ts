export interface ApiResponse<T> {
	data: T;
	status: number;
	message: string;
	success: string;
}

export interface ApiResponseWithNoSuccess<T> {
	data: T;
	status: number;
	message: string;
}

export interface ApiErrorMessage {
	error: string;
	message: string;
	status: number;
	code: string;
}
