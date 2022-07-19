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
const userfactory_1 = __importDefault(require("../factory/userfactory"));
function fetchuser(gitUser) {
    return __awaiter(this, void 0, void 0, function* () {
        //console.log(JSON.stringify(_gitUser, null, 4));
        // console.log(`Creating UserFactory instance gitUser: ${gitUser}`)
        const _uf = new userfactory_1.default(gitUser);
        // console.log(`\n _gitUser antes: ${_uf._gitUser}\n`)
        // console.log(`\n _jsonUsuario antes: ${JSON.stringify(_uf._jsonUsuario)}\n`)
        yield _uf.getProfile();
        console.log(yield _uf.createUser());
        // console.log(`\n _gitUser depois: ${_uf._gitUser}\n`)
        // console.log(`\n _jsonUsuario depois: ${JSON.stringify(_uf._jsonUsuario)}\n`)
        //console.log(JSON.stringify(_user));
    });
}
exports.default = fetchuser;
module.exports = fetchuser;
