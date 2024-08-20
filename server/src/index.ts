import cors from "cors";
import helmet from "helmet";
import express from "express";
import env from "./lib/dotenv";
import pkg from "~/package.json";
import bodyParser from "body-parser";
import APIConductor from "./conductors";
import LoggerController from "@/utils/logger";

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
app.use(APIConductor);

app.listen(env.PORT, (err?: Error) => {
	if (err) throw err;
	console.log(
		`> Ready on https://${pkg.name}.lerscott.${IS_LOCAL ? "local" : "com"}`,
	);
});
