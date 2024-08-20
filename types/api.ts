import type {
	Request as ExpressRequest,
	Response as ExpressResponse,
	NextFunction,
} from "express";

export type Primitives = string | number | boolean | null | undefined | Buffer; // is Buffer a primitive? no, but...ignore that
export type PrimitiveObject = Record<string, Primitives | Primitives[]>;
export type HTTP_METHODS =
	| "GET"
	| "POST"
	| "PUT"
	| "DELETE"
	| "PATCH"
	| "HEAD"
	| "OPTIONS"
	| "TRACE"
	| "CONNECT";

export type Request = Omit<ExpressRequest, "method"> & {
	method: HTTP_METHODS;
	basePath: string;
	host: string;
	headers: ExpressRequest["headers"];
	extendedPath: string[];
};

export type Data =
	| Primitives
	| PrimitiveObject
	| (Primitives | PrimitiveObject)[];

// TODO: propose joined extension types
// AKA: instead of above, propose the following: (Primitives | PrimitiveObject)&[]

export type Conductor = {
	req: Request;
	next: NextFunction;
	res: ExpressResponse;
};

export type Response<T = Data> = {
	data?: T;
	error?: string;
	status: number;
	headers?: Record<string, string | number>;
};
