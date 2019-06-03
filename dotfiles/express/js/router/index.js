"use strict";

let { app } = require("../server");

let { index } = require("./routes/index");

function router() {
	index();
}

module.exports = { router };
