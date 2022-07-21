import GitServices from '../services/gitServices';
import Language from '../models/language';
import User from '../models/userobject';
import Repo from '../models/repo';
import UserProfileResponse from '../models/userprofileresponse';

export default class UserFactory {
  private _loginUser: string;
  public _gitUser: User | undefined;
  private _gitUserRepos: Repo[] = [];
  private _repoCliLanguages: Language[] = [];
  private _gs = new GitServices();
  public _jsonUserProfileResponse = new UserProfileResponse();

  constructor(gitUser: string) {
    this._loginUser = gitUser;
  }
  private async fetchUserData(): Promise<void> {
    this._jsonUserProfileResponse = await this._gs.getProfile(this._loginUser);
  }
  public async createUser(): Promise<User> {
    await this.fetchUserData();
    const jsonRepositorio: any = await this._gs.getRepo(
      this._jsonUserProfileResponse.repos_url ?? '',
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
      this._jsonUserProfileResponse.login ?? '',
      this._jsonUserProfileResponse.name ?? '',
      this._jsonUserProfileResponse.location ?? '',
      this._jsonUserProfileResponse.bio ?? '',
      this._jsonUserProfileResponse.avatar_url ?? '',
      this._jsonUserProfileResponse.repos_url ?? '',
      this._jsonUserProfileResponse.company ?? '',
      this._gitUserRepos,
    );
    return this._gitUser;
  }
}
