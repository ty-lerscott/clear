"use client";

import { useTheme } from "next-themes";
import { Toaster as Sonner } from "sonner";
import type { ComponentProps } from "react";

type ToasterProps = ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
	const { theme = "system" } = useTheme();

	return (
		<Sonner
			theme={theme as ToasterProps["theme"]}
			className="toaster group"
			toastOptions={{
				classNames: {
					toast:
						"group rounded-lg toast group-[.toaster]:bg-background group-[.toaster]:text-black group-[.toaster]:border-border group-[.toaster]:shadow-lg",
					description: "group-[.toast]:text-muted-text",
					actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary",
					cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted",
				},
			}}
			{...props}
		/>
	);
};

export { Toaster };
