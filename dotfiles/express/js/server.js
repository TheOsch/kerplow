/* eslint-disable @typescript-eslint/no-require-imports, @typescript-eslint/no-var-requires */
const express = require("express");
const fs = require("fs");
const logger = require("morgan");
const path = require("path");

const { config } = require("./config");

const app = express();

app.set("views", path.join(__dirname, "views"));

app.set("view engine", "ejs");

if (config.get("env") !== "production") {
	app.use(logger("dev"));
}

app.use(express.static(path.join(__dirname, "public")));

(function bindRoutes(routesDirectory) {
	const files = [];

	(function recurse(directory) {
		for (const file of fs.readdirSync(directory)) {
			if (fs.statSync(path.join(directory, file)).isDirectory() === true) {
				recurse(path.join(directory, file));
			} else if (path.extname(file).toLowerCase() === ".js") {
				files.push(path.join(directory, file));
			}
		}
	})(routesDirectory);

	for (const file of files) {
		const route = require(file);

		for (let verb of Object.keys(route)) {
			if (verb === "del") {
				verb = "delete";
			}

			const parsedPath = path.parse(file.substring(routesDirectory.length));
			let pathName = parsedPath.dir;

			if (parsedPath.name !== "index") {
				pathName = path.join(pathName, parsedPath.name);
			}

			pathName = pathName.replace(/\\/g, "/");

			if (route[verb].length === 2) {
				console.log("Binding " + verb.toUpperCase() + " " + pathName);

				app[verb](pathName, route[verb]);
			} else {
				const { path = pathName, middleware = [], callback } = route[verb](pathName);

				console.log("Binding " + verb.toUpperCase() + " " + path);

				app[verb](path, ...middleware, callback);
			}
		}
	}
})(path.join(__dirname, "routes"));

app.listen(config.get("port"), function() {
	console.log("Listening on port " + this.address().port);
});
