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
      // console.log(
      //   `\nRequest ${returnType}===============GitServices====get=========================\n`,
      // );
      // console.log(`\nURL :${this.url}\n`);
      // //console.log(JSON.stringify(data, null, 4));
      // console.log(
      //   `\nRequest ${returnType}}===============GitServices====get=========================\n`,
      // );

      // 👇️ const data: GetUsersResponse
      const { data, status } = await axios.get(this.url, {
        headers: {
          Accept: 'application/json',
          Authorization: `token ${this.token}`,
        },
      });
      //curl -i -u your_username https://api.github.com/users/octocat
      //   console.log(`\nGet axios response\nresponse.data\n`)
      // console.log(
      //   `\n data ${data}===============get=============================\n`,
      // );
      // console.log(
      //   `\n status ${status}===============get=============================\n`,
      // );
      // console.log(
      //   `\nRequest ${returnType}===============INICIO=============================\n`,
      // );
      // console.log(`\nURL :${this.url}\n`);
      // console.log(JSON.stringify(data, null, 4));
      // console.log(
      //   `\nRequest ${returnType}===============FIM================================\n`,
      // );
      // 👇️ "response status is: 200"
      console.log('response status is: ', status);

      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log('error message: ', error.message);
        console.log(
          `\nRequest ${returnType}===============INICIO=============================\n`,
        );
        console.log(`\nURL :${this.url}\n`);
        //console.log(JSON.stringify(data, null, 4));
        console.log(
          `\nRequest ${returnType}===============FIM================================\n`,
        );
        return error.message;
      } else {
        console.log('unexpected error: ', error);
        console.log(
          `\nRequest ${returnType}===============INICIO=============================\n`,
        );
        console.log(`\nURL :${this.url}\n`);
        //console.log(JSON.stringify(data, null, 4));
        console.log(
          `\nRequest ${returnType}===============FIM================================\n`,
        );

        return 'An unexpected error occurred';
      }
    }
  }
  public async getProfile(gitUser: string): Promise<any> {
    this.url = this.urlUsers + gitUser;
    // console.log(`getProfile gitUser: ${gitUser} request to url: ${this.url}\n` )
    const _up: UserProfileResponse = await this.get(UserProfileResponse);
    console.log(
      `\n _up ${JSON.stringify(
        _up,
      )}===============getProfile================================\n`,
    );

    console.log(
      `\n\n\n\n\n _up ${JSON.stringify(
        _up,
      )}\n\n\n\n===============getProfile================================\n`,
    );

    return _up;
  }
  public async getRepo(gitUserRepoURL: string): Promise<any> {
    this.url = gitUserRepoURL;
    console.log(
      `\n gitUserRepoURL ${gitUserRepoURL}===============getRepo================================\n`,
    );
    console.log(
      `\n url ${this.url}===============getRepo================================\n`,
    );
    // console.log(`getRepo request to url: ${this.url}\n` )
    const _uprepo: UserRepoResponse = await this.get(UserRepoResponse);
    return _uprepo;
  }
  public async getLanguages(
    gitUserRepoLanguagesURL: string,
  ): Promise<UserRepoLanguageResponse> {
    this.url = gitUserRepoLanguagesURL;
    // console.log(`getLanguages request to url: ${this.url}\n` )
    return await this.get(UserRepoLanguageResponse);
  }
}
