"use strict";

let express = require("express");
let logger = require("morgan");
let path = require("path");

let { config } = require("./config");
let { router } = require("./router");

//let requestDebug = require("request-debug");
//let requestJs = require("request");

//if (config.get("env") !== "production") {
// 	requestDebug(requestJs);
//}

let app = express();

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
