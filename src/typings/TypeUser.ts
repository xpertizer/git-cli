export type TypeUser = Model | null | undefined;
export type Model = {
  login: string;
  name: string;
  location: string;
  bio: string;
  avatar_url: string;
  company: string;
  reprepos_url: string;
};
