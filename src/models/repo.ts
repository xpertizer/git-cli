/**
 *        @file Repo.ts
 *
 * @description Defines the structure for Repo model
 */

import { NullableString } from '../typings/types';
import Language from './language';

/**
 * Repo class
 *
 * This class contains information about the git user repository
 *
 * @class Repos
 */

export default class Repo extends Object {
  public login: NullableString = undefined;

  public repositoryname: NullableString = undefined;

  public languages: Language[] | undefined;
  constructor(
    login?: string | null | undefined,
    repositoryname?: string | null | undefined,
    languages?: Language[] | undefined,
  ) {
    super();
    if (login || repositoryname || languages) {
      this.login = login;
      this.repositoryname = repositoryname;
      this.languages = languages;
    }
  }
}
