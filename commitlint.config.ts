"use strict";
declare interface Config {
	extends?: string[];
}
const config: Config = {
	extends: ["@commitlint/config-conventional"],
};

export default module.exports = config;
