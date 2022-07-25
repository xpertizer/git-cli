"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.gitlanguages = exports.gitrepos = exports.gitusers = void 0;
const pg_promise_1 = require("pg-promise");
const path_1 = require("path");
exports.gitusers = {
    create: sql('gitusers/create.sql'),
    empty: sql('gitusers/empty.sql'),
    init: sql('gitusers/init.sql'),
    drop: sql('gitusers/drop.sql'),
    add: sql('gitusers/add.sql'),
};
exports.gitrepos = {
    create: sql('gitrepos/create.sql'),
    empty: sql('gitrepos/empty.sql'),
    init: sql('gitrepos/init.sql'),
    drop: sql('gitrepos/drop.sql'),
    add: sql('gitrepos/add.sql'),
};
exports.gitlanguages = {
    create: sql('gitlanguages/create.sql'),
    empty: sql('gitlanguages/empty.sql'),
    init: sql('gitlanguages/init.sql'),
    drop: sql('gitlanguages/drop.sql'),
    add: sql('gitlanguages/add.sql'),
};
function sql(file) {
    const fullPath = (0, path_1.join)(__dirname, file);
    const options = {
        minify: true,
    };
    const qf = new pg_promise_1.QueryFile(fullPath, options);
    if (qf.error) {
        console.error(qf.error);
    }
    return qf;
}
