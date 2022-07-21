/**
 *        @file user_service.ts
 *              - FetchClienteAddToDatabase()
 *              - getFilteredUserInLocation()
 */

import UserObject from '../models/userobject';
import UserFactory from '../factory/userfactory';
import { db } from '../../db';
import { Console } from 'console';

export class UserService {
  private _gitusers: UserObject = new UserObject();

  async FetchClienteAddToDatabase(userLogin: string): Promise<void> {
    const _uf = new UserFactory(userLogin);

    this._gitusers = await _uf.createUser();

    // console.log(`========================================\n`);
    // console.log(`========================================\n`);
    // console.log(`========================================\n`);
    // console.log(`_gitusers===============================\n`);
    // console.log(`========================================\n`);
    // console.log(`========================================\n`);
    // console.log(`========================================\n`);
    // console.log(` ${JSON.stringify(this._gitusers)} \n`);
    // console.log(`========================================\n`);
    // console.log(`========================================\n`);
    // console.log(`========================================\n`);
    // console.log(`========================================\n`);
    // console.log(`========================================\n`);
    // console.log(`========================================\n`);

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
