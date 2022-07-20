/**
 *        @file user_service.ts
 *              - FetchClienteAddToDatabase()
 *              - verifyToken()
 *              - decodeToken()
 *              - responseObject()
 *              - getAllUsers()
 *              - addUser()
 *              - login()
 *              - whoami()
 *              - getUserAndAuthToken()
 *              - forgotPassword()
 *              - changePassword()
 *              - getPermissions()
 *              - getDefaultUser()
 */

import UserObject from '../models/user';
import UserFactory from '../factory/userfactory';
import { db } from '../../db';
import { GitUsers } from '../../db/models';

export class UserService {
  private _uf: UserFactory | undefined;
  private _gitusers: UserObject = new UserObject();

  /**
   *
   */

  async FetchClienteAddToDatabase(userLogin: string): Promise<void> {
    const _uf = new UserFactory(userLogin);

    this._gitusers = await _uf.createUser();
    console.log(
      `\n _jsonUsuario ${_uf._jsonUsuario}===============FetchClienteAddToDatabase================================\n`,
    );
    console.log(
      `\n _jsonUsuario\n\n conteudo:\n ${JSON.stringify(_uf._jsonUsuario)}\n`,
    );

    console.log(
      `\n _gitusers ${this._gitusers}===============FetchClienteAddToDatabase============_gitusers====================\n`,
    );
    console.log(
      `\n _gitusers\n\n conteudo:\n ${JSON.stringify(this._gitusers)}\n`,
    );
    await db.task('add-git-user', async (t) => {
      const gituser = await t.gitusers.find(this._gitusers);
      return gituser || (await t.gitusers.add(this._gitusers));
    });
  }

  // constructor(_user: any) {}

  // // add user
  // public async addUser(user: User, pool?: PGPool): Promise<any> {
  //   let pooldefinedLocally = false;

  //   // pool is not supplied, create one AND start transaction
  //   if (pool === undefined) {
  //     pooldefinedLocally = true;
  //     pool = Helper.pool();
  //     // begin transaction
  //     await Helper.beginTransaction(pool, this.user_current);
  //   }

  //   try {
  //     // insert user row
  //     const sql_user = `INSERT INTO users (login, location, name, bio, avatar_url, company)
  // 			VALUES ('${user.login}', '${user.location}', '${user.name}', '${user.bio}', '${user.avatar_url}', '${user.company}')`;

  //     // eslint-disable-next-line @typescript-eslint/no-unused-vars
  //     await pool.aquery(this.user_current, sql_user, []);

  //     // commit if there is a transaction
  //     if (pooldefinedLocally)
  //       await Helper.commitTransaction(pool, this.user_current);

  //     return {
  //       success: true,
  //       data: {
  //         message: messages.success.insert,
  //       },
  //     };
  //   } catch (error) {
  //     console.log(`UserService.addUser() Error: ${error}`);
  //     return { success: false, data: { message: error.detail || error } };
  //   }
  // }

  // // get all users
  // // eslint-disable-next-line @typescript-eslint/no-explicit-any
  // public async getAllUsers(): Promise<any> {
  //   const sql = `SELECT login, location, name, bio, avatar_url, company
  //     FROM public.gitusers`;

  //   const pool = Helper.pool();
  //   const query_results = await pool.aquery(this.user_current, sql);

  //   return {
  //     success: true,
  //     data: query_results.rows,
  //   };
  // }
  // get user from a location
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public async getFilteredUserInLocation(
    users: UserObject[],
    userLocation: string,
  ): Promise<UserObject[]> {
    return users.filter((user) => user.location === userLocation);
  }

  // get user have repositories
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  // public async getFilteredUserKnownLanguages(
  //   usersList: User[],
  //   languagesToCheck: Language[]
  // ): Promise<any> {
  //   const usersToReturn = usersList.forEach((userItem) => {
  //     userItem.repos.forEach((repo) => {
  //       languagesToCheck.forEach((lang) => {
  //         const languages = repo.languages;
  //         if (languages) {
  //           if (languages.includes(lang)) {
  //             return true;
  //           } else {
  //             return false;
  //           }
  //         }

  //       });
  //     });
  //   });
  //   return usersToReturn;
  // }
}

export default UserService;
