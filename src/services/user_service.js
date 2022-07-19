"use strict";
/**
 *        @file user_service.ts
 *  @repository 000-a-3100_api_boilerplate
 * @application 000-a-3100_api_boilerplate
 *     @summary UserService Class
 * @description Define Functions that perform CRUD operations on users
 *   @functions - createToken()
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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
class UserService {
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
    getFilteredUserInLocation(users, userLocation) {
        return __awaiter(this, void 0, void 0, function* () {
            return users.filter((user) => user.location === userLocation);
        });
    }
}
exports.UserService = UserService;
exports.default = UserService;
