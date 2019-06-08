"use strict";

// tslint:disable: no-require-imports
let { execSync } = require("child_process");
let fs = require("fs");
let JSON5 = require("json5");
let mkdirpSync = require("mkdirp").sync;
let path = require("path");
let readline = require("readline").createInterface({
	"input": process.stdin,
	"output": process.stdout
});

let kerplowDirectory = path.join(__dirname, "..");
let baseDirectory = path.join(__dirname, "..", "..", "..");

let dependencies = [];
let devDependencies = [];

function confirm(prompt) {
	return new Promise(function(resolve, reject) {
		readline.question(prompt, async function(answer) {
			if (/^(y(es)?)?$/i.test(answer)) {
				resolve(true)
			} else if (/^n(o)?$/i.test(answer)) {
				resolve(false);
			} else {
				resolve(await confirm(prompt));
			}

			readline.pause();
		});
	});
}

function addKeyValuePairToJson5File(key, value, file) {
	let parsedFile = JSON5.parse(fs.readFileSync(file));

	let lastKey = key.pop();

	let parentKey = key.reduce(function(object, key) {
		return object[key];
	}, parsedFile);

	parentKey[lastKey] = value;

	fs.writeFileSync(file, JSON.stringify(parsedFile, undefined, 2));
}

function deleteKeyFromJson5File(key, file) {
	let parsedFile = JSON5.parse(fs.readFileSync(file));

	let lastKey = key.pop();

	let parentKey = key.reduce(function(object, key) {
		return object[key];
	}, parsedFile);

	delete parentKey[lastKey];

	fs.writeFileSync(file, JSON.stringify(parsedFile, undefined, 2));
}

function sleep(ms) {
	return new Promise(function(resolve, reject) {
		setTimeout(resolve, ms);
	});
}

