"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GitLanguagesRepository = exports.GitReposRepository = exports.GitUsersRepository = void 0;
const gitusers_1 = require("./gitusers");
Object.defineProperty(exports, "GitUsersRepository", { enumerable: true, get: function () { return gitusers_1.GitUsersRepository; } });
const gitrepos_1 = require("./gitrepos");
Object.defineProperty(exports, "GitReposRepository", { enumerable: true, get: function () { return gitrepos_1.GitReposRepository; } });
const gitlanguages_1 = require("./gitlanguages");
Object.defineProperty(exports, "GitLanguagesRepository", { enumerable: true, get: function () { return gitlanguages_1.GitLanguagesRepository; } });
