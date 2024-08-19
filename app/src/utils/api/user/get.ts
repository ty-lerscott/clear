import type { User } from "@/types/user";

const getUser = async (): Promise<User | undefined> => {
	try {
		const resp = await fetch("/api/user", {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		});

		return await resp.json();
	} catch (error) {
		// TODO: sonner
		console.error("getUser error", (error as Error).message);
	}

	return;
};

export default getUser;
