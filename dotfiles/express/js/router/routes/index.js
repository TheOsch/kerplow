const { config } = require("../../config");
const { app } = require("../../server");

function index() {
	app.get("/", function(request, response) {
		response.render("pages/index");
	});
}

module.exports = { index };
