"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const gitServices_1 = __importDefault(require("../services/gitServices"));
const language_1 = __importDefault(require("../models/language"));
const user_1 = __importDefault(require("../models/user"));
const repo_1 = __importDefault(require("../models/repo"));
class UserFactory {
    constructor(gitUser) {
        this._gitUserRepos = [];
        this._repoCliLanguages = [];
        this._gs = new gitServices_1.default();
        this._loginUser = gitUser;
    }
    async getProfile() {
        await this._gs.getProfile(this._loginUser).then(resp => {
            this._jsonUsuario = resp;
        });
        await this.getRepos();
    }
    async getRepos() {
        await this._gs.getRepo(this._jsonUsuario.repos_url).then(resp => {
            this._jsonRepositorio = resp;
        });
    }
    async createRepos() {
        if (this._jsonUsuario.repos_url) {
        }
        this._jsonRepositorio = await this._gs.getRepo(this._jsonUsuario.repos_url);
        this._jsonUsuario.keys.forEach((key) => {
            console.log(`\nkey:${key}`);
        });
    }
    async createUser() {
        var _a;
        const jsonRepositorio = await this._gs.getRepo(this._jsonUsuario.repos_url);
        for (var i = 0; i < jsonRepositorio.length; i++) {
            const jsonLanguages = await this._gs.getLanguages(jsonRepositorio[i].languages_url);
            const _repos = JSON.parse(JSON.stringify(jsonLanguages));
            Object.keys(_repos).forEach((r) => {
                this._repoCliLanguages.push(new language_1.default(this._loginUser, jsonRepositorio[i].name, r));
            });
            let _repoCli = new repo_1.default(jsonRepositorio[i].name, jsonRepositorio[i].login, this._repoCliLanguages);
            (_a = this._gitUserRepos) === null || _a === void 0 ? void 0 : _a.push(_repoCli);
        }
        this._gitUser = new user_1.default(this._jsonUsuario.login, this._jsonUsuario.name, this._jsonUsuario.location, this._jsonUsuario.bio, this._jsonUsuario.avatar_url, this._jsonUsuario.repos_url, this._gitUserRepos);
        return this._gitUser;
    }
}
exports.default = UserFactory;
//# sourceMappingURL=userfactory.js.map