"use strict";

import { app } from "../server";

import { index } from "./routes/index";

export function router() {
	index();
}
