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
exports.GitLanguagesRepository = void 0;
const sql_1 = require("../sql");
class GitLanguagesRepository {
    constructor(db, pgp) {
        this.db = db;
        this.pgp = pgp;
    }
    create() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.db.none(sql_1.gitlanguages.create);
        });
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.db.map(sql_1.gitlanguages.init, [], (row) => row.id);
        });
    }
    drop() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.db.none(sql_1.gitlanguages.drop);
        });
    }
    empty() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.db.none(sql_1.gitlanguages.empty);
        });
    }
    add(name) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.db.one(sql_1.gitlanguages.add, name);
        });
    }
    remove(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.db.result('DELETE FROM gitlanguages WHERE id = $1', +id, (r) => r.rowCount);
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.db.oneOrNone('SELECT * FROM gitlanguages WHERE id = $1', +id);
        });
    }
    findByName(name) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.db.oneOrNone('SELECT * FROM gitlanguages WHERE name = $1', name);
        });
    }
    all() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.db.any('SELECT * FROM gitlanguages');
        });
    }
    total() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.db.one('SELECT count(*) FROM gitlanguages', [], (a) => +a.count);
        });
    }
}
exports.GitLanguagesRepository = GitLanguagesRepository;
//# sourceMappingURL=gitlanguages.js.map