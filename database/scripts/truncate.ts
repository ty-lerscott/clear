import client from "@/client";
import { tables } from "@/schemas";

const TABLES = [
	tables.Users,
	tables.Companies,
	tables.JobPostings,
	tables.Applications,
	tables.StatusHistory,
];

const clearDB = async () => {
	for (const table of TABLES) {
		await client.delete(table);
	}
};

(async () => {
	await clearDB();
})();
