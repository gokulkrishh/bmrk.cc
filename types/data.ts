import { Database } from './database';

export type Bookmark = Database['public']['Tables']['bookmarks']['Row'];
export type BookmarkInsert =
  Database['public']['Tables']['bookmarks']['Insert'];
export type BookmarkUpdate =
  Database['public']['Tables']['bookmarks']['Update'];
export type BookmarkModified = Bookmark & {
  metadata: {
    image: string;
  };
  bookmarks_tags: { tags: { id: Tag['id']; name: Tag['name'] } }[];
};
export type BookmarkInsertModified = BookmarkInsert & {
  metadata: {
    image: string;
  };
};

export type MetaTags = {
  title: string;
  description: string;
  image: string;
};

export type User = Database['public']['Tables']['users']['Row'];
export type Tag = Database['public']['Tables']['tags']['Row'];
export type TagInsert = Database['public']['Tables']['tags']['Insert'];
export type TagUpdate = Database['public']['Tables']['tags']['Update'];
