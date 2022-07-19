import axios from 'axios';
import UserProfileResponse from '../models/userprofileresponse';
import UserRepoLanguageResponse from '../models/userrepolanguageresponse';
import UserRepoResponse from '../models/userreporesponse';

export default class GitServices {
  private urlUsers = 'http://api.github.com/users/';
  private token = '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';
  private url = '';
  private gitUser = '';

  public async get(returnType: any): Promise<any> {
    try {
      // 👇️ const data: GetUsersResponse
      const { data, status } = await axios.get<typeof returnType>(this.url, {
        headers: {
          Accept: 'application/json',
          Authorization: `token ${this.token}`,
        },
      });
      //curl -i -u your_username https://api.github.com/users/octocat
      //   console.log(`\nGet axios response\nresponse.data\n`)
      // console.log(JSON.stringify(data, null, 4));

      // 👇️ "response status is: 200"
      console.log('response status is: ', status);

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
  public async getProfile(gitUser: string): Promise<UserProfileResponse> {
    this.url = this.urlUsers + gitUser;
    // console.log(`getProfile gitUser: ${gitUser} request to url: ${this.url}\n` )
    return await this.get(UserProfileResponse);
  }
  public async getRepo(gitUserRepoURL: string): Promise<UserRepoResponse> {
    this.url = gitUserRepoURL;
    // console.log(`getRepo request to url: ${this.url}\n` )
    return await this.get(UserRepoResponse);
  }
  public async getLanguages(
    gitUserRepoLanguagesURL: string,
  ): Promise<UserRepoLanguageResponse> {
    this.url = gitUserRepoLanguagesURL;
    // console.log(`getLanguages request to url: ${this.url}\n` )
    return await this.get(UserRepoLanguageResponse);
  }
}
