export type Salary = {
	min: number;
	max: number;
	currency: string;
};

export type JobBoard = {
	url: string;
	name: string;
};

export type Company = {
	id?: string;
	name: string;
	url?: string;
	location?: "in-office" | "remote" | "hybrid" | string;
};

export type RequiredJobPosting = {
	id: string;
	date: string;
	title: string;
	salary: Salary;
	status: string;
	company: Company;
	jobBoard: JobBoard;
	description: string;
	lastModified: string;
	hasDescription: boolean;
};

export type JobPosting = Partial<RequiredJobPosting>;
