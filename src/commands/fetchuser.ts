import UserService from '../services/user_service';
export default async function fetchuser(gitUser: string): Promise<void> {
  //console.log(JSON.stringify(_gitUser, null, 4));
  // console.log(`Creating UserFactory instance gitUser: ${gitUser}`)
  const userService = new UserService();
  // console.log(`\n _gitUser antes: ${_uf._gitUser}\n`)
  // console.log(`\n _jsonUsuario antes: ${JSON.stringify(_uf._jsonUsuario)}\n`)
  console.log(
    `\n gitUser ${gitUser}===============fetchuser================================\n`,
  );
  await userService.FetchClienteAddToDatabase(gitUser);
  // console.log(`\n _gitUser depois: ${_uf._gitUser}\n`)
  // console.log(`\n _jsonUsuario depois: ${JSON.stringify(_uf._jsonUsuario)}\n`)
  //console.log(JSON.stringify(_user));
}
module.exports = fetchuser;
