import { sql } from "drizzle-orm";
import client from "@/client";

async function clearDatabase() {
	await client.run(sql`DROP TABLE posting;`);
	await client.run(sql`DROP TABLE user;`);
	await client.run(sql`DROP TABLE company;`);
	await client.run(sql`DROP TABLE statusHistory;`);
}

(async () => {
	await clearDatabase();
})();
