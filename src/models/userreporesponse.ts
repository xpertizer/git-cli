/**
 *        @file UserRepoResponse.ts
 *     @summary UserRepoResponse Class
 * @description Defines the structure for UserRepoResponse model
 */

import { NullableString } from '../typings/types';
import Language from './language';
import Repo from './repo';

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

  public languages: Language[] | undefined;

  constructor(login: string, repositoryname: string, languages: Language[]) {
    super();
    this.login = login;

    this.repositoryname = repositoryname;

    this.languages = languages;
  }
}
