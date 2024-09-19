import type { ReactNode } from "react";
import QueryProvider from "./react-query";
import { ClerkProvider } from "@clerk/nextjs";
import { ApiProvider } from "@/src/providers/api";

const Providers = ({ children }: { children: ReactNode }) => {
	return (
		<ClerkProvider>
			<ApiProvider>
				<QueryProvider>{children}</QueryProvider>
			</ApiProvider>
		</ClerkProvider>
	);
};

export default Providers;
