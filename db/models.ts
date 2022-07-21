export interface GitUsers {
  login: string;
  location: string;
  name: string;
  bio: string;
  avatar_url: string;
  company: string;
  repos_url: string;
}

export interface GitRepos {
  login: string;
  repositoryname: string;
}

export interface GitLanguages {
  login: string;
  repositoryname: string;
  language: string;
}
