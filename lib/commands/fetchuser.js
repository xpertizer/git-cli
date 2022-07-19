"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userfactory_1 = __importDefault(require("../factory/userfactory"));
async function fetchuser(gitUser) {
    const _uf = new userfactory_1.default(gitUser);
    await _uf.getProfile();
    console.log(await _uf.createUser());
}
exports.default = fetchuser;
module.exports = fetchuser;
//# sourceMappingURL=fetchuser.js.map