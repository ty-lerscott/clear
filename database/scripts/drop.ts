import { sql } from "drizzle-orm";
import client from "@/client";
import { tables } from "@/schemas";

async function clearDatabase() {
	await client.run(sql`DROP TABLE postings;`);
	await client.run(sql`DROP TABLE users;`);
	await client.run(sql`DROP TABLE companies;`);
	await client.run(sql`DROP TABLE statusHistory;`);
}

(async () => {
	await clearDatabase();
})();
