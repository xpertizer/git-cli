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
class UserFactory {
    /**
     *
     */
    constructor(gitUser) {
        this._gitUserRepos = [];
        this._repoCliLanguages = [];
        this._gs = new gitServices_1.default();
        this._loginUser = gitUser;
    }
    getProfile() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this._gs.getProfile(this._loginUser).then((resp) => {
                this._jsonUsuario = resp;
                // console.log(`\n getProfile then: ${JSON.stringify(resp)}\n`);
            });
            // console.log(`\n _jsonUsuario : ${JSON.stringify(this._jsonUsuario)}\n`)
            yield this.getRepos();
        });
    }
    getRepos() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this._gs.getRepo(this._jsonUsuario.repos_url).then((resp) => {
                this._jsonRepositorio = resp;
                // console.log(`\n getProfile then: ${JSON.stringify(resp)}\n`);
            });
            // console.log(`\n _jsonRepositorio : ${JSON.stringify(this._jsonRepositorio)}\n`)
        });
    }
    createRepos() {
        return __awaiter(this, void 0, void 0, function* () {
            // console.log(`\ncreateRepos\n`)
            // if (this._jsonUsuario.repos_url) {
            // }
            this._jsonRepositorio = yield this._gs.getRepo(this._jsonUsuario.repos_url);
            this._jsonUsuario.keys.forEach((key) => {
                console.log(`\nkey:${key}`);
            });
            // for(var i = 0; i < this._jsonRepositorio.length; i++)
            // {
            //     // console.log(`Nome: ${jsonRepositorio[i].name}`);
            //     // console.log(`languages_url: ${jsonRepositorio[i].languages_url}`);
            //     if (_jsonRepositorio[i].languages_url) {
            //         const jsonLanguages:Object = await this._gs.getLanguages(jsonRepositorio[i].languages_url,UserRepoLanguageResponse);
            //         console.log(`\nresponse languages:\n ${JSON.stringify(jsonLanguages)}`)
            //     // jsonLanguages.forEach(e => {
            //     //         this._repoCliLanguages.push(new Language( this._loginUser,jsonRepositorio[i].name,e))
            //     //         //.log(`language added: ${e}\n`);
            //     //    });
            //     }
            //        // console.log(`_repoCliLanguages: ${JSON.stringify(this._jsonUsuario._repoCliLanguages)}\n`);
            //         let _repo = new Repo(jsonRepositorio[i].name,
            //                         jsonRepositorio[i].login,
            //                         this._repoCliLanguages);
            //         this._gitUserRepos.push(_repo);
            //         console.log(`repo added: ${JSON.stringify(_repo)}\n`);
            //         // for (let i = 0; i < jsonLanguages.length; i++) {
            //             //     console.log(`languagel: ${jsonLanguages[i]}`);
            //     //    // const element = jsonLanguages[i][0];
            //     // }
            //     // var tablename = _p[i].name;
            // }
        });
    }
    createUser() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            // console.log(`\ncriarUsuario\n`)
            // console.log(`\nrepos_url: ${this._jsonUsuario.repos_url}\n`)
            const jsonRepositorio = yield this._gs.getRepo(this._jsonUsuario.repos_url);
            for (let i = 0; i < jsonRepositorio.length; i++) {
                // console.log(`Nome: ${jsonRepositorio[i].name}\n`);
                // console.log(`languages_url: ${jsonRepositorio[i].languages_url}\n`);
                const jsonLanguages = yield this._gs.getLanguages(jsonRepositorio[i].languages_url);
                const _repos = JSON.parse(JSON.stringify(jsonLanguages));
                // console.log('===================LANGUAGE================');
                Object.keys(_repos).forEach((r) => {
                    // console.log(JSON.stringify(r))
                    this._repoCliLanguages.push(new language_1.default(this._loginUser, jsonRepositorio[i].name, r));
                });
                // console.log(`_repoCliLanguages: ${JSON.stringify(this._repoCliLanguages)}\n`);
                const _repoCli = new repo_1.default(jsonRepositorio[i].name, jsonRepositorio[i].login, this._repoCliLanguages);
                // console.log(`\nrepo: ${JSON.stringify(_repoCli)}\n`);
                (_a = this._gitUserRepos) === null || _a === void 0 ? void 0 : _a.push(_repoCli);
                // for (let i = 0; i < jsonLanguages.length; i++) {
                //     console.log(`languagel: ${jsonLanguages[i]}`);
                //    // const element = jsonLanguages[i][0];
                // }
                // var tablename = _p[i].name;
            }
            //console.log(`jsonUsuario: ${jsonUsuario}\n repos: ${this._gitUserRepos}`)
            //return new User(jsonUsuario,this._gitUserRepos)
            //console.log(Object.keys(jsonRepositorio));
            this._gitUser = new user_1.default(this._jsonUsuario.login, this._jsonUsuario.name, this._jsonUsuario.location, this._jsonUsuario.bio, this._jsonUsuario.avatar_url, this._jsonUsuario.repos_url, this._gitUserRepos);
            return this._gitUser;
        });
    }
}
exports.default = UserFactory;
