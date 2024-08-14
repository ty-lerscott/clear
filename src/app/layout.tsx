import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Inter } from "next/font/google";
import setMetadata from "@/utils/metadata";
import {
	SignedIn,
	SignedOut,
	UserButton,
	SignInButton,
	ClerkProvider,
} from "@clerk/nextjs";

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
			<html lang="en">
				<body>
					<SignedOut>
						<SignInButton />
					</SignedOut>
					<SignedIn>
						<UserButton />
					</SignedIn>
					{children}
				</body>
			</html>
		</ClerkProvider>
	);
}
