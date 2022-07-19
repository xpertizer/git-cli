"use strict";
/**
 *        @file user.ts
 *  @repository 000-a-3100_api_boilerplate
 * @application 000-a-3100_api_boilerplate
 *     @summary Repos Class
 * @description Defines the structure for user model
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Repo = void 0;
/**
 * Repos class
 *
 * This class contains information about the git user repository
 *
 * @class Repos
 */
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
