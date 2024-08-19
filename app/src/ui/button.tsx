import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/utils";

const buttonVariants = cva(
	"inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none",
	{
		variants: {
			variant: {
				default:
					"bg-primary text-white hover:bg-primary-hover disabled:bg-disabled",
				outline:
					"border border-border bg-background hover:bg-accent-light text-primary disabled:text-disabled disabled:border-disabled",
				destructive:
					"bg-destructive border border-destructive text-white hover:bg-destructive-hover focus-visible:ring-destructive disabled:bg-destructive-disabled-bg disabled:text-destructive-disabled disabled:border-destructive-disabled-bg",
				// ghost: "hover:bg-accent",
				bare: "hover:text-primary-hover",
				// link: "text-primary underline-offset-4 hover:underline",
			},
			size: {
				default: "h-10 px-4 py-2",
				sm: "h-9 px-4",
				lg: "h-11 px-8",
				icon: "h-10 w-10",
				bare: "",
			},
			options: {
				noPadding: "p-0",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
		},
	},
);

export interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof buttonVariants> {
	asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	(
		{
			className,
			variant,
			size,
			type = "button",
			options,
			asChild = false,
			...props
		},
		ref,
	) => {
		const Comp = asChild ? Slot : "button";
		return (
			<Comp
				ref={ref}
				className={cn(buttonVariants({ variant, size, className, options }))}
				type={type}
				{...props}
			/>
		);
	},
);
Button.displayName = "Button";

export { Button, buttonVariants };
