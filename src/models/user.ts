/* eslint-disable camelcase */
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
 * @class UserObject
 */

export class UserObject {
  public login: NullableString = undefined;

  public name: NullableString = undefined;

  public location: NullableString = undefined;

  public bio: NullableString = undefined;

  public avatar_url: NullableString = undefined;

  public company: NullableString = undefined;

  public repos_url: NullableString = undefined;

  public repos!: Repo[] | undefined;
  constructor(
    login?: string,
    name?: string,
    location?: string,
    bio?: string,
    avatar_url?: string,
    repos_url?: string,
    company?: string,
    _repos?: Repo[],
  ) {
    this.login = login;
    this.name = name;
    this.location = location;
    this.bio = bio;
    this.avatar_url = avatar_url;
    this.repos_url = repos_url;
    this.company = company;
    this.repos = _repos;
  }
}

export default UserObject;
