import client from "@/client";
import { tables } from "@/schemas";

const TABLES = [
	tables.User,
	tables.Company,
	tables.JobPosting,
	tables.StatusHistory,
];

const deleteDB = async () => {
	for (const table of TABLES) {
		await client.delete(table);
	}
};

(async () => {
	await deleteDB();
})();
