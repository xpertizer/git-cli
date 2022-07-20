"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const gitServices_1 = __importDefault(require("../services/gitServices"));
const language_1 = __importDefault(require("../models/language"));
const user_1 = __importDefault(require("../models/user"));
const repo_1 = __importDefault(require("../models/repo"));
const userprofileresponse_1 = __importDefault(require("../models/userprofileresponse"));
class UserFactory {
    constructor(gitUser) {
        this._gitUserRepos = [];
        this._repoCliLanguages = [];
        this._gs = new gitServices_1.default();
        this._jsonUsuario = new userprofileresponse_1.default();
        this._loginUser = gitUser;
    }
    fetchUserData() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(`\n _loginUser ${this._loginUser}===============fetchUserData================================\n`);
            this._jsonUsuario = yield this._gs.getProfile(this._loginUser);
            console.log(`\n\n\n\n******\n t ${this._jsonUsuario}\n\n==type ${typeof this
                ._jsonUsuario}=============fetchUserData===================t=============\n`);
            console.log(`\n\n\n\n******\n t \n ${JSON.stringify(this._jsonUsuario)}\n\n==type ${typeof this
                ._jsonUsuario}=============fetchUserData===================t=============\n`);
        });
    }
    createUser() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.fetchUserData();
            console.log(`\n _jsonUsuario ${this._jsonUsuario}===============createUser========_jsonUsuario========================\n`);
            console.log(`\n\n\n\n\n\n _jsonUsuario ${JSON.stringify(this._jsonUsuario)}\n\n\n\n===============createUser========_jsonUsuario========================\n`);
            const jsonRepositorio = yield this._gs.getRepo(this._jsonUsuario.repos_url);
            console.log(`\n jsonRepositorio ${jsonRepositorio}===============createUser=======jsonRepositorio=========================\n`);
            yield jsonRepositorio.forEach((repoJson) => __awaiter(this, void 0, void 0, function* () {
                console.log(`\n\n\n repoJson\n\nConteudo:\n\n\n ${JSON.stringify(repoJson)}\n\n\n\n===============createUser=======repoJson=========================\n`);
                const jsonLanguages = yield this._gs.getLanguages(repoJson.languages_url);
                console.log(`\n\n\n jsonLanguages\n\nConteudo:\n\n\n ${JSON.stringify(jsonLanguages)}\n\n\n\n===============createUser=======jsonLanguages=========================\n`);
                JSON.stringify(jsonLanguages)
                    .split(',')
                    .forEach((e) => {
                    console.log(`\n\n\n e\n\nConteudo:\n\n\n ${e}\n\n\n\n===============createUser=======jsonLanguages========e=================\n`);
                    const _lang = e.split(':')[0].replaceAll('"', '');
                    console.log(`\n\n\n _lang\n\nConteudo:\n\n\n ${_lang}\n\n\n\n===============createUser=======jsonLanguages========_lang=================\n`);
                    this._repoCliLanguages.push(new language_1.default(this._loginUser, repoJson.name, _lang));
                });
                this._gitUserRepos.push(new repo_1.default(repoJson.name, repoJson.login, this._repoCliLanguages));
                console.log(`\n _repoCli ${JSON.stringify(this._gitUserRepos)}===============createUser===========_gitUserRepos=====================\n`);
            }));
            this._gitUser = new user_1.default(this._jsonUsuario.login, this._jsonUsuario.name, this._jsonUsuario.location, this._jsonUsuario.bio, this._jsonUsuario.avatar_url, this._jsonUsuario.repos_url, this._gitUserRepos);
            console.log(`\n\n\n _gitUser\n\nConteudo:\n\n\n ${JSON.stringify(this._gitUser)}\n\n\n\n===============createUser=======jsonLanguages========_lang=================\n`);
            return this._gitUser;
        });
    }
}
exports.default = UserFactory;
//# sourceMappingURL=userfactory.js.map