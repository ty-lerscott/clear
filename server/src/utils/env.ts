import { config } from "@dotenvx/dotenvx";

config();

export default {
	PORT: process.env.PORT,
	NODE_ENV: process.env.NODE_ENV,
	CLERK_JWT: process.env.CLERK_JWT,
	CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY,
	CLERK_WEBHOOK_SECRET: process.env.CLERK_WEBHOOK_SECRET,
	CLERK_PUBLISHABLE_KEY: process.env.CLERK_PUBLISHABLE_KEY,
};
