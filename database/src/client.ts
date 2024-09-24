import path from "node:path";
import { config } from "@dotenvx/dotenvx";
import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import schema from "./schemas";

// NOTE: This is relative to the root of the project running in a monorepo
const envPath = path.join(process.cwd(), "..", "database", ".env");

const env =
	config({
		path: envPath,
	}).parsed || {};

const tursoClient = createClient({
	url: `http://localhost:${env.DB_PORT}`,
	authToken: env.TURSO_AUTH_TOKEN,
});

export default drizzle(tursoClient, { schema });
