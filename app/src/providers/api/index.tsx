"use client";

import { toast } from "sonner";
import merge from "lodash.mergewith";
import { useAuth, useUser } from "@clerk/nextjs";
import {
	createContext,
	type ReactNode,
	useContext,
	useState,
	useEffect,
} from "react";

const IS_LOCAL = process.env.NODE_ENV !== "production";

type Methods = "GET" | "POST" | "OPTIONS" | "PUT" | "DELETE";

type ApiOptions = {
	method?: Methods;
	body?: Record<string, unknown>;
	headers?: Record<string, string | undefined>;
};

const ApiContext = createContext<{
	method: Methods;
	headers: Record<string, string | undefined>;
}>({
	method: "POST",
	headers: {
		"x-user-id": "",
		Authorization: "",
	},
});

const ApiProvider = ({ children }: { children: ReactNode }) => {
	const [token, setToken] = useState<string | undefined>();
	const [userId, setUserId] = useState<string | undefined>();
	const { getToken, ...rest } = useAuth();
	const { user } = useUser();

	useEffect(() => {
		if (user) {
			getToken()
				.then((val) => {
					if (val) {
						setToken(val);
					}
				})
				.catch((err) => {
					toast.error((err as Error).message);
				});
			setUserId(user?.id);
		}
	}, [user, getToken]);

	return (
		<ApiContext.Provider
			value={{
				method: "POST",
				headers: {
					"x-user-id": userId,
					Authorization: token,
				},
			}}
		>
			{children}
		</ApiContext.Provider>
	);
};

const getInstance =
	<T extends Record<string, unknown>>(path: string, options: ApiOptions) =>
	async (body?: Record<string, unknown>) => {
		try {
			return fetch(
				`https://fog.lerscott.${IS_LOCAL ? "local" : "com"}${path}`,
				merge(
					{ headers: { "content-type": "application/json" } },
					options,
					body ? { body: JSON.stringify(body) } : {},
				) as RequestInit,
			).then((res) => res.json() as Promise<T>);
		} catch (err) {
			toast.error((err as Error).message);
		}
	};

const useApi = <T extends Record<string, unknown>>(
	path: string,
	options?: ApiOptions,
) => {
	const context = useContext(ApiContext);

	if (!context) {
		throw new Error("useApi must be used within an ApiProvider");
	}

	if (Object.values(context.headers).some((val) => !val)) {
		return;
	}

	return getInstance<T>(path, merge({}, context, options));
};

export { ApiProvider, useApi };
