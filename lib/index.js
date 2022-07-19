#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
const clear_1 = __importDefault(require("clear"));
const figlet_1 = __importDefault(require("figlet"));
const commander_1 = require("commander");
const fetchuser_1 = __importDefault(require("./commands/fetchuser"));
const listuser_1 = __importDefault(require("./commands/listuser"));
(0, clear_1.default)();
console.log(chalk_1.default.greenBright(figlet_1.default.textSync('git-cli', { horizontalLayout: 'full' })));
commander_1.program
    .version('0.0.1')
    .description("Cli app to fetch e query programming languages and locations")
    .parse(process.argv);
commander_1.program
    .command("fetchUser <user>")
    .description("Fetch data from a git user to database")
    .action(fetchuser_1.default);
commander_1.program
    .command("listUser <location>")
    .description("List all users in a specifica location")
    .action(listuser_1.default);
commander_1.program.parse();
//# sourceMappingURL=index.js.map