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
const axios_1 = __importDefault(require("axios"));
const userprofileresponse_1 = __importDefault(require("../models/userprofileresponse"));
const userrepolanguageresponse_1 = __importDefault(require("../models/userrepolanguageresponse"));
const userreporesponse_1 = __importDefault(require("../models/userreporesponse"));
class GitServices {
    constructor() {
        this.urlUsers = 'http://api.github.com/users/';
        this.token = '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';
        this.url = '';
        this.gitUser = '';
    }
    get(returnType) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // 👇️ const data: GetUsersResponse
                const { data, status } = yield axios_1.default.get(this.url, {
                    headers: {
                        Accept: 'application/json',
                        Authorization: `token ${this.token}`,
                    },
                });
                //curl -i -u your_username https://api.github.com/users/octocat
                //   console.log(`\nGet axios response\nresponse.data\n`)
                // console.log(JSON.stringify(data, null, 4));
                // 👇️ "response status is: 200"
                console.log('response status is: ', status);
                return data;
            }
            catch (error) {
                if (axios_1.default.isAxiosError(error)) {
                    console.log('error message: ', error.message);
                    return error.message;
                }
                else {
                    console.log('unexpected error: ', error);
                    return 'An unexpected error occurred';
                }
            }
        });
    }
    getProfile(gitUser) {
        return __awaiter(this, void 0, void 0, function* () {
            this.url = this.urlUsers + gitUser;
            // console.log(`getProfile gitUser: ${gitUser} request to url: ${this.url}\n` )
            return yield this.get(userprofileresponse_1.default);
        });
    }
    getRepo(gitUserRepoURL) {
        return __awaiter(this, void 0, void 0, function* () {
            this.url = gitUserRepoURL;
            // console.log(`getRepo request to url: ${this.url}\n` )
            return yield this.get(userreporesponse_1.default);
        });
    }
    getLanguages(gitUserRepoLanguagesURL) {
        return __awaiter(this, void 0, void 0, function* () {
            this.url = gitUserRepoLanguagesURL;
            // console.log(`getLanguages request to url: ${this.url}\n` )
            return yield this.get(userrepolanguageresponse_1.default);
        });
    }
}
exports.default = GitServices;
