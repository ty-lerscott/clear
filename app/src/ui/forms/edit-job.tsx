import { toast } from "sonner";
import merge from "lodash.mergewith";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery, useMutation } from "@tanstack/react-query";

import Input from "@/ui/input";
import { useForm } from "@/ui/form";
import Textarea from "@/ui/textarea";
import { Button } from "@/ui/button";
import { DialogFooter } from "@/ui/dialog";
import { useApi } from "@/src/providers/api";
import type { JobPosting } from "@repo/types/job-posting";
import formSchema from "@/ui/forms/schemas/add-job-posting";
import statuses from "@/app/(authenticated)/tracker/utils/job-post-statuses";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/ui/select";
import {
	Form,
	FormItem,
	FormField,
	FormLabel,
	FormMessage,
	FormControl,
} from "@/ui/form";

const EditJob = ({
	onSuccess,
	id,
	closeDialog,
}: { onSuccess: () => void; closeDialog: () => void; id: string }) => {
	const fetchApi = useApi<JobPosting>("/postings", {
		method: "POST",
	});
	const { isLoading, data: posting } = useQuery({
		queryKey: ["fetchPosting", { id }],
		queryFn: ({ queryKey }) => {
			const body = queryKey[1];

			return fetchApi?.(body as Record<string, unknown>);
		},
	});

	const form = useForm<JobPosting>({
		values: merge(
			{},
			{
				id: "",
				title: "",
				status: "",
				jobBoard: {
					name: "",
					url: "",
				},
				company: {
					name: "",
					url: "",
					location: "",
				},
				salary: {
					min: 0,
					max: 0,
					currency: "",
				},
				description: "",
			},
			isLoading ? {} : posting,
		),
		resolver: zodResolver(formSchema),
	});

	const editJobPosting = useMutation({
		mutationKey: ["editJobPosting"],
		mutationFn: useApi<JobPosting>("/postings/edit"),
		onSuccess: async () => {
			toast.success("Successfully edited job posting");

			onSuccess();
		},
	});

	const handleSubmit = async (values: JobPosting) => {
		try {
			await editJobPosting.mutateAsync({
				...values,
				lastModified: new Date().toISOString(),
			});
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<>
			<Form {...form} onSubmit={handleSubmit}>
				<div className="grid gap-4 py-4">
					<FormField
						name="status"
						control={form.control}
						render={({ field }) => {
							return (
								<FormItem className="grid grid-cols-5 items-center gap-4">
									<FormLabel className="justify-self-end">Status*</FormLabel>
									<FormControl>
										<Select
											defaultValue={field.value}
											value={field.value}
											onValueChange={field.onChange}
										>
											<SelectTrigger className="w-[180px]">
												<SelectValue placeholder="Select a status" />
											</SelectTrigger>

											<SelectContent>
												{Object.entries(statuses)
													.filter(([key]) => !["generating"].includes(key))
													.map(([key, label]) => {
														return (
															<SelectItem value={key} key={key}>
																{label}
															</SelectItem>
														);
													})}
											</SelectContent>
										</Select>
									</FormControl>

									<FormMessage className="col-start-2 col-span-4" />
								</FormItem>
							);
						}}
					/>

					<FormField
						name="title"
						control={form.control}
						render={({ field }) => {
							return (
								<FormItem className="grid grid-cols-5 items-center gap-4">
									<FormLabel className="justify-self-end">Title*</FormLabel>
									<FormControl>
										<Input {...field} className="col-span-4" />
									</FormControl>
									<FormMessage className="col-start-2 col-span-4" />
								</FormItem>
							);
						}}
					/>

					<FormField
						name="jobBoard.url"
						control={form.control}
						render={({ field }) => {
							return (
								<FormItem className="grid grid-cols-5 items-center gap-4">
									<FormLabel className="justify-self-end">Job Board*</FormLabel>
									<FormControl>
										<Input
											{...field}
											className="col-span-4"
											placeholder="Url"
										/>
									</FormControl>
									<FormMessage className="col-start-2 col-span-4" />
								</FormItem>
							);
						}}
					/>

					<div className="grid grid-cols-5 items-center gap-4">
						<FormField
							name="company.name"
							control={form.control}
							render={({ field }) => {
								return (
									<FormItem className="grid grid-cols-subgrid col-span-3 items-center gap-4">
										<FormLabel className="justify-self-end">Company</FormLabel>
										<FormControl>
											<Input
												{...field}
												className="col-span-4"
												placeholder="Name*"
											/>
										</FormControl>
										<FormMessage className="col-start-2 col-span-4" />
									</FormItem>
								);
							}}
						/>

						<FormField
							name="company.url"
							control={form.control}
							render={({ field }) => {
								return (
									<FormItem className="grid grid-cols-subgrid col-span-2 items-center gap-4">
										<FormControl>
											<Input
												{...field}
												className="col-span-4"
												placeholder="Url"
											/>
										</FormControl>
										<FormMessage className="col-span-2" />
									</FormItem>
								);
							}}
						/>
					</div>

					<FormField
						name="company.location"
						control={form.control}
						render={({ field }) => {
							return (
								<FormItem className="grid grid-cols-5 items-center gap-4">
									<FormLabel className="justify-self-end">Location</FormLabel>
									<FormControl>
										<Input {...field} className="col-span-4" />
									</FormControl>
									<FormMessage className="col-start-2 col-span-4" />
								</FormItem>
							);
						}}
					/>

					<div className="grid grid-cols-5 items-center gap-4">
						<FormField
							name="salary.min"
							control={form.control}
							render={({ field }) => {
								return (
									<FormItem className="grid grid-cols-subgrid col-span-3 items-center gap-4">
										<FormLabel className="justify-self-end">
											Salary Range
										</FormLabel>
										<FormControl>
											<Input
												{...field}
												type="number"
												className="col-span-4"
												placeholder="Min"
											/>
										</FormControl>
										<FormMessage className="col-start-2 col-span-4" />
									</FormItem>
								);
							}}
						/>

						<FormField
							name="salary.max"
							control={form.control}
							render={({ field }) => {
								return (
									<FormItem className="grid grid-cols-subgrid col-span-2 items-center gap-4">
										<FormControl>
											<Input
												{...field}
												className="col-span-4"
												placeholder="Max"
												type="number"
											/>
										</FormControl>
										<FormMessage className="col-span-2" />
									</FormItem>
								);
							}}
						/>
					</div>

					<FormField
						name="description"
						control={form.control}
						render={({ field }) => {
							return (
								<FormItem className="grid grid-cols-5 items-center gap-4">
									<FormLabel className="justify-self-end">
										Description
									</FormLabel>
									<FormControl>
										<Textarea {...field} className="col-span-4" />
									</FormControl>
									<FormMessage />
								</FormItem>
							);
						}}
					/>
				</div>
				<DialogFooter>
					<Button
						type="reset"
						variant="outline"
						className="w-1/2"
						onClick={closeDialog}
					>
						Cancel
					</Button>
					<Button type="submit" className="w-1/2">
						Update
					</Button>
				</DialogFooter>
			</Form>
		</>
	);
};

export default EditJob;
