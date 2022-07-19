import UserProfileResponse from "../models/userprofileresponse";
import UserRepoLanguageResponse from "../models/userrepolanguageresponse";
import UserRepoResponse from "../models/userreporesponse";
export default class GitServices {
    private urlUsers;
    private token;
    private url;
    private gitUser;
    get(returnType: any): Promise<any>;
    getProfile(gitUser: string): Promise<UserProfileResponse>;
    getRepo(gitUserRepoURL: string): Promise<UserRepoResponse>;
    getLanguages(gitUserRepoLanguagesURL: string): Promise<UserRepoLanguageResponse>;
}
