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

export class UserRepoResponse {
  public login: NullableString = undefined;

  public name: NullableString = undefined;

  public languages: Language[] | undefined;
}

export default UserRepoResponse;
