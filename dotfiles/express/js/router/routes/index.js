"use strict";

let { config } = require("../../config");
let { app } = require("../../server");

function index() {
	app.get("/", function(request, response) {
		response.render("pages/index");
	});
}

module.exports = { index };
