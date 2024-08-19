import { cn } from "@/utils";
import { type HTMLAttributes, forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";

const skeletonVariants = cva("animate-pulse size-[inherit]", {
	variants: {
		variant: {
			default: "bg-muted",
			themed: "bg-muted-themed",
		},
		round: {
			default: "rounded-md",
			full: "rounded-full",
		},
	},
	defaultVariants: {
		variant: "default",
		round: "default",
	},
});

export interface SkeletonProps
	extends HTMLAttributes<HTMLDivElement>,
		VariantProps<typeof skeletonVariants> {}

const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(
	({ className, variant, round, ...props }, ref) => {
		return (
			<div
				className={cn(
					// "shrink-0",
					skeletonVariants({ variant, round, className }),
				)}
				{...props}
			/>
		);
	},
);

export default Skeleton;
