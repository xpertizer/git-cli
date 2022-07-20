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
    console.log(
      `\n _loginUser ${this._loginUser}===============fetchUserData================================\n`,
    );
    this._jsonUsuario = await this._gs.getProfile(this._loginUser);

    console.log(
      `\n\n\n\n******\n t ${this._jsonUsuario}\n\n==type ${typeof this
        ._jsonUsuario}=============fetchUserData===================t=============\n`,
    );
    console.log(
      `\n\n\n\n******\n t \n ${JSON.stringify(
        this._jsonUsuario,
      )}\n\n==type ${typeof this
        ._jsonUsuario}=============fetchUserData===================t=============\n`,
    );

    // console.log(`\n getProfile then: ${JSON.stringify(resp)}\n`);
    // console.log(`\n _jsonUsuario : ${JSON.stringify(this._jsonUsuario)}\n`)
  }
  // private async getRepos(): Promise<void> {
  //   await this._gs.getRepo(this._jsonUsuario.repos_url).then((resp) => {
  //     this._jsonRepositorio = resp;
  //     // console.log(`\n getProfile then: ${JSON.stringify(resp)}\n`);
  //   });
  //   // console.log(`\n _jsonRepositorio : ${JSON.stringify(this._jsonRepositorio)}\n`)
  // }
  // public async createRepos(): Promise<void> {
  //   // console.log(`\ncreateRepos\n`)
  //   // if (this._jsonUsuario.repos_url) {
  //   // }
  //   this._jsonRepositorio = await this._gs.getRepo(this._jsonUsuario.repos_url);

  //   this._jsonUsuario.keys.forEach((key: any) => {
  //     console.log(`\nkey:${key}`);
  //   });
  // }
  public async createUser(): Promise<User> {
    // console.log(`\ncriarUsuario\n`)
    // console.log(`\nrepos_url: ${this._jsonUsuario.repos_url}\n`)
    await this.fetchUserData();
    console.log(
      `\n _jsonUsuario ${this._jsonUsuario}===============createUser========_jsonUsuario========================\n`,
    );
    console.log(
      `\n\n\n\n\n\n _jsonUsuario ${JSON.stringify(
        this._jsonUsuario,
      )}\n\n\n\n===============createUser========_jsonUsuario========================\n`,
    );
    const jsonRepositorio: any = await this._gs.getRepo(
      this._jsonUsuario.repos_url,
    );
    console.log(
      `\n jsonRepositorio ${jsonRepositorio}===============createUser=======jsonRepositorio=========================\n`,
    );

    await jsonRepositorio.forEach(
      async (repoJson: { languages_url: string; name: string; login: any }) => {
        // console.log(`Nome: ${jsonRepositorio[i].name}\n`);
        // console.log(`languages_url: ${jsonRepositorio[i].languages_url}\n`);
        console.log(
          `\n\n\n repoJson\n\nConteudo:\n\n\n ${JSON.stringify(
            repoJson,
          )}\n\n\n\n===============createUser=======repoJson=========================\n`,
        );
        const jsonLanguages: any = await this._gs.getLanguages(
          repoJson.languages_url,
        );
        // console.log('===================LANGUAGE================');
        console.log(
          `\n\n\n jsonLanguages\n\nConteudo:\n\n\n ${JSON.stringify(
            jsonLanguages,
          )}\n\n\n\n===============createUser=======jsonLanguages=========================\n`,
        );
        JSON.stringify(jsonLanguages)
          .split(',')
          .forEach((e: string) => {
            console.log(
              `\n\n\n e\n\nConteudo:\n\n\n ${e}\n\n\n\n===============createUser=======jsonLanguages========e=================\n`,
            );

            const _lang: string = e.split(':')[0].replaceAll('"', '');
            console.log(
              `\n\n\n _lang\n\nConteudo:\n\n\n ${_lang}\n\n\n\n===============createUser=======jsonLanguages========_lang=================\n`,
            );
            this._repoCliLanguages.push(
              new Language(this._loginUser, repoJson.name, _lang),
            );
          });

        // jsonLanguages.forEach(
        //   (l: {
        //     (arg0: number): string;
        //     (arg0: number): string;
        //     key: any;
        //   }): void => {
        //     console.log(
        //       `\n\n\n language, \n key: ${l(
        //         0,
        //       )} \n\nConteudo:\n\n\n ${JSON.stringify(
        //         l,
        //       )}\n\n\n\n===============createUser=======l=========================\n`,
        //     );
        //     this._repoCliLanguages.push(
        //       new Language(this._loginUser, repoJson.name, l(0)),
        //     );
        //   },
        // );
        // console.log(`_repoCliLanguages: ${JSON.stringify(this._repoCliLanguages)}\n`);
        this._gitUserRepos.push(
          new Repo(repoJson.name, repoJson.login, this._repoCliLanguages),
        );
        // console.log(`\nrepo: ${JSON.stringify(_repoCli)}\n`);

        console.log(
          `\n _repoCli ${JSON.stringify(
            this._gitUserRepos,
          )}===============createUser===========_gitUserRepos=====================\n`,
        );

        //    // const element = jsonLanguages[i][0];

        // }
        // var tablename = _p[i].name;
      },
    );
    //console.log(`jsonUsuario: ${jsonUsuario}\n repos: ${this._gitUserRepos}`)
    //return new User(jsonUsuario,this._gitUserRepos)
    //console.log(Object.keys(jsonRepositorio));
    this._gitUser = new User(
      this._jsonUsuario.login,
      this._jsonUsuario.name,
      this._jsonUsuario.location,
      this._jsonUsuario.bio,
      this._jsonUsuario.avatar_url,
      this._jsonUsuario.repos_url,
      this._gitUserRepos,
    );

    console.log(
      `\n\n\n _gitUser\n\nConteudo:\n\n\n ${JSON.stringify(
        this._gitUser,
      )}\n\n\n\n===============createUser=======jsonLanguages========_lang=================\n`,
    );
    return this._gitUser;
  }
}
