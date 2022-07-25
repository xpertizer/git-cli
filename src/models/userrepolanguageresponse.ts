/**
 *        @file UserRepoLanguageResponse.ts
 *
 * @description Defines the structure for UserRepoLanguageResponse model
 */

import { NullableString } from '../typings/types';

/**
 * UserRepoLanguageResponse class
 *
 * This class contains information about the git user repository language
 *
 * @class UserRepoLanguageResponse
 */

export class UserRepoLanguageResponse {
  public login: NullableString = undefined;
  public repoName: NullableString = undefined;
  public knownLanguage: string | undefined;
  data: any;
}
/**
 *
 */
export default UserRepoLanguageResponse;
