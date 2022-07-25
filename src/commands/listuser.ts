import { db } from '../../db';

export default async function listUser(location: any) {
  console.log(`\n Result for location ${location}`);
  await db.task('find-git-user', async (t) => {
    const gitusers = await t.gitusers.findByLocation(location);
    console.log('\n name', 'location');
    console.log('\n ==========================================');
    for (const key in gitusers) {
      const gitUser = gitusers[key];
      console.log('\n', gitUser.name, ' Location: ', gitUser.location);
    }
  });
}

module.exports = listUser;
