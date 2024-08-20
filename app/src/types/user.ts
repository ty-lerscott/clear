export type RequiredUser = {
	avatar: string;
	lastName: string;
	initials: string;
	fullName: string;
	password: string;
	username: string;
	firstName: string;
	emailAddress: string;
};

export type User = Partial<RequiredUser>;
