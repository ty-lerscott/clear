import type { User } from "@repo/types/user";
import type { Response } from "@repo/types/api";
import { clerkClient } from "@clerk/clerk-sdk-node";
import { NOT_FOUND, OK, SERVER_ERROR } from "@repo/config/src/status-codes";

const user = {
	fetchUser: async (userId: string): Promise<Response<User>> => {
		try {
			const user = await clerkClient.users.getUser(userId);

			if (!user) {
				return Promise.resolve({
					error: "User not found",
					status: NOT_FOUND,
				});
			}

			const name = {
				lastName: user.lastName as string,
				firstName: user.firstName as string,
				fullName: `${user.firstName} ${user.lastName}`,
				initials: `${user.firstName?.[0]}${user.lastName?.[0]}`.toUpperCase(),
			};

			return {
				status: OK,
				data: {
					...name,
					avatar: user.imageUrl,
					username: user.username as string,
					emailAddress: user.emailAddresses[0].emailAddress,
				},
			};
		} catch (err) {
			return Promise.resolve({
				error: (err as Error).message,
				status: SERVER_ERROR,
			});
		}
	},
	updateUser: async (
		userId: string,
		user: Record<string, unknown>,
	): Promise<Response> => {
		try {
			const clerkUser = await clerkClient.users.getUser(userId);

			if (!clerkUser) {
				return {
					error: "User not found",
					status: NOT_FOUND,
				};
			}

			await clerkClient.users.updateUser(userId, user);

			return {
				status: OK,
			};
		} catch (err) {
			return {
				error: (err as Error).message,
				status: SERVER_ERROR,
			};
		}
	},
};

export default user;
