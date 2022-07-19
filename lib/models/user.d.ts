import { NullableString } from "../typings/types";
import { Repo } from "./repo";
export declare class UserObject {
    login: NullableString;
    name: NullableString;
    location: NullableString;
    bio: NullableString;
    avatar_url: NullableString;
    company: NullableString;
    repos_url: NullableString;
    repos: Repo[] | undefined;
    constructor(login?: string, name?: string, location?: string, bio?: string, avatar_url?: string, repos_url?: string, _repos?: Repo[]);
}
export default UserObject;
