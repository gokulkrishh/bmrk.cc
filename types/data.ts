import { Database } from './database';

export type Bookmark = Database['public']['Tables']['bookmarks']['Row'];
export type BookmarkInsert =
  Database['public']['Tables']['bookmarks']['Insert'];
export type BookmarkUpdate =
  Database['public']['Tables']['bookmarks']['Update'];
export type BookmarkModifiedType = Bookmark & {
  metadata: {
    imageUrl: string;
    twitterImageUrl: string;
    ogImageUrl: string;
  };
  bookmarks_tags: Tag['id'][];
};
export type BookmarkInsertModified = BookmarkInsert & {
  metadata: {
    imageUrl: string;
    twitterImageUrl: string;
    ogImageUrl: string;
  };
};

export type User = Database['public']['Tables']['users']['Row'];

export type Tag = Database['public']['Tables']['tags']['Row'];
export type TagInsert = Database['public']['Tables']['tags']['Insert'];
export type TagUpdate = Database['public']['Tables']['tags']['Update'];
