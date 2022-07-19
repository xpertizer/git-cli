/**
 *        @file user.ts
 *  @repository 000-a-3100_api_boilerplate
 * @application 000-a-3100_api_boilerplate
 *     @summary User Class
 * @description Defines the structure for user model
 */

import { NullableString } from '../typings/types';
import { Repo } from './repo';

/**
 * User class
 *
 * This class contains information about the git user and
 *
 * @class User
 */

export default class UserProfileResponse {
  public login!: string;

  public name!: string;

  public location!: string;

  public bio!: string;

  public avatar_url!: string;

  public company!: string;

  public repos_url!: string;
  keys: any;
}
