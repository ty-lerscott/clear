"use client";

import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";

import { cn } from "@/utils";
import Input from "@/ui/input";
import Textarea from "@/ui/textarea";
import { useApi } from "@/src/providers/api";
import { Button, buttonVariants } from "@/ui/button";
import type { JobPosting } from "@repo/types/job-posting";
import formSchema from "@/ui/forms/schemas/add-job-posting";
import {
	Dialog,
	DialogTitle,
	DialogFooter,
	DialogHeader,
	DialogContent,
	DialogTrigger,
	DialogDescription,
} from "@/ui/dialog";
import {
	Form,
	useForm,
	FormItem,
	FormField,
	FormLabel,
	FormMessage,
	FormControl,
} from "@/ui/form";

export default function AddJobModal({
	isOpen,
	hasPosts,
	onSuccess,
	onOpenChange,
}: {
	isOpen: boolean;
	hasPosts: boolean;
	onSuccess: () => void;
	onOpenChange: () => void;
}) {
	const form = useForm<JobPosting>({
		values: {
			title: "",
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
		resolver: zodResolver(formSchema),
	});

	const handleReset = () => {
		form.reset();
	};

	const addJobPosting = useMutation({
		mutationKey: ["addJobPosting"],
		mutationFn: useApi<JobPosting>("/postings/add"),
		onSuccess: async () => {
			toast.success("Successfully added job posting");

			onSuccess();
		},
	});

	const handleSubmit = async (values: JobPosting) => {
		try {
			await addJobPosting.mutateAsync({
				...values,
				date: new Date().toISOString(),
			});
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<Dialog open={isOpen} onOpenChange={onOpenChange}>
			<DialogTrigger
				className={cn(
					"col-span-4",
					hasPosts && "col-start-[26]",
					buttonVariants({ variant: "default" }),
				)}
			>
				Add Job
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Add Job</DialogTitle>
					<DialogDescription>
						Fill in the details for the new job posting. Click save when you're
						done.
					</DialogDescription>
				</DialogHeader>
				<Form {...form} onSubmit={handleSubmit}>
					<div className="grid gap-4 py-4">
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
										<FormLabel className="justify-self-end">
											Job Board*
										</FormLabel>
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
											<FormLabel className="justify-self-end">
												Company
											</FormLabel>
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
							onClick={handleReset}
						>
							Cancel
						</Button>
						<Button type="submit" className="w-1/2">
							Save Job
						</Button>
					</DialogFooter>
				</Form>
			</DialogContent>
		</Dialog>
	);
}
