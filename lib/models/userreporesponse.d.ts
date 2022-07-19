import { NullableString } from "../typings/types";
import Language from "./language";
export declare class UserRepoResponse {
    login: NullableString;
    name: NullableString;
    languages: Language[] | undefined;
}
export default UserRepoResponse;
