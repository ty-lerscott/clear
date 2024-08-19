"use client";

import { cn } from "@/utils";
import Skeleton, { type SkeletonProps } from "@/ui/skeleton";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import {
	forwardRef,
	type ElementRef,
	type ComponentPropsWithoutRef,
} from "react";

const Avatar = forwardRef<
	ElementRef<typeof AvatarPrimitive.Root>,
	ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>
>(({ className, ...props }, ref) => (
	<AvatarPrimitive.Root
		ref={ref}
		className={cn(
			"relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",
			className,
		)}
		{...props}
	/>
));
Avatar.displayName = AvatarPrimitive.Root.displayName;

const AvatarImage = forwardRef<
	ElementRef<typeof AvatarPrimitive.Image>,
	ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => (
	<AvatarPrimitive.Image
		ref={ref}
		className={cn("aspect-square h-full w-full", className)}
		{...props}
	/>
));
AvatarImage.displayName = AvatarPrimitive.Image.displayName;

const AvatarFallback = forwardRef<
	ElementRef<typeof AvatarPrimitive.Fallback>,
	ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(({ className, ...props }, ref) => (
	<AvatarPrimitive.Fallback
		ref={ref}
		className={cn(
			"flex h-full w-full items-center justify-center rounded-full bg-white",
			className,
		)}
		{...props}
	/>
));
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName;

const LoadableAvatar = ({
	src,
	isLoading,
	className,
	fallbackText,
	variant,
}: {
	src?: string;
	className?: string;
	isLoading?: boolean;
	fallbackText?: string;
	variant?: SkeletonProps["variant"];
}) => {
	return (
		<Avatar className={cn("size-8", className)}>
			{isLoading ? (
				<Skeleton round="full" variant={variant} />
			) : (
				<>
					<AvatarImage src={src} />
					<AvatarFallback className="bg-border text-primary font-bold">
						{fallbackText}
					</AvatarFallback>
				</>
			)}
		</Avatar>
	);
};

export { Avatar, AvatarImage, AvatarFallback, LoadableAvatar };
