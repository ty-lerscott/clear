import merge from "lodash.mergewith";
import plugin from "tailwindcss/plugin";
import colors from "tailwindcss/colors";
import type { Config } from "tailwindcss";

const HeaderStyles = (
	theme: (theme: string) => string,
): Record<string, string> => ({
	letterSpacing: "0.05em",
	// fontFamily: "var(--font-zilla-slab)",
	fontWeight: theme("fontWeight.semibold"),
});

const config = {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: "2rem",
			screens: {
				"2xl": "1400px",
			},
		},
		colors: {
			transparent: "transparent",
			gray: colors.gray,
			red: {
				50: "#FFF1F0",
				100: "#FFE3E0",
				200: "#FFC7C2",
				300: "#FFA69E",
				400: "#FF8A80",
				500: "#FF6E61",
				600: "#FF2D1A",
				700: "#D11100",
				800: "#8F0C00",
				900: "#470600",
				950: "#240300",
			},
			orange: {
				50: "#FEF7F1",
				100: "#FDECDE",
				200: "#FBDBC1",
				300: "#F8C8A0",
				400: "#F6B783",
				500: "#F4A462",
				600: "#F08024",
				700: "#BF5D0D",
				800: "#813F09",
				900: "#3E1E04",
				950: "#211002",
			},
			yellow: {
				50: "#FEFBEB",
				100: "#FEF7D7",
				200: "#FDEFAB",
				300: "#FBE783",
				400: "#FADF56",
				500: "#F9D72F",
				600: "#E4BF07",
				700: "#AE9105",
				800: "#726003",
				900: "#3B3202",
				950: "#1E1901",
			},
			green: {
				50: "#EDF8F5",
				100: "#DBF0EB",
				200: "#BAE3D9",
				300: "#95D5C5",
				400: "#75C8B3",
				500: "#50B99F",
				600: "#3D9982",
				700: "#2D7160",
				800: "#1F4D41",
				900: "#0F241F",
				950: "#07120F",
			},
			blue: {
				50: "#E8F3F8",
				100: "#D1E8F0",
				200: "#A2D1E2",
				300: "#70B7D2",
				400: "#41A0C3",
				500: "#307C97",
				600: "#266278",
				700: "#1C4959",
				800: "#14333E",
				900: "#0A191F",
				950: "#050D0F",
			},
			socials: {
				linkedin: "#0077B5",
			},
		},
		extend: {
			colors: {
				border: "var(--border)",
				input: "var(--input)",
				ring: "var(--ring)",
				white: "var(--white)",
				black: "var(--black)",
				disabled: "var(--disabled)",
				background: "var(--background)",
				foreground: "var(--foreground)", // TODO: remove
				primary: {
					DEFAULT: "var(--primary)",
					text: "var(--white)",
					hover: "var(--primary-hover)",
					accent: "var(--primary-accent)",
				},
				destructive: {
					DEFAULT: "var(--destructive)",
					hover: "var(--destructive-hover)",
					disabled: "var(--destructive-disabled)",
					"disabled-bg": "var(--destructive-disabled-bg)",
				},
				muted: {
					DEFAULT: "var(--muted)",
					text: "var(--muted-text)",
					themed: "var(--muted-themed)",
					disabled: "var(--muted-disabled)",
				},
				accent: {
					DEFAULT: "var(--accent)",
					light: "var(--accent-light)",
				},
				shift: {
					DEFAULT: "var(--shift)",
					dark: "var(--shift-dark)",
				},
				popover: {
					DEFAULT: "var(--popover)",
					foreground: "var(--popover-foreground)",
				},
				card: {
					DEFAULT: "var(--card)",
					foreground: "var(--card-foreground)",
				},
			},
			borderRadius: {
				lg: "var(--radius)",
				md: "calc(var(--radius) - 2px)",
				sm: "calc(var(--radius) - 4px)",
			},
			keyframes: {
				"accordion-down": {
					from: { height: "0" },
					to: { height: "var(--radix-accordion-content-height)" },
				},
				"accordion-up": {
					from: { height: "var(--radix-accordion-content-height)" },
					to: { height: "0" },
				},
			},
			animation: {
				"accordion-down": "accordion-down 0.2s ease-out",
				"accordion-up": "accordion-up 0.2s ease-out",
			},
		},
	},
	plugins: [
		require("tailwindcss-animate"),
		plugin(({ addBase, theme }) => {
			addBase({
				"*": {
					lineHeight: "1",
				},
				body: {
					color: "var(--text)",
					backgroundColor: "var(--background)",
				},
				a: {
					transitionProperty:
						"color, background-color, border-color, text-decoration-color, fill, stroke",
					transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
					transitionDuration: "150ms",
				},
				ul: {
					listStyleType: theme("listStyleType.disc"),
					listStylePosition: "inside",
					lineHeight: theme("leading.4"),
					display: "grid",
					gap: theme("spacing.2"),
				},
				h1: merge(HeaderStyles(theme), {
					fontSize: theme("fontSize.3xl"),
				}),
				h2: merge(HeaderStyles(theme), {
					fontSize: theme("fontSize.2xl"),
				}),
				h3: merge(HeaderStyles(theme), {
					fontSize: theme("fontSize.xl"),
				}),
				h4: merge(HeaderStyles(theme), {
					fontSize: theme("fontSize.lg"),
				}),
				h5: HeaderStyles(theme),
				h6: merge(HeaderStyles(theme), {
					fontSize: theme("fontSize.sm"),
				}),
			});
		}),
	],
} satisfies Config;

export default config;
