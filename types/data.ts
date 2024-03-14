import { Database } from './supabase';

export type Bookmark = Database['public']['Tables']['bookmarks']['Row'];
export type BookmarkInsert =
  Database['public']['Tables']['bookmarks']['Insert'];
export type BookmarkUpdate =
  Database['public']['Tables']['bookmarks']['Update'];
export type BookmarkModified = Bookmark & {
  metadata: {
    image: string;
    is_fallback?: boolean;
    is_via_extension?: boolean;
  };
  bookmarks_tags: { tags: { id: Tag['id']; name: Tag['name'] } }[];
};
export type BookmarkInsertModified = BookmarkInsert & {
  user_id?: string;
  metadata: {
    image: string;
  };
};

export type MetaTags = {
  title: string;
  description: string;
  image: string;
  is_fallback: boolean;
};

export type UserModified = User & {
  usage: {
    tags: number;
    bookmarks: number;
    favorites: number;
  };
  order_info: {
    identifier: string;
    store_id: string;
    number: string;
    status: string;
  };
};

export type PlanDetailsType = {
  type: string;
  name: string;
  limit: {
    bookmarks: number;
    tags: number;
    favorites: number;
    sessions: number;
    imports: number;
    share: number;
  };
  pricing: {
    monthly: number;
    yearly: number;
  };
};

export type PlansType = {
  free: PlanDetailsType;
  pro: PlanDetailsType;
};

export type PaymentType = 'monthly' | 'yearly';

export type User = Database['public']['Tables']['users']['Row'];
export type Tag = Database['public']['Tables']['tags']['Row'];
export type TagInsert = Database['public']['Tables']['tags']['Insert'];
export type TagUpdate = Database['public']['Tables']['tags']['Update'];
