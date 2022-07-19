import User from "../models/user";
export declare class UserService {
    expReq?: any;
    expRes?: any;
    constructor(_user: any);
    getFilteredUserInLocation(users: User[], userLocation: string): Promise<User[]>;
}
export default UserService;
