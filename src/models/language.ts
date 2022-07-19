/**
 *        @file language.ts
 *
 * @description Defines the structure for language model
 */

import { NullableString } from '../typings/types';

/**
 * Language class
 *
 * This class contains information about the git user repository language
 *
 * @class Language
 */

export class Language {
  public login: NullableString = undefined;
  public repoName: NullableString = undefined;
  public knownLanguage: string | undefined;

  constructor(_login: string, _repoName: string, _knownLanguage: string) {
    this.login = _login;
    this.repoName = _repoName;
    this.knownLanguage = _knownLanguage;
  }
}
/**
 *
 */
export default Language;
