"use client";

import { useState } from "react";
import Skeleton from "@/ui/skeleton";
import { useClerk } from "@clerk/nextjs";
import type { User } from "@repo/types/user";
import { useApi } from "@/src/providers/api";
import { useQuery } from "@tanstack/react-query";
import UpdateUserForm from "@/ui/forms/update-user";
import { LoadableAvatar } from "@/ui/avatar";
import {
	DropdownMenu,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuContent,
	DropdownMenuTrigger,
	DropdownMenuSeparator,
} from "@/ui/dropdown-menu";
import {
	Dialog,
	DialogTitle,
	DialogHeader,
	DialogContent,
	DialogDescription,
} from "@/ui/dialog";

const UserMenuItem = () => {
	const [isProfileDialogOpen, setIsProfileDialogOpen] = useState(false);
	const { signOut: clerkSignOut } = useClerk();

	const handleSignOut = async () => {
		await clerkSignOut({ redirectUrl: "/" });
	};

	const { isLoading, data: user } = useQuery({
		queryKey: ["fetchUser"],
		queryFn: useApi<User>("/user", {
			method: "POST",
		}),
	});

	return (
		<>
			<DropdownMenu>
				<DropdownMenuTrigger className="flex items-center gap-4 hover:bg-orange-600 transition-colors rounded p-2 w-full">
					<LoadableAvatar
						variant="themed"
						src={user?.avatar}
						isLoading={isLoading}
						fallbackText={user?.initials}
					/>

					{isLoading ? (
						<Skeleton variant="themed" className="h-4 w-full" />
					) : (
						<span className="text-sm text-white">{user?.fullName || ""}</span>
					)}
				</DropdownMenuTrigger>
				<DropdownMenuContent className="bg-white">
					<DropdownMenuLabel>My Account</DropdownMenuLabel>
					<DropdownMenuSeparator />
					<DropdownMenuItem onSelect={() => setIsProfileDialogOpen(true)}>
						Profile
					</DropdownMenuItem>
					{/* TODO: psych profile page */}
					<DropdownMenuSeparator className="bg-accent" />
					<DropdownMenuItem onSelect={handleSignOut}>Sign Out</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>

			<Dialog open={isProfileDialogOpen} onOpenChange={setIsProfileDialogOpen}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Profile Details</DialogTitle>
						<DialogDescription>
							Manage your account details and preferences.
						</DialogDescription>
					</DialogHeader>
					<UpdateUserForm
						user={user}
						onSuccess={() => {
							setIsProfileDialogOpen(false);
						}}
					/>
				</DialogContent>
			</Dialog>
		</>
	);
};

export default UserMenuItem;
