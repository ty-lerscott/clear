import { config } from "@dotenvx/dotenvx";
import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import schema from "./schemas";

const env = config().parsed || {};

const tursoClient = createClient({
	url: `http://localhost:${env.PORT}`,
	authToken: env.TURSO_AUTH_TOKEN,
});

export default drizzle(tursoClient, { schema });
