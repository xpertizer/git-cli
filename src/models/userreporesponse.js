"use strict";
/**
 *        @file user.ts
 *  @repository 000-a-3100_api_boilerplate
 * @application 000-a-3100_api_boilerplate
 *     @summary Repos Class
 * @description Defines the structure for user model
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepoResponse = void 0;
/**
 * Repos class
 *
 * This class contains information about the git user repository
 *
 * @class Repos
 */
class UserRepoResponse {
    constructor() {
        this.login = undefined;
        this.name = undefined;
    }
}
exports.UserRepoResponse = UserRepoResponse;
exports.default = UserRepoResponse;
