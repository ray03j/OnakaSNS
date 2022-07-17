interface Base {
  id: string;
  created_at: Date;
  updated_at: Date;
}

interface User {
  id: string;
  name: string;
  email: string;
  created_at: Date;
  updated_at: Date;
}

export interface Props {
  Base: Base;
  content: string;
  image_url: string;
  id: string;
  user: User;
  funny_users: Array<User>;
  yummy_users: Array<User>;
  created_at: string;
  updated_at: string;
}
