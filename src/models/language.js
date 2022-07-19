"use strict";
/**
 *        @file language.ts
 *
 * @description Defines the structure for language model
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Language = void 0;
/**
 * Language class
 *
 * This class contains information about the git user repository language
 *
 * @class Language
 */
class Language {
    constructor(_login, _repoName, _knownLanguage) {
        this.login = undefined;
        this.repoName = undefined;
        this.login = _login;
        this.repoName = _repoName;
        this.knownLanguage = _knownLanguage;
    }
}
exports.Language = Language;
/**
 *
 */
exports.default = Language;
