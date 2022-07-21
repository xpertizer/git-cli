/**
 *        @file UserProfileResponse.ts
 *     @summary UserProfileResponse Class
 * @description Defines the structure for UserProfileResponse model
 */

import { NullableString } from '../typings/types';
import UserObject from './user';

/**
 * User class
 *
 * This class contains information about the git user profile
 *
 * @class User
 */

export default class UserProfileResponse extends UserObject {
  public login: NullableString = undefined;

  public name: NullableString = undefined;

  public location: NullableString = undefined;

  public bio: NullableString = undefined;

  public avatar_url: NullableString = undefined;

  public company: NullableString = undefined;

  public repos_url: NullableString = '';
  keys: any;
  /**
   *
   */
  constructor(_gitUser?: UserObject | null | undefined) {
    super();
    if (_gitUser) {
      this.login = _gitUser.login;

      this.name = _gitUser.name;

      this.location = _gitUser.location;

      this.bio = _gitUser.bio;

      this.avatar_url = _gitUser.avatar_url;

      this.company = _gitUser.company;

      this.repos_url = _gitUser.repos_url;
    }
  }
}
