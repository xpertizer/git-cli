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

export class Repo {
  public login = '';

  public repositoryname = '';

  public languages: Language[] | undefined;
  constructor(login: string, repositoryname: string, languages: Language[]) {
    this.login = login;
    this.repositoryname = repositoryname;
    this.languages = languages;
  }
}

export default Repo;
