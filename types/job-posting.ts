export type Salary = {
	min: number;
	max: number;
	currency: string;
};

export type JobBoard = {
	name: string;
	url: string;
};

export type Company = {
	id?: string;
	name: string;
	url?: string;
	location?: "in-office" | "remote" | "hybrid" | string;
};

export type DBJobPosting = {
	id: string;
	title: string;
	description: string;
	salary: Salary;
	companyId: string;
	jobBoard: JobBoard;
	date: string;
};

export type RequiredJobPosting = {
	id: string;
	title: string;
	description: string;
	salary: Salary;
	status:
		| "ready"
		| "generating"
		| "applied"
		| "interviewing"
		| "negotiating"
		| "got-the-job"
		| "no-answer"
		| "rejected"
		| "withdrew";
	company: Company;
	jobBoard: JobBoard;
	date: string;
};

export type JobPosting = Partial<RequiredJobPosting>;
