/* eslint-disable @typescript-eslint/no-require-imports, @typescript-eslint/no-var-requires */
const express = require("express");
const fs = require("fs");
const logger = require("morgan");
const path = require("path");

const { config } = require("./config");

export const app = express();

app.use(helmet());

app.set("views", path.join(__dirname, "views"));

app.set("view engine", "ejs");

if (config.get("env") !== "production") {
	app.use(logger("dev"));
}

(function bindRoutes(routesDirectory) {
	const files = [];

	(function recurse(directory) {
		for (const file of fs.readdirSync(directory)) {
			if (fs.statSync(path.join(directory, file)).isDirectory()) {
				recurse(path.join(directory, file));
			} else if (path.extname(file).toLowerCase() === ".js") {
				files.push(path.join(directory, file));
			}
		}
	})(routesDirectory);

	for (const file of files) {
		const route = require(file);

		for (const routeHandler of Object.keys(route)) {
			let verb;

			if (routeHandler === "del") {
				verb = "delete";
			} else {
				verb = routeHandler;
			}

			const parsedPath = path.parse(file.substring(routesDirectory.length));
			let pathName = parsedPath.dir;

			if (parsedPath.name !== "index") {
				pathName = path.join(pathName, parsedPath.name);
			}

			pathName = pathName.replace(/\\/g, "/");

			if (route[routeHandler].length === 2) {
				console.log("Binding " + verb.toUpperCase() + " " + pathName);

				app[verb](pathName, route[routeHandler]);
			} else {
				const { path = pathName, middleware = [], callback } = route[routeHandler](pathName);

				console.log("Binding " + verb.toUpperCase() + " " + path);

				app[verb](path, ...middleware, callback);
			}
		}
	}

	app.get("*", function(request, response, next) {
		const pathName = path.join(__dirname, "public", request.path);

		if (pathName.startsWith(path.join(__dirname, "public"))) {
			if (fs.existsSync(pathName)) {
				if (!fs.statSync(pathName).isDirectory()) {
					return response.sendFile(pathName);
				}
			}
		}

		response.status(404);

		return next("Cannot GET " + pathName);
	});
})(path.join(__dirname, "routes"));

app.listen(config.get("port"), function() {
	console.log("Listening on http://localhost:" + this.address().port + "/");
});
