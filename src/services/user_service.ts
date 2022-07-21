/**
 *        @file user_service.ts
 *              - FetchClienteAddToDatabase()
 *              - getFilteredUserInLocation()
 */

import UserObject from '../models/user';
import UserFactory from '../factory/userfactory';
import { db } from '../../db';

export class UserService {
  private _gitusers: UserObject = new UserObject();

  async FetchClienteAddToDatabase(userLogin: string): Promise<void> {
    const _uf = new UserFactory(userLogin);

    this._gitusers = await _uf.createUser();

    await db.task('add-git-user', async (t) => {
      const gituser = await t.gitusers.find(this._gitusers);
      return gituser || (await t.gitusers.add(this._gitusers));
    });
  }

  public async getFilteredUserInLocation(
    users: UserObject[],
    userLocation: string,
  ): Promise<UserObject[]> {
    return users.filter((user) => user.location === userLocation);
  }
}

export default UserService;
