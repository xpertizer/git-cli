import User from "../models/user";
import UserProfileResponse from "../models/userprofileresponse";
export default class UserFactory {
    private _loginUser;
    _gitUser: User | undefined;
    private _gitUserRepos;
    private _repoCliLanguages;
    private _gs;
    _jsonUsuario: UserProfileResponse;
    private _jsonRepositorio;
    constructor(gitUser: string);
    getProfile(): Promise<void>;
    getRepos(): Promise<void>;
    createRepos(): Promise<void>;
    createUser(): Promise<User>;
}
