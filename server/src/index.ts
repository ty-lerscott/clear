import "./utils/sentry-instrumentation.mjs";
import cors from "cors";
import helmet from "helmet";
import env from "./utils/env";
import pkg from "@/package.json";
import rootPkg from "~/package.json";
import bodyParser from "body-parser";
import APIConductor from "./conductors";
import LoggerController from "./utils/logger";
import express, { type RequestHandler } from "express";
import { ClerkExpressWithAuth } from "@clerk/clerk-sdk-node";

const server = express();

const IS_LOCAL = env.NODE_ENV !== "production";
const urlEncoded = bodyParser.urlencoded({
	extended: true,
});
const ClerkMiddleware = ClerkExpressWithAuth({
	jwtKey: env.CLERK_JWT,
});

const start = async () => {
	server.use(
		cors(),
		helmet(),
		bodyParser.json(),
		urlEncoded,
		LoggerController,
		ClerkMiddleware,
		APIConductor as unknown as RequestHandler,
	);

	server.listen(env.PORT, (err?: Error) => {
		if (err) throw err;
		console.log(
			`🚀  Ready on https://${pkg.name}.${rootPkg.details.hostname}.${IS_LOCAL ? "local" : "com"}`,
		);
	});
};

(async () => {
	await start();
})();
