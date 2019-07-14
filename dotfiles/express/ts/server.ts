import * as express from "express";
import * as helmet from "helmet";
import * as logger from "morgan";
import * as path from "path";

import { config } from "./config";
import { router } from "./router";

//import * as requestDebug from "request-debug";
//import * as requestJs from "request";

//if (config.get("env") !== "production") {
// 	requestDebug(requestJs);
//}

export let app = express();

app.use(helmet());

app.set("views", path.join(__dirname, "views"));

app.set("view engine", "ejs");

if (config.get("env") !== "production") {
	app.use(logger("dev"));
}

app.use(express.static(path.join(__dirname, "public")));

router();

app.listen(config.get("port"), function() {
	console.log("Listening on port " + this.address().port);
});
