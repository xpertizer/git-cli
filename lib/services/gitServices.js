"use strict";
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
        this.urlUsers = "http://api.github.com/users/";
        this.token = "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";
        this.url = "";
        this.gitUser = "";
    }
    async get(returnType) {
        try {
            const { data, status } = await axios_1.default.get(this.url, {
                headers: {
                    Accept: 'application/json',
                    'Authorization': `token ${this.token}`
                },
            });
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
    }
    async getProfile(gitUser) {
        this.url = this.urlUsers + gitUser;
        return await this.get(userprofileresponse_1.default);
    }
    async getRepo(gitUserRepoURL) {
        this.url = gitUserRepoURL;
        return await this.get(userreporesponse_1.default);
    }
    async getLanguages(gitUserRepoLanguagesURL) {
        this.url = gitUserRepoLanguagesURL;
        return await this.get(userrepolanguageresponse_1.default);
    }
}
exports.default = GitServices;
//# sourceMappingURL=gitServices.js.map