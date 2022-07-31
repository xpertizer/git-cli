import { db } from '../../db';

export default async function listUser(location: any, languages: any) {
  console.log(`\n Result for location ${location}`);
  console.log(`\n Result for languages ${languages}`);
  const lineWidth = 83;
  await db.task('find-git-user', async (t) => {
    const gitusers = await t.gitusers.findByLocation(location, languages);
    console.log('+', '='.repeat(lineWidth), '+');
    console.log(
      '|',
      'Name'.padEnd(50, ' '),
      '|',
      'Location'.padEnd(30, ' '),
      '|',
      'Languages',
    ); //, 'location');
    console.log('+', '='.repeat(lineWidth), '+');
    for (const key in gitusers) {
      const gitUser = gitusers[key];
      //console.log('\n', gitUser.name, ' Location: ', gitUser.location);
      console.log(
        '|',
        gitUser.name.padEnd(50, ' '),
        '|',
        gitUser.location.padEnd(30, ' '),
        '|',
        gitUser.languages,
      );
    }
    console.log('+', '='.repeat(lineWidth), '+');
  });
}

module.exports = listUser;
