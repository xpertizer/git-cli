import UserService from '../services/user_service';

export default async function fetchuser(gitUser: string): Promise<void> {
  const userService = new UserService();
  await userService.FetchClienteAddToDatabase(gitUser);
}

module.exports = fetchuser;
