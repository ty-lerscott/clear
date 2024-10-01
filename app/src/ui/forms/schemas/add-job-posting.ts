import { z } from "zod";

const Errors = {
	tooLong: "Woof, that's a long title, sorry.",
	tooShortTitle: "Oops, that title's a bit too short, try again.",
	invalidUrl: "Please enter a valid URL.",
};

const formSchema = z.object({
	id: z.string().optional(),
	title: z
		.string()
		.min(2, {
			message: Errors.tooShortTitle,
		})
		.max(50, {
			message: Errors.tooLong,
		}),
	jobBoard: z.object({
		url: z.string().url({
			message: Errors.invalidUrl,
		}),
	}),
	company: z.object({
		name: z.string(),
		location: z.string().optional(),
	}),
	salary: z.object({
		min: z.coerce.number().optional(),
		max: z.coerce.number().optional(),
		currency: z.string().optional(),
	}),
	description: z.string().optional(),
	status: z.string().optional(),
});

export type UpdateUserSchema = z.infer<typeof formSchema>;

export default formSchema;
