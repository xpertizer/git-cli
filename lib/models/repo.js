"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Repo = void 0;
class Repo {
    constructor(...args) {
        this.login = undefined;
        this.name = undefined;
        if (args[0]) {
            this.login = args[0];
            this.name = args[1];
            this.languages = args[2];
        }
    }
}
exports.Repo = Repo;
exports.default = Repo;
//# sourceMappingURL=repo.js.map