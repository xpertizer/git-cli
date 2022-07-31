import { IDatabase, IMain } from 'pg-promise';
import { IResult } from 'pg-promise/typescript/pg-subset';
import Language from '../../src/models/language';
import { GitUsers } from '../models';
import { gitusers as sql } from '../sql';

/*
 This repository mixes hard-coded and dynamic SQL, just to show how to use both.
*/

export class GitUsersRepository {
  /**
   * @param db
   * Automated database connection context/interface.
   *
   * If you ever need to access other repositories from this one,
   * you will have to replace type 'IDatabase<any>' with 'any'.
   *
   * @param pgp
   * Library's root, if ever needed, like to access 'helpers'
   * or other namespaces available from the root.
   */
  constructor(private db: IDatabase<unknown>, private pgp: IMain) {
    /*
          If your repository needs to use helpers like ColumnSet,
          you should create it conditionally, inside the constructor,
          i.e. only once, as a singleton.
        */
  }

  // Creates the table;
  async create(): Promise<null> {
    return this.db.none(sql.create);
  }

  // Initializes the table with some user records, and return their id-s;
  async init(): Promise<number[]> {
    return this.db.map(sql.init, [], (row: { id: number }) => row.id);
  }

  // Drops the table;
  async drop(): Promise<null> {
    return this.db.none(sql.drop);
  }

  // Removes all records from the table;
  async empty(): Promise<null> {
    return this.db.none(sql.empty);
  }

  // Adds a new user, and returns the new object;
  async add(_user: any): Promise<void> {
    const cs = new this.pgp.helpers.ColumnSet(
      ['login', 'location', 'name', 'bio', 'avatar_url', 'company'],
      { table: 'gitusers' },
    );

    const query = () => this.pgp.helpers.insert(_user, cs);

    await this.db.none(query);

    console.log(
      `Data from ${_user.name} wich have login ${_user.login} fetched and cached on database`,
    );
  }

  // Tries to delete a user by id, and returns the number of records deleted;
  async remove(login: string): Promise<number> {
    return this.db.result(
      'DELETE FROM gitusers WHERE login = $1',
      +login,
      (r: IResult) => r.rowCount,
    );
  }

  // Tries to find a user from id;
  async find(_login: string): Promise<GitUsers | null> {
    return this.findByLogin(_login);
  }
  // Tries to find a user from id;
  async findByLogin(_login: string): Promise<GitUsers | null> {
    return this.db.oneOrNone('SELECT * FROM gitusers WHERE login = $1', _login);
  }

  // Tries to find a user from name;
  async findByLocation(
    location: string,
    language: string,
  ): Promise<any | null> {
    let _return;
    if (!language) {
      _return = this.db.any(
        `SELECT * FROM gitusers WHERE UPPER(location) like $1`,
        location.toUpperCase(),
      );
    } else {
      const words = language.split(',');
      console.log(`words`);
      console.log(words);
      const array2 = [];
      for (const word in words) {
        array2.push(`'` + words[word].trim().toUpperCase() + `'`);
      }
      console.log(`array2`);
      console.log(array2.join(`,`));
      const query = `SELECT DISTINCT U.LOGIN,
                      U.LOCATION,
                      U.NAME,
                      STRING_AGG(L.LANGUAGE,', ') LANGUAGES
                    FROM GITUSERS U
                    JOIN (
                      SELECT distinct L2.login, L2.language 
                      FROM public.gitlanguages L2 ) L ON U.LOGIN = L.LOGIN
                    WHERE UPPER(LOCATION) like $1
                      AND U.LOGIN in (
                      SELECT distinct gl.LOGIN FROM gitlanguages gl WHERE UPPER(LANGUAGE) IN ($2) )
                      AND L.language<>''
                      GROUP BY
                        U.LOGIN,
                      U.LOCATION,
                      U.NAME`;
      _return = this.db.any(query, [location.toUpperCase(), array2.join(`,`)]);
    }
    return _return;
  }

  // Tries to find a user from name;
  async findBylanguages(languages: string): Promise<GitUsers | null> {
    return this.db.oneOrNone(
      'SELECT * FROM gitusers u JOIN gitlanguages l ON u.login = l.login WHERE language IN ($1)',
      languages,
    );
  }

  // Returns all user records;
  async all(): Promise<GitUsers[]> {
    return this.db.any('SELECT * FROM gitusers');
  }

  // Returns the total number of users;
  async total(): Promise<number> {
    return this.db.one(
      'SELECT count(*) FROM gitusers',
      [],
      (a: { count: string }) => +a.count,
    );
  }
}
