import { toast } from "sonner";
import omit from "object.omit";
import type { User } from "@/types/user";
import type { ClerkAPIError } from "@clerk/types";

const postUser =
	(onError: (clerkError: ClerkAPIError) => void) =>
	async (user: Partial<User>): Promise<User | undefined> => {
		const omittedUser = omit(user, ["fullName", "avatar"]);

		try {
			const resp = await fetch("/api/user", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(omittedUser),
			});

			const data = await resp.json();

			if (!resp.ok) {
				onError(data);
				toast.error(data.message);
			}

			return data;
		} catch (error) {
			const clerkError = error as ClerkAPIError;

			onError(clerkError);
			toast.error(clerkError.message);

			return;
		}
	};

export default postUser;
