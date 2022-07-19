"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
class UserService {
    constructor(_user) {
    }
    async getFilteredUserInLocation(users, userLocation) {
        return users.filter((user) => user.location === userLocation);
    }
}
exports.UserService = UserService;
exports.default = UserService;
//# sourceMappingURL=user_service.js.map