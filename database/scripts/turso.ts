import { config } from "@dotenvx/dotenvx";
import { exec } from "node:child_process";
import { resolve } from "node:path";

const env = config().parsed || {};
const PORT = Number(env.DB_PORT) || 8080;

const dbFile = resolve(process.cwd(), "db", "fog.db");

const command = `turso dev --db-file ${dbFile} --port ${PORT}`;

const child = exec(command);

// Listen for data on stdout
child.stdout.on("data", (data) => {
	console.log(`Output: ${data}`);
});

// Listen for data on stderr
child.stderr.on("data", (data) => {
	console.error(`Error: ${data}`);
});

// Listen for the close event
child.on("close", (code) => {
	console.log(`Process exited with code ${code}`);
});
