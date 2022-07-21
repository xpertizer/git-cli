import GitServices from '../services/gitServices';
import Language from '../models/language';
import User from '../models/user';
import Repo from '../models/repo';
import { UserRepoResponse } from '../models/userreporesponse';
import UserProfileResponse from '../models/userprofileresponse';
import UserRepoLanguageResponse from '../models/userrepolanguageresponse';
import { lchmod } from 'fs/promises';
import e from 'express';

export default class UserFactory {
  private _loginUser: string;
  public _gitUser: User | undefined;
  private _gitUserRepos: Repo[] = [];
  private _repoCliLanguages: Language[] = [];
  private _gs = new GitServices();
  public _jsonUsuario = new UserProfileResponse();
  // private _jsonRepositorio: UserRepoResponse;

  /**
   *
   */
  constructor(gitUser: string) {
    this._loginUser = gitUser;
  }
  private async fetchUserData(): Promise<void> {
    this._jsonUsuario = await this._gs.getProfile(this._loginUser);
  }
  public async createUser(): Promise<User> {
    await this.fetchUserData();
    const jsonRepositorio: any = await this._gs.getRepo(
      this._jsonUsuario.repos_url ?? '',
    );

    await jsonRepositorio.forEach(
      async (repoJson: { languages_url: string; name: string; login: any }) => {
        const jsonLanguages: any = await this._gs.getLanguages(
          repoJson.languages_url,
        );
        JSON.stringify(jsonLanguages)
          .split(',')
          .forEach((e: string) => {
            const _lang: string = e.split(':')[0].replaceAll('"', '');
            this._repoCliLanguages.push(
              new Language(this._loginUser, repoJson.name, _lang),
            );
          });

        this._gitUserRepos.push(
          new Repo(repoJson.name, repoJson.login, this._repoCliLanguages),
        );
      },
    );
    this._gitUser = new User(
      this._jsonUsuario.login ?? '',
      this._jsonUsuario.name ?? '',
      this._jsonUsuario.location ?? '',
      this._jsonUsuario.bio ?? '',
      this._jsonUsuario.avatar_url ?? '',
      this._jsonUsuario.repos_url ?? '',
      this._jsonUsuario.company ?? '',
      this._gitUserRepos,
    );
    return this._gitUser;
  }
}
