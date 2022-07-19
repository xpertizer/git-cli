import { NullableString } from "../typings/types";
import Language from "./language";
export declare class Repo {
    login: NullableString;
    name: NullableString;
    languages: Language[] | undefined;
    constructor(...args: any[]);
}
export default Repo;
