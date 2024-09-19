import Link from "next/link";
import User from "@/ui/menu/user";
import type { Metadata } from "next";
import Separator from "@/ui/separator";
import type { ReactNode } from "react";
import MenuLink from "@/ui/menu/menu-link";
import setMetadata from "@/utils/metadata";
import { TbReceiptDollar } from "react-icons/tb";
import { GrOverview, GrList, GrDocumentPdf } from "react-icons/gr";

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
				<div>
					<h1 className="text-white text-center text-lg">
						<Link href="/">@maestro/clear</Link>
					</h1>
					<Separator className="bg-primary-accent mt-2 mb-4" />
				</div>

				<div
					data-testid="FooterMenu"
					className="flex flex-col gap-2 text-white h-full"
				>
					<MenuLink href="/overview" title="Overview">
						<GrOverview className="size-5" />
					</MenuLink>

					<MenuLink href="/tracker" title="Tracker">
						<GrList className="size-5" />
					</MenuLink>

					<MenuLink href="/billing" title="Billing">
						<TbReceiptDollar className="size-5" />
					</MenuLink>

					<MenuLink href="/cover-letters" title="Cover Letters">
						<GrDocumentPdf className="size-5" />
					</MenuLink>
				</div>

				<div>
					<Separator className="bg-primary my-2" />
					<User />
				</div>
			</div>

			<main className="p-4 w-full overflow-x-hidden">{children}</main>
		</div>
	);
}
