import UserFactory from '../factory/userfactory';
export default async function fetchuser(gitUser: string): Promise<void> {
  //console.log(JSON.stringify(_gitUser, null, 4));
  // console.log(`Creating UserFactory instance gitUser: ${gitUser}`)
  const _uf = new UserFactory(gitUser);
  // console.log(`\n _gitUser antes: ${_uf._gitUser}\n`)
  // console.log(`\n _jsonUsuario antes: ${JSON.stringify(_uf._jsonUsuario)}\n`)
  await _uf.getProfile();
  console.log(await _uf.createUser());
  // console.log(`\n _gitUser depois: ${_uf._gitUser}\n`)
  // console.log(`\n _jsonUsuario depois: ${JSON.stringify(_uf._jsonUsuario)}\n`)
  //console.log(JSON.stringify(_user));
}
module.exports = fetchuser;
