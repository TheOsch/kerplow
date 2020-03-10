/* eslint-disable @typescript-eslint/no-require-imports, @typescript-eslint/no-var-requires */
const convict = require("convict");

function objectify(options) {
	const config = {};

	(function recurse(options, namespace = []) {
		for (const option of options) {
			if (Object.keys(option).length === 1) {
				recurse(option[Object.keys(option)[0]], [...namespace, ...Object.keys(option)]);
			} else {
				if (option["name"] === undefined) {
					throw new Error("`option[\"name\"]` is required.");
				} else if (option["format"] === undefined) {
					throw new Error("`" + option["name"] + "[\"format\"]` is required.");
				}

				const name = [...namespace, ...option["name"].split(/(?=[A-Z])/)].reduce(function(previous, current) {
					return previous + current[0].toUpperCase() + current.substring(1);
				});

				config[name] = {
					"format": option["format"],
					"default": option["default"],
					"env": option["env"] || [...namespace, ...option["name"].split(/(?=[A-Z])/)].join("_").toUpperCase(),
					"arg": option["arg"] || [...namespace, ...option["name"].split(/(?=[A-Z])/)].join("-").toLowerCase()
				};
			}
		}
	})(options);

	return config;
}

const options = [];

options.push({
	"name": "env",
	"format": ["production", "development", "test"],
	"default": "development",
	"env": "NODE_ENV"
});

options.push({
	"name": "port",
	"format": "port",
	"default": 8080
});

// Example namespaced configuration:
//options.push({
//	"mysql": [
//		{
//			"name": "username",
//			"format": "String",
//			"default": "AzureDiamond"
//		},
//		{
//			"name": "password",
//			"format": "String",
//			"default": "hunter2"
//		}
//	]
//});

const config = convict(objectify(options));

// Perform validation
config.validate({ "allowed": "strict" });

module.exports = { config };
