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
  name: string;
}

export interface GitLanguages {
  login: string;
  name: string;
  language: string;
}
