import Link from "next/link";
import User from "@/ui/menu/user";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import Separator from "@/ui/separator";
import setMetadata from "@/utils/metadata";

import "../globals.css";

export const metadata: Metadata = setMetadata({
	title: "Clear | Dashboard",
	description: "Cover Letter Engine & Application Review",
});

export default async function RootLayout({
	children,
}: {
	children: ReactNode;
}) {
	return (
		<div className="flex">
			<div className="flex flex-col justify-between w-[18rem] h-screen p-4 bg-gradient-to-b from-primary to-shift border-r border-r-shift">
				<h1 className="text-white text-center text-lg">
					<Link href="/">@maestro/clear</Link>
				</h1>

				<div data-testid="FooterMenu" className="flex flex-col gap-2">
					<Separator className="bg-primary" />
					<User />
				</div>
			</div>

			<main className="p-4 w-full overflow-x-hidden">{children}</main>
		</div>
	);
}
