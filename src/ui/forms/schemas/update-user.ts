import { z } from "zod";

const Errors = {
	tooLong: "Woof, that's a long name, sorry.",
	tooShortName: "Oops, that name’s a bit too short, try again.",
	tooShortPassword: "Yikes, let's at least make it look secure!",
};

const formSchema = z.object({
	firstName: z
		.string()
		.min(2, {
			message: Errors.tooShortName,
		})
		.max(50, {
			message: Errors.tooLong,
		})
		.optional(),
	lastName: z
		.string()
		.min(2, {
			message: Errors.tooShortName,
		})
		.max(50, {
			message: Errors.tooLong,
		})
		.optional(),
	password: z
		.string()
		.min(8, {
			message: Errors.tooShortPassword,
		})
		.optional(),
});

export type UpdateUserSchema = z.infer<typeof formSchema>;

export default formSchema;
