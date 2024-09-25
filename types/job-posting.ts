export type Company = {
	id: string;
	name: string;
	website?: string;
	location?: string;
};

export type RequiredJobPosting = {
	id: string;
	title: string;
	salary: {
		min: number;
		max: number;
		currency: string;
	};
	company: Company;
	description: string;
	jobBoard: "linkedin";
	location: "in-office" | "remote" | "hybrid" | string;
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
	lastModified: string;
};

export type JobPosting = Partial<RequiredJobPosting>;
