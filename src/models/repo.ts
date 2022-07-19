/**
 *        @file user.ts
 *  @repository 000-a-3100_api_boilerplate
 * @application 000-a-3100_api_boilerplate
 *     @summary Repos Class
 * @description Defines the structure for user model
 */

import { NullableString } from '../typings/types';
import Language from './language';

/**
 * Repos class
 *
 * This class contains information about the git user repository
 *
 * @class Repos
 */

export class Repo {
  public login: NullableString = undefined;

  public name: NullableString = undefined;

  public languages: Language[] | undefined;
  constructor(...args: any[]) {
    if (args[0]) {
      this.login = args[0];
      this.name = args[1];
      this.languages = args[2];
    }
  }
}

export default Repo;
