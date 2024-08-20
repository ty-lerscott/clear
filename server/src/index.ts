import "./lib/instrument";
import cors from "cors";
import helmet from "helmet";
import env from "./lib/dotenv";
import bodyParser from "body-parser";
// import * as Sentry from "@sentry/node";
import pkg from "~/app/package.json";
import APIConductor from "./conductors";
import LoggerController from "@/utils/logger";
import express, { type RequestHandler } from "express";

const app = express();
const IS_LOCAL = env.NODE_ENV !== "production";
const urlEncoded = bodyParser.urlencoded({
	extended: true,
});

app.use(cors());
app.use(helmet());
app.use(bodyParser.json());
app.use(urlEncoded);
app.use(LoggerController);
app.use(APIConductor as unknown as RequestHandler);

// Sentry.setupExpressErrorHandler(app);

app.get("/debug-sentry", function mainHandler() {
	throw new Error("My first Sentry error!");
});

// The error handler must be registered before any other error middleware and after all controllers

app.listen(env.PORT, (err?: Error) => {
	if (err) throw err;
	console.log(
		`> Ready on https://${pkg.name}.lerscott.${IS_LOCAL ? "local" : "com"}`,
	);
});
