import client from "@/client";
import { tables } from "@/schemas";
import generateUser from "@/generators/user";

const run = async () => {
	await client.insert(tables.Users).values(generateUser()).run();
};

(async () => {
	await run();
})();
