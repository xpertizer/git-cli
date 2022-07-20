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
Object.defineProperty(exports, "__esModule", { value: true });
exports.GitUsersRepository = void 0;
const sql_1 = require("../sql");
class GitUsersRepository {
    constructor(db, pgp) {
        this.db = db;
        this.pgp = pgp;
    }
    create() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.db.none(sql_1.gitusers.create);
        });
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.db.map(sql_1.gitusers.init, [], (row) => row.id);
        });
    }
    drop() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.db.none(sql_1.gitusers.drop);
        });
    }
    empty() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.db.none(sql_1.gitusers.empty);
        });
    }
    add(_user) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.db.one(sql_1.gitusers.add, [
                _user.login,
                _user.location,
                _user.name,
                _user.bio,
                _user.avatar_url,
                _user.company,
            ]);
        });
    }
    remove(login) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.db.result('DELETE FROM gitusers WHERE login = $1', +login, (r) => r.rowCount);
        });
    }
    find(_user) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.findByLogin(_user);
        });
    }
    findByLogin(_user) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.db.oneOrNone('SELECT * FROM gitusers WHERE login = $1', _user.login);
        });
    }
    findByLocation(location) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.db.oneOrNone('SELECT * FROM gitusers WHERE location = $1', location);
        });
    }
    findBylanguages(languages) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.db.oneOrNone('SELECT * FROM gitusers u JOIN gitlanguages l ON u.login = l.login WHERE language IN ($1)', languages);
        });
    }
    all() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.db.any('SELECT * FROM gitusers');
        });
    }
    total() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.db.one('SELECT count(*) FROM gitusers', [], (a) => +a.count);
        });
    }
}
exports.GitUsersRepository = GitUsersRepository;
