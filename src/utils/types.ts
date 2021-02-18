export interface Repository {
  id: string;
  name: string;
  created_at: string;
  owner: Owner;
}

export interface Owner {
  login: string;
  avatar_url: string;
}
