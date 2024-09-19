import { cn } from "@/utils";
import Providers from "@/providers";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Inter } from "next/font/google";
import setMetadata from "@/utils/metadata";

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
		<html lang="en" className="darks">
			<body className={cn(inter.className)}>
				<Providers>{children}</Providers>
			</body>
		</html>
	);
}
