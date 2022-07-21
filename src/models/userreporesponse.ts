/**
 *        @file UserRepoResponse.ts
 *     @summary UserRepoResponse Class
 * @description Defines the structure for UserRepoResponse model
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
