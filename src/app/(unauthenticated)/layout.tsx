import Link from "next/link";
import { Button } from "@/ui/button";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import Separator from "@/ui/separator";
import setMetadata from "@/utils/metadata";
import { SignInButton, SignUpButton } from "@clerk/nextjs";

import "../globals.css";

export const metadata: Metadata = setMetadata({
	title: "Clear | Cover Letter Engine & Application Review",
	description: "Cover Letter Engine & Application Review",
});

export default function UnauthenticatedLayout({
	children,
}: {
	children: ReactNode;
}) {
	return (
		<>
			<header className="flex items-center py-2 px-4 justify-between bg-background h-[3.25rem]">
				<h1 className="text-xl">
					<Link
						href="/public"
						className="py-1 pr-1 text-primary hover:text-primary-hover font-bold"
					>
						@maestro/clear
					</Link>
				</h1>
				<div className="flex gap-4 items-center">
					<SignUpButton>
						<Button size="sm" variant="outline">
							Sign Up
						</Button>
					</SignUpButton>
					<SignInButton>
						<Button size="sm">Log In</Button>
					</SignInButton>
				</div>
			</header>

			<Separator />

			<main>{children}</main>
		</>
	);
}
