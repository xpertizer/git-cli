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
const promise = __importStar(require("bluebird"));
const dbConfig = __importStar(require("../db-config.json"));
const pg_promise_1 = __importDefault(require("pg-promise"));
const diagnostics_1 = require("./diagnostics");
const repos_1 = require("./repos");
const initOptions = {
    promiseLib: promise,
    extend(obj, dc) {
        obj.gitusers = new repos_1.GitUsersRepository(obj, pgp);
        obj.gitrepos = new repos_1.GitReposRepository(obj, pgp);
        obj.gitlanguages = new repos_1.GitLanguagesRepository(obj, pgp);
    },
};
const pgp = (0, pg_promise_1.default)(initOptions);
exports.pgp = pgp;
const db = pgp(dbConfig);
exports.db = db;
diagnostics_1.Diagnostics.init(initOptions);
