import { IDatabase, IMain } from 'pg-promise';
import { IResult } from 'pg-promise/typescript/pg-subset';
import { GitRepos } from '../models';
import { gitrepos as sql } from '../sql';

/*
 This repository mixes hard-coded and dynamic SQL, just to show how to use both.
*/

export class GitReposRepository {
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
  async add(name: string): Promise<GitRepos> {
    return this.db.one(sql.add, name);
  }

  // Tries to delete a user by id, and returns the number of records deleted;
  async remove(id: number): Promise<number> {
    return this.db.result(
      'DELETE FROM gitrepos WHERE id = $1',
      +id,
      (r: IResult) => r.rowCount,
    );
  }

  // Tries to find a user from id;
  async findById(id: number): Promise<GitRepos | null> {
    return this.db.oneOrNone('SELECT * FROM gitrepos WHERE id = $1', +id);
  }

  // Tries to find a user from name;
  async findByName(name: string): Promise<GitRepos | null> {
    return this.db.oneOrNone('SELECT * FROM gitrepos WHERE name = $1', name);
  }

  // Returns all user records;
  async all(): Promise<GitRepos[]> {
    return this.db.any('SELECT * FROM gitrepos');
  }

  // Returns the total number of users;
  async total(): Promise<number> {
    return this.db.one(
      'SELECT count(*) FROM gitrepos',
      [],
      (a: { count: string }) => +a.count,
    );
  }
}
