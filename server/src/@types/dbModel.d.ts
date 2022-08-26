declare namespace dbModel {
  interface User {
    id?: string;
    firstName?: string;
    lastName?: string;
    email: string;
    password: string;
    avatar_url?: string;
    banner_url?: string;
    role?: string;
    comments?: string;
    bookmarks?: string;
    likes?: string;
    items?: string;
    groups?: string;
    following?: string;
    location?: string;
  }

  interface Item {
    id?: string;
    title: string;
    description?: string;
    year?: string;
    user_id: string;
    createdBy: string;
    location?: {
      latitude: any;
      longitude: any;
    };
    type?: string;
    file_url: string;
    comments?: string;
    bookmarks?: string;
    likes?: string;
    share: boolean;
    groups?: string;
  }

  interface Comment {
    id?: string;
    author?: string;
    body: string;
    item_id: string;
    user_id: string;
    likes?: string;
  }

  interface Like {
    comment_id: string;
    user_id: string;
    author?: string;
  }

  interface Bookmark {
    item_id: string;
    user_id: string;
    author?: string;
  }

  interface Group {
    name: string;
    description?: string;
    createdBy: string;
    avatar_url?: string;
    banner_url?: string;
    members?: string;
    items?: string;
    location?: string;
    public?: boolean;
  }
}
