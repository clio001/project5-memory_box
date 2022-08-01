declare namespace dbModel {
  interface User {
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
    title: string;
    description?: string;
    year?: string;
    user_id: string;
    createdBy: string;
    location?: string;
    type?: string;
    file_url: string;
    comments?: string;
    bookmarks?: string;
    likes?: string;
    share: boolean;
  }

  interface Comment {
    author: string;
    body: string;
    item_id: string;
    user_id: string;
    likes?: string;
  }

  interface Like {}

  interface Bookmark {}

  interface Group {}
}
