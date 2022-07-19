"use strict";
/* eslint-disable camelcase */
/**
 *        @file user.ts
 *  @repository 000-a-3100_api_boilerplate
 * @application 000-a-3100_api_boilerplate
 *     @summary User Class
 * @description Defines the structure for user model
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserObject = void 0;
/**
 * User class
 *
 * This class contains information about the git user and
 *
 * @class UserObject
 */
class UserObject {
    constructor(login, name, location, bio, avatar_url, repos_url, _repos) {
        this.login = undefined;
        this.name = undefined;
        this.location = undefined;
        this.bio = undefined;
        this.avatar_url = undefined;
        this.company = undefined;
        this.repos_url = undefined;
        this.login = login;
        this.name = name;
        this.location = location;
        this.bio = bio;
        this.avatar_url = avatar_url;
        this.repos_url = repos_url;
        this.repos = _repos;
    }
}
exports.UserObject = UserObject;
exports.default = UserObject;
