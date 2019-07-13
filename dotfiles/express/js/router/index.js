const { app } = require("../server");

const { index } = require("./routes/index");

function router() {
	index();
}

module.exports = { router };
