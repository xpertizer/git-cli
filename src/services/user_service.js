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
exports.UserService = void 0;
const user_1 = __importDefault(require("../models/user"));
const userfactory_1 = __importDefault(require("../factory/userfactory"));
const db_1 = require("../../db");
class UserService {
    constructor() {
        this._gitusers = new user_1.default();
    }
    FetchClienteAddToDatabase(userLogin) {
        return __awaiter(this, void 0, void 0, function* () {
            this._uf = new userfactory_1.default(userLogin);
            yield this._uf.createUser().then((resp) => {
                this._gitusers = resp;
            });
            console.log(`\n_gitusers ${this._gitusers}===============FetchClienteAddToDatabase================================\n`);
            return yield db_1.db.task('add-git-user', (t) => __awaiter(this, void 0, void 0, function* () {
                const gituser = yield t.gitusers.find(this._gitusers);
                return gituser || (yield t.gitusers.add(this._gitusers));
            }));
        });
    }
    getFilteredUserInLocation(users, userLocation) {
        return __awaiter(this, void 0, void 0, function* () {
            return users.filter((user) => user.location === userLocation);
        });
    }
}
exports.UserService = UserService;
exports.default = UserService;
