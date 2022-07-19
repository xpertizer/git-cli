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
/*
 This repository mixes hard-coded and dynamic SQL, just to show how to use both.
*/
class GitUsersRepository {
    /**
     * @param db
     * Automated database connection context/interface.
     *
     * If you ever need to access other repositories from this one,
     * you will have to replace type 'IDatabase<any>' with 'any'.
     *
     * @param pgp
     * Library's root, if ever needed, like to access 'helpers'
     * or other namespaces available from the root.
     */
    constructor(db, pgp) {
        this.db = db;
        this.pgp = pgp;
        /*
              If your repository needs to use helpers like ColumnSet,
              you should create it conditionally, inside the constructor,
              i.e. only once, as a singleton.
            */
    }
    // Creates the table;
    create() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.db.none(sql_1.gitusers.create);
        });
    }
    // Initializes the table with some user records, and return their id-s;
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.db.map(sql_1.gitusers.init, [], (row) => row.id);
        });
    }
    // Drops the table;
    drop() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.db.none(sql_1.gitusers.drop);
        });
    }
    // Removes all records from the table;
    empty() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.db.none(sql_1.gitusers.empty);
        });
    }
    // Adds a new user, and returns the new object;
    add(name) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.db.one(sql_1.gitusers.add, name);
        });
    }
    // Tries to delete a user by id, and returns the number of records deleted;
    remove(login) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.db.result('DELETE FROM gitusers WHERE login = $1', +login, (r) => r.rowCount);
        });
    }
    // Tries to find a user from id;
    findByLogin(login) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.db.oneOrNone('SELECT * FROM gitusers WHERE login = $1', +login);
        });
    }
    // Tries to find a user from name;
    findByLocation(location) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.db.oneOrNone('SELECT * FROM gitusers WHERE location = $1', location);
        });
    }
    // Returns all user records;
    all() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.db.any('SELECT * FROM gitusers');
        });
    }
    // Returns the total number of users;
    total() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.db.one('SELECT count(*) FROM gitusers', [], (a) => +a.count);
        });
    }
}
exports.GitUsersRepository = GitUsersRepository;
