"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pgp = exports.db = void 0;
const promise = __importStar(require("bluebird")); // best promise library today
const dbConfig = __importStar(require("../db-config.json")); // db connection details
const pg_promise_1 = __importDefault(require("pg-promise")); // pg-promise core library
const diagnostics_1 = require("./diagnostics"); // optional diagnostics
const repos_1 = require("./repos");
// pg-promise initialization options:
const initOptions = {
    // Using a custom promise library, instead of the default ES6 Promise:
    promiseLib: promise,
    // Extending the database protocol with our custom repositories;
    // API: http://vitaly-t.github.io/pg-promise/global.html#event:extend
    extend(obj, dc) {
        // Database Context (dc) is mainly needed for extending multiple databases with different access API.
        // Do not use 'require()' here, because this event occurs for every task and transaction being executed,
        // which should be as fast as possible.
        obj.gitusers = new repos_1.GitUsersRepository(obj, pgp);
        obj.gitrepos = new repos_1.GitReposRepository(obj, pgp);
        obj.gitlanguages = new repos_1.GitLanguagesRepository(obj, pgp);
    },
};
// Initializing the library:
const pgp = (0, pg_promise_1.default)(initOptions);
exports.pgp = pgp;
// Creating the database instance with extensions:
const db = pgp(dbConfig);
exports.db = db;
// Initializing optional diagnostics:
diagnostics_1.Diagnostics.init(initOptions);
