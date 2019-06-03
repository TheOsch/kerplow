"use strict";

import { config } from "../../config";
import { app } from "../../server";

export function index() {
	app.get("/", function(request, response) {
		response.render("pages/index");
	});
}
