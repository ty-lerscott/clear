import { cn } from "@/utils";
import type { Metadata } from "next";
import { Toaster } from "@/ui/sonner";
import type { ReactNode } from "react";
import { Inter } from "next/font/google";
import setMetadata from "@/utils/metadata";
import { ClerkProvider } from "@clerk/nextjs";
import QueryProvider from "@/providers/react-query";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = setMetadata({
	title: "Clear | Cover Letter Engine & Application Review",
	description: "Cover Letter Engine & Application Review",
});

export default function RootLayout({
	children,
}: {
	children: ReactNode;
}) {
	return (
		<ClerkProvider>
			<html lang="en" className="darks">
				<body className={cn(inter.className)}>
					<QueryProvider>{children}</QueryProvider>
					<Toaster expand richColors />
				</body>
			</html>
		</ClerkProvider>
	);
}
