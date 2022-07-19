import GitServices from '../services/gitServices';
import Language from '../models/language';
import User from '../models/user';
import Repo from '../models/repo';
import { UserRepoResponse } from '../models/userreporesponse';
import UserProfileResponse from '../models/userprofileresponse';

export default class UserFactory {
  private _loginUser: string;
  public _gitUser: User | undefined;
  private _gitUserRepos: Repo[] = [];
  private _repoCliLanguages: Language[] = [];
  private _gs = new GitServices();
  public _jsonUsuario!: UserProfileResponse;
  private _jsonRepositorio!: UserRepoResponse;

  /**
   *
   */
  constructor(gitUser: string) {
    this._loginUser = gitUser;
  }
  async getProfile(): Promise<void> {
    await this._gs.getProfile(this._loginUser).then((resp) => {
      this._jsonUsuario = resp;
      // console.log(`\n getProfile then: ${JSON.stringify(resp)}\n`);
    });
    // console.log(`\n _jsonUsuario : ${JSON.stringify(this._jsonUsuario)}\n`)
    await this.getRepos();
  }
  async getRepos(): Promise<void> {
    await this._gs.getRepo(this._jsonUsuario.repos_url).then((resp) => {
      this._jsonRepositorio = resp;
      // console.log(`\n getProfile then: ${JSON.stringify(resp)}\n`);
    });
    // console.log(`\n _jsonRepositorio : ${JSON.stringify(this._jsonRepositorio)}\n`)
  }
  public async createRepos(): Promise<void> {
    // console.log(`\ncreateRepos\n`)
    // if (this._jsonUsuario.repos_url) {
    // }
    this._jsonRepositorio = await this._gs.getRepo(this._jsonUsuario.repos_url);

    this._jsonUsuario.keys.forEach((key: any) => {
      console.log(`\nkey:${key}`);
    });

    // for(var i = 0; i < this._jsonRepositorio.length; i++)
    // {

    //     // console.log(`Nome: ${jsonRepositorio[i].name}`);
    //     // console.log(`languages_url: ${jsonRepositorio[i].languages_url}`);

    //     if (_jsonRepositorio[i].languages_url) {
    //         const jsonLanguages:Object = await this._gs.getLanguages(jsonRepositorio[i].languages_url,UserRepoLanguageResponse);
    //         console.log(`\nresponse languages:\n ${JSON.stringify(jsonLanguages)}`)
    //     // jsonLanguages.forEach(e => {
    //     //         this._repoCliLanguages.push(new Language( this._loginUser,jsonRepositorio[i].name,e))
    //     //         //.log(`language added: ${e}\n`);
    //     //    });
    //     }

    //        // console.log(`_repoCliLanguages: ${JSON.stringify(this._jsonUsuario._repoCliLanguages)}\n`);
    //         let _repo = new Repo(jsonRepositorio[i].name,
    //                         jsonRepositorio[i].login,
    //                         this._repoCliLanguages);
    //         this._gitUserRepos.push(_repo);
    //         console.log(`repo added: ${JSON.stringify(_repo)}\n`);

    //         // for (let i = 0; i < jsonLanguages.length; i++) {
    //             //     console.log(`languagel: ${jsonLanguages[i]}`);
    //     //    // const element = jsonLanguages[i][0];

    //     // }
    //     // var tablename = _p[i].name;
    // }
  }
  public async createUser(): Promise<User> {
    // console.log(`\ncriarUsuario\n`)
    // console.log(`\nrepos_url: ${this._jsonUsuario.repos_url}\n`)
    const jsonRepositorio: any = await this._gs.getRepo(
      this._jsonUsuario.repos_url,
    );

    for (let i = 0; i < jsonRepositorio.length; i++) {
      // console.log(`Nome: ${jsonRepositorio[i].name}\n`);
      // console.log(`languages_url: ${jsonRepositorio[i].languages_url}\n`);

      const jsonLanguages: any = await this._gs.getLanguages(
        jsonRepositorio[i].languages_url,
      );
      const _repos = JSON.parse(JSON.stringify(jsonLanguages));
      // console.log('===================LANGUAGE================');
      Object.keys(_repos).forEach((r) => {
        // console.log(JSON.stringify(r))
        this._repoCliLanguages.push(
          new Language(this._loginUser, jsonRepositorio[i].name, r),
        );
      });
      // console.log(`_repoCliLanguages: ${JSON.stringify(this._repoCliLanguages)}\n`);
      const _repoCli = new Repo(
        jsonRepositorio[i].name,
        jsonRepositorio[i].login,
        this._repoCliLanguages,
      );
      // console.log(`\nrepo: ${JSON.stringify(_repoCli)}\n`);
      this._gitUserRepos?.push(_repoCli);
      // for (let i = 0; i < jsonLanguages.length; i++) {
      //     console.log(`languagel: ${jsonLanguages[i]}`);
      //    // const element = jsonLanguages[i][0];

      // }
      // var tablename = _p[i].name;
    }
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
    return this._gitUser;
  }
}
