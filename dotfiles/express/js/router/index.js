const { app } = require("../server");

const { index } = require("./routes/index");

function router(app) {
	index(app);
}

module.exports = { router };
