import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/utils";

const badgeVariants = cva(
	"inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
	{
		variants: {
			variant: {
				default: "bg-gray-200 text-gray-800",
				linkedin: "bg-socials-linkedin text-white",
				remote: "bg-green-500 text-white",
				hybrid: "bg-yellow-500 text-yellow-900",
				"in-office": "bg-red-700 text-red-50",
				ready: "border-green-500 text-green-500",
				pending: "border-blue-300 text-blue-300",
				applied: "bg-blue-100 border-blue-200 text-blue-600",
				interviewing: "bg-green-100 border-green-200 text-green-600",
				negotiating: "bg-green-600 border-green-600 text-green-100",
				"got-the-job": "bg-green-800 border-green-800  text-green-50",
				"no-answer": "bg-gray-200 text-gray-500",
				rejected: "bg-red-700 border-red-700 text-red-50",
				"rejected-myself": "bg-red-200 text-red-700",
			},
		},
		defaultVariants: {
			variant: "linkedin",
		},
	},
);

export interface BadgeProps
	extends React.HTMLAttributes<HTMLDivElement>,
		VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
	return (
		<div className={cn(badgeVariants({ variant }), className)} {...props} />
	);
}

export { Badge, badgeVariants };