// tslint:disable-next-line: no-floating-promises
(async function() {
	if (!fs.existsSync(path.join(baseDirectory, "package.json"))) {
		execSync("npm init", { "cwd": baseDirectory, "stdio": "inherit" });
		console.log();
	}

	console.log("> TypeScript");
	console.log("> ==========");
	console.log(">");
	console.log(">     TypeScript is a strict syntactical superset of JavaScript that adds");
	console.log(">     optional static typing to the language.");
	console.log(">");
	console.log("> Pros:");
	console.log("> =====");
	console.log(">     - Compile time type checking");
	console.log(">     - Great tooling");
	console.log(">");
	console.log("> Cons:");
	console.log("> =====");
	console.log(">     - People will think you like Microsoft, when you really just like Anders");
	console.log(">       Hejlsberg");
	console.log();

	let typescript = await confirm("TypeScript? [Y/n] ");
	console.log();

	if (typescript === true) {
		dependencies.push("cross-env");
		dependencies.push("typescript");
		dependencies.push("ts-node");

		devDependencies.push("tslint");
		devDependencies.push("@types/node");

		fs.copyFileSync(path.join(kerplowDirectory, "tslint.json"), path.join(baseDirectory, "tslint.json"));
	}

	console.log("> Visual Studio Code");
	console.log("> ==================");
	console.log(">");
	console.log(">     Visual Studio Code is a code editor with support for debugging, source");
	console.log(">     control, and IDE-like code navigation and project management.");
	console.log(">");
	console.log("> Pros:");
	console.log("> =====");
	console.log(">     - IntelliSense");
	console.log(">     - Better debugging than you thought possible");
	console.log(">     - Extraordinary extensibility");
	console.log(">");
	console.log("> Cons:");
	console.log("> =====");
	console.log(">     - People will think you like Microsoft");
	console.log(">     - Depending on who you're working with, you will semi-frequently have to");
	console.log(">       say: \"No, not Visual Studio, /Visual Studio Code/.\"");
	console.log();

	let vscode = await confirm("VS Code? [Y/n] ");
	console.log();

	if (vscode === true) {
		mkdirpSync(path.join(baseDirectory, ".vscode"));

		fs.copyFileSync(path.join(kerplowDirectory, "dotfiles", ".vscode", "extensions.json"), path.join(baseDirectory, ".vscode", "extensions.json"));

		if (typescript === true) {
			fs.copyFileSync(path.join(kerplowDirectory, "dotfiles", ".vscode", "ts", "launch.json"), path.join(baseDirectory, ".vscode", "launch.json"));
		} else {
			fs.copyFileSync(path.join(kerplowDirectory, "dotfiles", ".vscode", "js", "launch.json"), path.join(baseDirectory, ".vscode", "launch.json"));
		}

		fs.copyFileSync(path.join(kerplowDirectory, "dotfiles", ".vscode", "settings.json"), path.join(baseDirectory, ".vscode", "settings.json"));
	}

	console.log("> Express");
	console.log("> =======");
	console.log(">");
	console.log(">     Express is a web application framework for Node.js.");
	console.log(">");
	console.log("> Pros:");
	console.log("> =====");
	console.log(">     - De facto standard server framework for Node.js.");
	console.log(">");
	console.log("> Cons:");
	console.log("> =====");
	console.log(">     - \"Middleware\" can be a confusing concept for beginners");
	console.log(">     - Adds boilerplate");
	console.log();

	let express = await confirm("Express? [Y/n] ");
	console.log();

	if (express === true) {
		dependencies.push("convict");
		dependencies.push("express");
		dependencies.push("helmet");
		dependencies.push("morgan");
		dependencies.push("nodemon");

		if (typescript === true) {
			devDependencies.push("@types/convict");
			devDependencies.push("@types/express");
			devDependencies.push("@types/helmet");
			devDependencies.push("@types/morgan");
		}

		mkdirpSync(path.join(baseDirectory, "public"));

		mkdirpSync(path.join(baseDirectory, "router", "routes"));

		if (typescript === true) {
			fs.copyFileSync(path.join(kerplowDirectory, "dotfiles", "express", "ts", "config.ts"), path.join(baseDirectory, "config.ts"));
			fs.copyFileSync(path.join(kerplowDirectory, "dotfiles", "express", "ts", "server.ts"), path.join(baseDirectory, "server.ts"));

			fs.copyFileSync(path.join(kerplowDirectory, "dotfiles", "express", "ts", "router", "index.ts"), path.join(baseDirectory, "router", "index.ts"));
			fs.copyFileSync(path.join(kerplowDirectory, "dotfiles", "express", "ts", "router", "routes", "index.ts"), path.join(baseDirectory, "router", "routes", "index.ts"));
		} else {
			fs.copyFileSync(path.join(kerplowDirectory, "dotfiles", "express", "js", "config.js"), path.join(baseDirectory, "config.js"));
			fs.copyFileSync(path.join(kerplowDirectory, "dotfiles", "express", "js", "server.js"), path.join(baseDirectory, "server.js"));

			fs.copyFileSync(path.join(kerplowDirectory, "dotfiles", "express", "js", "router", "index.js"), path.join(baseDirectory, "router", "index.js"));
			fs.copyFileSync(path.join(kerplowDirectory, "dotfiles", "express", "js", "router", "routes", "index.js"), path.join(baseDirectory, "router", "routes", "index.js"));
		}

		console.log("> EJS");
		console.log("> ===");
		console.log(">");
		console.log(">     Embedded JavaScript templates.");
		console.log(">");
		console.log("> Pros:");
		console.log("> =====");
		console.log(">     - De facto standard Node.js templating.");
		console.log(">");
		console.log("> Cons:");
		console.log("> =====");
		console.log(">     - None");
		console.log();

		let ejs = await confirm("EJS? [Y/n] ");
		console.log();

		if (ejs === true) {
			dependencies.push("ejs");

			if (typescript === true) {
				devDependencies.push("@types/ejs");
			}

			mkdirpSync(path.join(baseDirectory, "public", "css"));
			fs.copyFileSync(path.join(kerplowDirectory, "dotfiles", "express", "public", "css", "style.css"), path.join(baseDirectory, "public", "css", "style.css"));

			mkdirpSync(path.join(baseDirectory, "public", "css", "lib"));
			fs.copyFileSync(path.join(kerplowDirectory, "dotfiles", "express", "public", "css", "lib", "baseline.css"), path.join(baseDirectory, "public", "css", "lib", "baseline.css"));

			mkdirpSync(path.join(baseDirectory, "public", "images"));
			fs.copyFileSync(path.join(kerplowDirectory, "dotfiles", "express", "public", "images", "pic01.jpg"), path.join(baseDirectory, "public", "images", "pic01.jpg"));
			fs.copyFileSync(path.join(kerplowDirectory, "dotfiles", "express", "public", "images", "pic02.jpg"), path.join(baseDirectory, "public", "images", "pic02.jpg"));

			mkdirpSync(path.join(baseDirectory, "public", "js"));
			fs.copyFileSync(path.join(kerplowDirectory, "dotfiles", "express", "public", "js", "main.js"), path.join(baseDirectory, "public", "js", "main.js"));

			mkdirpSync(path.join(baseDirectory, "router", "routes"));

			mkdirpSync(path.join(baseDirectory, "views"));

			mkdirpSync(path.join(baseDirectory, "views", "pages"));
			fs.copyFileSync(path.join(kerplowDirectory, "dotfiles", "express", "views", "pages", "index.ejs"), path.join(baseDirectory, "views", "pages", "index.ejs"));

			mkdirpSync(path.join(baseDirectory, "views", "partials"));
			fs.copyFileSync(path.join(kerplowDirectory, "dotfiles", "express", "views", "partials", "_header.ejs"), path.join(baseDirectory, "views", "partials", "_header.ejs"));
			fs.copyFileSync(path.join(kerplowDirectory, "dotfiles", "express", "views", "partials", "_footer.ejs"), path.join(baseDirectory, "views", "partials", "_footer.ejs"));
		}

		console.log("> Sass");
		console.log("> ====");
		console.log(">");
		console.log(">     Sass is a CSS pre-processor and CSS superset (SCSS) that makes writing CSS");
		console.log(">     easier.");
		console.log(">");
		console.log("> Pros:");
		console.log("> =====");
		console.log(">     - Nesting");
		console.log(">     - Variables");
		console.log(">     - Inheritance");
		console.log(">");
		console.log("> Cons:");
		console.log("> =====");
		console.log(">     - Adds a compilation step");
		console.log();

		let sass = await confirm("Sass? [Y/n] ");
		console.log();

		if (sass === true) {
			addKeyValuePairToJson5File(["scripts", "sassc"], "sass --watch public/css/style.scss:public/css/style.min.css --no-cache --sourcemap=none --style=compressed", path.join(baseDirectory, "package.json"));
		}

		console.log("> CSSComb");
		console.log("> =======");
		console.log(">");
		console.log(">     CSScomb is a coding style formatter for CSS.");
		console.log(">");
		console.log("> Pros:");
		console.log("> =====");
		console.log(">     - Keeps your (S)CSS uniform and consistent");
		console.log(">");
		console.log("> Cons:");
		console.log("> =====");
		console.log(">     - Might be a dead project?");
		console.log();

		let csscomb = await confirm("CSSComb? [Y/n] ");
		console.log();

		if (csscomb === true) {
			fs.copyFileSync(path.join(kerplowDirectory, "dotfiles", "express", "public", "css", ".csscomb.json"), path.join(baseDirectory, "public", "css", ".csscomb.json"));

			addKeyValuePairToJson5File(["scripts", "csscomb"], "csscomb --config public/css/.csscomb.json public/css/style.scss public/css/partials/*.scss", path.join(baseDirectory, "package.json"));
		}

		if (typescript === true) {
			addKeyValuePairToJson5File(["scripts", "start"], "cross-env TS_NODE_COMPILER_OPTIONS={\\\"target\\\":\\\"ES2015\\\"} nodemon --watch **/*.ts --exec ts-node server.ts", path.join(baseDirectory, "package.json"));
		} else {
			addKeyValuePairToJson5File(["scripts", "start"], "nodemon server.js", path.join(baseDirectory, "package.json"));
		}
	} else {
		if (typescript === true) {
			console.log("> Rollup");
			console.log("> ======");
			console.log(">");
			console.log(">     Rollup is a module bundler for JavaScript.");
			console.log(">");
			console.log("> Pros:");
			console.log("> =====");
			console.log(">     - Tree-shaking");
			console.log(">     - Plugin support");
			console.log(">     - Minimal configuration");
			console.log(">");
			console.log("> Cons:");
			console.log("> =====");
			console.log(">     - Adds a compilation step");
			console.log();

			let rollup = await confirm("Rollup? [Y/n] ");
			console.log();

			if (rollup === true) {
				devDependencies.push("rollup");
				devDependencies.push("rollup-plugin-typescript");
				devDependencies.push("tslib");

				fs.copyFileSync(path.join(kerplowDirectory, "dotfiles", "rollup.config.json"), path.join(baseDirectory, "rollup.config.json"));

				addKeyValuePairToJson5File(["scripts", "build"], "rollup --config --watch", path.join(baseDirectory, "package.json"));
			}

			console.log("> TypeDoc");
			console.log("> ======");
			console.log(">");
			console.log(">     A documentation generator for TypeScript projects.");
			console.log(">");
			console.log("> Pros:");
			console.log("> =====");
			console.log(">     - It \"just works\"");
			console.log(">");
			console.log("> Cons:");
			console.log("> =====");
			console.log(">     - None");
			console.log();

			let typedoc = await confirm("TypeDoc? [Y/n] ");
			console.log();

			if (typedoc === true) {
				dependencies.push("typedoc");

				addKeyValuePairToJson5File(["scripts", "typedoc"], "typedoc --mode file . --out docs --exclude **/node_modules/** --module ES2015 --moduleResolution Node", path.join(baseDirectory, "package.json"));
			}

			addKeyValuePairToJson5File(["scripts", "start"], "cross-env TS_NODE_COMPILER_OPTIONS={\\\"target\\\":\\\"ES2015\\\"} ts-node index.ts", path.join(baseDirectory, "package.json"));
		} else {
			addKeyValuePairToJson5File(["scripts", "start"], "node index.js", path.join(baseDirectory, "package.json"));
		}
	}

	readline.close();

	console.log("> npm install " + dependencies.join(" ") + "\n");
	execSync("npm install " + dependencies.join(" "), { "cwd": baseDirectory, "stdio": "inherit" });

	console.log("> npm install --save-dev " + dependencies.join(" ") + "\n");
	execSync("npm install --save-dev " + devDependencies.join(" "), { "cwd": baseDirectory, "stdio": "inherit" });

	console.log("> npm remove kerplow\n");

	deleteKeyFromJson5File(["dependencies", "kerplow"], path.join(baseDirectory, "package.json"));
	deleteKeyFromJson5File(["dependencies", "kerplow"], path.join(baseDirectory, "package-lock.json"));

	try {
		execSync("npm remove kerplow", { "cwd": baseDirectory, "stdio": "inherit" });
	} catch {}

	console.log("kerplow will now self-destruct.");
	await sleep(1250);
	console.log("You will see an error message.");
	await sleep(1250);
	console.log("Please disregard.");
	await sleep(1250);

	console.log();
	console.log("KERPLOW!");
	console.log();

	process.exitCode = 1;
})();
