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
                const { data, status } = yield axios_1.default.get(this.url, {
                    headers: {
                        Accept: 'application/json',
                        Authorization: `token ${this.token}`,
                    },
                });
                console.log('response status is: ', status);
                return data;
            }
            catch (error) {
                if (axios_1.default.isAxiosError(error)) {
                    console.log('error message: ', error.message);
                    console.log(`\nRequest ${returnType}===============INICIO=============================\n`);
                    console.log(`\nURL :${this.url}\n`);
                    console.log(`\nRequest ${returnType}===============FIM================================\n`);
                    return error.message;
                }
                else {
                    console.log('unexpected error: ', error);
                    console.log(`\nRequest ${returnType}===============INICIO=============================\n`);
                    console.log(`\nURL :${this.url}\n`);
                    console.log(`\nRequest ${returnType}===============FIM================================\n`);
                    return 'An unexpected error occurred';
                }
            }
        });
    }
    getProfile(gitUser) {
        return __awaiter(this, void 0, void 0, function* () {
            this.url = this.urlUsers + gitUser;
            const _up = yield this.get(userprofileresponse_1.default);
            console.log(`\n _up ${JSON.stringify(_up)}===============getProfile================================\n`);
            console.log(`\n\n\n\n\n _up ${JSON.stringify(_up)}\n\n\n\n===============getProfile================================\n`);
            return _up;
        });
    }
    getRepo(gitUserRepoURL) {
        return __awaiter(this, void 0, void 0, function* () {
            this.url = gitUserRepoURL;
            console.log(`\n gitUserRepoURL ${gitUserRepoURL}===============getRepo================================\n`);
            console.log(`\n url ${this.url}===============getRepo================================\n`);
            const _uprepo = yield this.get(userreporesponse_1.default);
            return _uprepo;
        });
    }
    getLanguages(gitUserRepoLanguagesURL) {
        return __awaiter(this, void 0, void 0, function* () {
            this.url = gitUserRepoLanguagesURL;
            return yield this.get(userrepolanguageresponse_1.default);
        });
    }
}
exports.default = GitServices;
//# sourceMappingURL=gitServices.js.map