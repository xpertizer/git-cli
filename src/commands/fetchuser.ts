import axios from 'axios';
import 'dotenv/config';
import { db } from '../../db';

export default async function fetchuser(gitUser: string): Promise<void> {
  const urlUsers = 'http://api.github.com/users/';
  const token = process.env.GITTOKEN;
  let url = urlUsers + gitUser;

  if (!token) {
    console.log(
      `\n token ${token}===============Check .env file GITTOKEN value =============================\n`,
    );
    return;
  }
  const _gitProfileJson = await axios.get(url, {
    headers: {
      Accept: 'application/json',
      Authorization: `token ${token}`,
    },
  });

  const _gitprofileresponse = {
    login: gitUser,
    location: _gitProfileJson.data.location,
    name: _gitProfileJson.data.name,
    bio: _gitProfileJson.data.bio,
    avatar_url: _gitProfileJson.data.avatar_url,
    company: _gitProfileJson.data.company,
  };

  await db.task('add-git-user', async (t) => {
    const gituser = await t.gitusers.find(gitUser);
    return gituser || (await t.gitusers.add(_gitprofileresponse));
  });

  if (!_gitProfileJson.data.repos_url) return;
  url = _gitProfileJson.data.repos_url;
  const _gitUserRepos = await axios.get(url, {
    headers: {
      Accept: 'application/json',
      Authorization: `token ${token}`,
    },
  });

  if (_gitUserRepos.data.length === 0) {
    return;
  }
  for (const repo in _gitUserRepos.data) {
    const _gitRepo = _gitUserRepos.data[repo];
    if (!_gitRepo.languages_url) continue;
    url = _gitRepo.languages_url;
    const _gitUserReposLanguages = await axios.get(url, {
      headers: {
        Accept: 'application/json',
        Authorization: `token ${token}`,
      },
    });

    const _lang = JSON.stringify(_gitUserReposLanguages.data).split(',');
    for (const key in _lang) {
      const _language = {
        login: gitUser,
        language: getLanguageFromString(_lang[key]),
        repositoryname: _gitRepo.name,
      };
      await db.task('add-git-user-repo-lang', async (t) => {
        const gituser = await t.gitlanguages.find(_language);
        return gituser || (await t.gitlanguages.add(_language));
      });
    }
    const _Repo = {
      login: gitUser,
      repositoryname: _gitRepo.name,
    };
    await db.task('add-git-user-repo', async (t) => {
      const gituser = await t.gitrepos.find(gitUser, _gitRepo.name);
      return gituser || (await t.gitrepos.add(_Repo));
    });
  }
}

function getLanguageFromString(e: string): string {
  return e
    .replaceAll('"', '')
    .replaceAll('{', '')
    .replaceAll('}', '')
    .split(':')[0];
}
