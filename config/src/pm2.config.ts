import { resolve } from "node:path";
import { readdirSync, statSync } from "node:fs";
import generateConfig from "./utils/generate-config";

const serverPath = resolve(process.cwd(), "..", "..", "server");
const apps = readdirSync(serverPath).filter((file) =>
	statSync(resolve(serverPath, file)).isDirectory(),
);

const config = {
	apps: apps.map((project) => generateConfig(`apps/${project}`)),
};

module.exports = config;
