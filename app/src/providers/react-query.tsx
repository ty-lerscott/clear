"use client";

import { toast } from "sonner";
import type { ReactNode } from "react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import {
	isServer,
	QueryCache,
	QueryClient,
	QueryClientProvider,
	defaultShouldDehydrateQuery,
} from "@tanstack/react-query";
import { Toaster } from "@/ui/sonner";

const IS_LOCAL = process.env.NEXT_PUBLIC_APP_ENV === "development";

const makeQueryClient = () =>
	new QueryClient({
		queryCache: new QueryCache({
			onError: (error) => {
				toast.error(error.message);
			},
		}),
		defaultOptions: {
			queries: {
				staleTime: 60 * 1000,
			},
			dehydrate: {
				// include pending queries in dehydration
				shouldDehydrateQuery: (query) =>
					defaultShouldDehydrateQuery(query) ||
					query.state.status === "pending",
			},
		},
	});

let browserQueryClient: QueryClient | undefined = undefined;

export const getQueryClient = () => {
	if (isServer) {
		// Server: always make a new query client
		return makeQueryClient();
		// biome-ignore lint/style/noUselessElse: <explanation>
	} else {
		// Browser: make a new query client if we don't already have one
		// This is very important, so we don't re-make a new client if React
		// suspends during the initial render. This may not be needed if we
		// have a suspense boundary BELOW the creation of the query client
		if (!browserQueryClient) browserQueryClient = makeQueryClient();
		return browserQueryClient;
	}
};

const QueryProvider = ({ children }: { children: ReactNode }) => {
	const queryClient = getQueryClient();

	return (
		<QueryClientProvider client={queryClient}>
			{children}
			<Toaster expand richColors />
			{IS_LOCAL ? <ReactQueryDevtools /> : undefined}
		</QueryClientProvider>
	);
};

export default QueryProvider;
