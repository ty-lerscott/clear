"use client";

import Input from "@/ui/input";
import { toast } from "sonner";
import { Button } from "@/ui/button";
import { useUser } from "@clerk/nextjs";
import type { User } from "@repo/types/user";
import { LoadableAvatar } from "@/ui/avatar";
import { useApi } from "@/src/providers/api";
import getDirtyFields from "./utils/get-dirty-fields";
import { zodResolver } from "@hookform/resolvers/zod";
import formSchema from "@/ui/forms/schemas/update-user";
import { FiEye, FiEyeOff, FiTrash } from "react-icons/fi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { type ChangeEvent, type FocusEventHandler, useState } from "react";
import {
	Form,
	useForm,
	FormItem,
	FormField,
	FormLabel,
	FormMessage,
	FormControl,
	useFormState,
} from "@/ui/form";

const UpdateUserForm = ({
	user,
	onSuccess,
}: { user?: User; onSuccess: () => void }) => {
	const [avatarSrc, setAvatarSrc] = useState(user?.avatar);
	const [isVisible, setIsVisible] = useState(false);
	const { user: clerkUser, isLoaded: isUserLoaded } = useUser();
	const queryClient = useQueryClient();
	const userUpdateApi = useApi<User>("/user/update");

	const refetchUser = async () => {
		await queryClient.invalidateQueries({
			queryKey: ["fetchUser"],
			exact: false,
		});
	};

	const form = useForm<User>({
		values: user,
		defaultValues: user,
		resolver: zodResolver(formSchema),
	});

	const updateUser = useMutation<User>({
		mutationKey: ["updateUser"],
		mutationFn: userUpdateApi,
		onSuccess: async () => {
			await refetchUser();
			onSuccess();
			toast.success("User updated successfully");
		},
	});

	const { isDirty, isSubmitting, isValid } = useFormState({
		control: form.control,
	});

	const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
		const fileBlob = e.target?.files?.[0];

		if (fileBlob) {
			const dataReader = new FileReader();

			dataReader.onload = async (e) => {
				const imageDataUrl = e.target?.result;

				if (typeof imageDataUrl === "string") {
					setAvatarSrc(imageDataUrl);

					if (isUserLoaded) {
						await clerkUser?.setProfileImage({
							file: fileBlob,
						});

						await refetchUser();
					}
				}
			};

			dataReader.readAsDataURL(fileBlob);
		}
	};

	const removeAvatar = async () => {
		if (!isUserLoaded) {
			return Promise.reject();
		}

		await clerkUser?.setProfileImage({
			file: null,
		});
		setAvatarSrc("");
		await refetchUser();
	};

	const toggleVisibility = () => {
		setIsVisible((prevState) => !prevState);
	};

	const resetForm = () => {
		form.reset(user);
	};

	const handleBlur: FocusEventHandler<HTMLInputElement> = async (event) => {
		const trimmedValue = event.target.value.trim();
		if (!trimmedValue.length) {
			form.setValue("password", undefined, { shouldDirty: false });

			await form.trigger("password");
		}
	};

	const handleSubmit = async (values: Partial<User>) => {
		const onlyDirt = getDirtyFields<Partial<User>>(user as User, values);

		await updateUser.mutateAsync(onlyDirt);
	};

	return (
		<>
			<div className="flex gap-4 items-center justify-center">
				<LoadableAvatar
					src={avatarSrc}
					isLoading={!user}
					className="size-36"
					fallbackText={user?.initials}
				/>

				<div className="flex flex-col gap-4 justify-start">
					<>
						<label
							htmlFor="avatar"
							className="text-sm font-medium leading-none flex gap-2"
						>
							Avatar Image
						</label>
						<Input
							type="file"
							id="avatar"
							accept="image/*"
							disabled={!user}
							onChange={handleFileChange}
						/>
					</>

					<div>
						<Button
							size="sm"
							disabled={!user}
							variant="destructive"
							onClick={removeAvatar}
							className="flex gap-2 items-center"
						>
							<FiTrash />
							<span>Remove Avatar</span>
						</Button>
					</div>
				</div>
			</div>
			<Form {...form} onSubmit={handleSubmit}>
				<div data-testid="FormRow" className="flex gap-4">
					<FormField
						name="firstName"
						control={form.control}
						render={({ field }) => {
							return (
								<FormItem>
									<FormLabel>First Name</FormLabel>
									<FormControl>
										<Input {...field} disabled={!user} />
									</FormControl>
									<FormMessage />
								</FormItem>
							);
						}}
					/>
					<FormField
						name="lastName"
						control={form.control}
						render={({ field }) => {
							return (
								<FormItem>
									<FormLabel>Last Name</FormLabel>
									<FormControl>
										<Input {...field} disabled={!user} />
									</FormControl>
									<FormMessage />
								</FormItem>
							);
						}}
					/>
				</div>

				<FormField
					name="password"
					control={form.control}
					render={({ field }) => {
						return (
							<FormItem>
								<FormLabel>
									<span>Change Password</span>
									<Button
										size="bare"
										variant="bare"
										options="noPadding"
										onClick={toggleVisibility}
									>
										{isVisible ? <FiEye /> : <FiEyeOff />}
									</Button>
								</FormLabel>
								<FormControl>
									<Input
										{...field}
										disabled={!user}
										onBlur={handleBlur}
										value={field.value || ""}
										type={isVisible ? "text" : "password"}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						);
					}}
				/>

				<div className="grid grid-cols-2 gap-4 mt-4">
					<Button
						type="reset"
						variant="outline"
						onClick={resetForm}
						className="shrink-0 w-full"
						disabled={!user || !isDirty}
					>
						Reset
					</Button>

					<Button
						type="submit"
						className="shrink-0 w-full"
						disabled={!isDirty || isSubmitting || !user || !isValid}
					>
						{form.formState.isSubmitting ? "Updating..." : "Update"}
					</Button>
				</div>
			</Form>
		</>
	);
};

export default UpdateUserForm;
