import axios from 'axios';
import 'dotenv/config';
import UserProfileResponse from '../models/userprofileresponse';
import UserRepoLanguageResponse from '../models/userrepolanguageresponse';
import UserRepoResponse from '../models/userreporesponse';

export default class GitServices {
  private urlUsers = 'http://api.github.com/users/';
  private token = process.env.GITTOKEN;
  private url = '';

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public async get(returnType: any): Promise<any> {
    try {
      if (!this.token) {
        console.log(
          `\n token ${this.token}===============Check .env file GITTOKEN value =============================\n`,
        );
        return;
      }
      const { data } = await axios.get(this.url, {
        headers: {
          Accept: 'application/json',
          Authorization: `token ${this.token}`,
        },
      });
      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log('error message: ', error.message);

        return error.message;
      } else {
        console.log('unexpected error: ', error);

        return 'An unexpected error occurred';
      }
    }
  }
  public async getProfile(gitUser: string): Promise<any> {
    this.url = this.urlUsers + gitUser;
    const _up: UserProfileResponse = await this.get(UserProfileResponse);

    return _up;
  }
  public async getRepo(gitUserRepoURL?: string): Promise<any> {
    if (!gitUserRepoURL) return;
    if (gitUserRepoURL) this.url = gitUserRepoURL;

    const _uprepo: UserRepoResponse = await this.get(UserRepoResponse);
    return _uprepo;
  }
  public async getLanguages(
    gitUserRepoLanguagesURL: string,
  ): Promise<UserRepoLanguageResponse> {
    this.url = gitUserRepoLanguagesURL;
    return await this.get(UserRepoLanguageResponse);
  }
}
