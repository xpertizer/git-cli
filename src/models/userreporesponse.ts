/**
 *        @file UserRepoResponse.ts
 *     @summary UserRepoResponse Class
 * @description Defines the structure for UserRepoResponse model
 */

import { NullableString } from '../typings/types';

/**
 * Repos class
 *
 * This class contains information about the git user repository
 *
 * @class Repos
 */

export default class UserRepoResponse extends Object {
  public login: NullableString = undefined;

  public repositoryname: NullableString = undefined;

  public languages_url: NullableString = undefined;

  constructor(login?: string, repositoryname?: string, lang_url?: string) {
    super();
    this.login = login;

    this.repositoryname = repositoryname;

    this.languages_url = lang_url;
  }
}
