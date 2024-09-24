import { resolve } from "node:path";
import type { Config } from "drizzle-kit";
import { config as dotenvConfig } from "@dotenvx/dotenvx";

const cwd = process.cwd();
const env = dotenvConfig().parsed || {};

const DrizzleConfig = {
	driver: "turso",
	dialect: "sqlite",
	schema: `${resolve(cwd, "src", "schemas")}/*`,
	out: resolve(cwd, "db", "migrations"),
	dbCredentials: {
		url: `http://localhost:${env.DB_PORT}`,
		authToken: env.TURSO_AUTH_TOKEN,
	},
} satisfies Config;

export default DrizzleConfig;
