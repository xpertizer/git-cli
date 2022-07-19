import { GitUsersRepository } from './gitusers';
import { GitReposRepository } from './gitrepos';
import { GitLanguagesRepository } from './gitlanguages';

// Database Interface Extensions:
interface IExtensions {
  gitusers: GitUsersRepository;
  gitrepos: GitReposRepository;
  gitlanguages: GitLanguagesRepository;
}

export {
  IExtensions,
  GitUsersRepository,
  GitReposRepository,
  GitLanguagesRepository,
};
