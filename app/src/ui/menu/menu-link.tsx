"use client";

import Link from "next/link";
import cn from "@/utils/class-name";
import type { PropsWithChildren } from "react";
import { usePathname } from "next/navigation";

const CustomLink = ({
	href,
	title,
	children,
}: PropsWithChildren & { href: string; title: string }) => {
	const pathname = usePathname();

	const isActive = pathname === href;

	return (
		<Link href={href}>
			<span
				className={cn(
					"flex items-center gap-4 p-2 transition-colors hover:bg-primary-hover rounded-md",
					isActive && "bg-primary-hover",
				)}
			>
				{children}
				<span className="text-small">{title}</span>
			</span>
		</Link>
	);
};

export default CustomLink;
