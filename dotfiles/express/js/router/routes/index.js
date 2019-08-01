const { config } = require("../../config");

function index(app) {
	app.get("/", function(request, response) {
		response.render("pages/index");
	});
}

module.exports = { index };
