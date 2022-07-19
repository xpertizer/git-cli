import { NullableString } from "../typings/types";
export declare class Language {
    login: NullableString;
    repoName: NullableString;
    knownLanguage: string | undefined;
    constructor(_login: string, _repoName: string, _knownLanguage: string);
}
export default Language;
