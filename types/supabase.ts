export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      bookmarks: {
        Row: {
          created_at: string;
          description: string | null;
          id: number;
          is_fav: boolean | null;
          metadata: Json | null;
          preview_image: boolean | null;
          title: string | null;
          updated_at: string;
          url: string;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          description?: string | null;
          id?: never;
          is_fav?: boolean | null;
          metadata?: Json | null;
          preview_image?: boolean | null;
          title?: string | null;
          updated_at?: string;
          url: string;
          user_id: string;
        };
        Update: {
          created_at?: string;
          description?: string | null;
          id?: never;
          is_fav?: boolean | null;
          metadata?: Json | null;
          preview_image?: boolean | null;
          title?: string | null;
          updated_at?: string;
          url?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'bookmarks_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
        ];
      };
      bookmarks_tags: {
        Row: {
          bookmark_id: number;
          tag_id: number;
          user_id: string;
        };
        Insert: {
          bookmark_id: number;
          tag_id: number;
          user_id: string;
        };
        Update: {
          bookmark_id?: number;
          tag_id?: number;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'bookmarks_tags_bookmark_id_fkey';
            columns: ['bookmark_id'];
            isOneToOne: false;
            referencedRelation: 'bookmarks';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'bookmarks_tags_tag_id_fkey';
            columns: ['tag_id'];
            isOneToOne: false;
            referencedRelation: 'tags';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'bookmarks_tags_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
        ];
      };
      tags: {
        Row: {
          created_at: string;
          id: number;
          name: string;
          shared: boolean | null;
          shared_hash: string | null;
          updated_at: string;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          id?: never;
          name: string;
          shared?: boolean | null;
          shared_hash?: string | null;
          updated_at?: string;
          user_id: string;
        };
        Update: {
          created_at?: string;
          id?: never;
          name?: string;
          shared?: boolean | null;
          shared_hash?: string | null;
          updated_at?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'tags_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
        ];
      };
      users: {
        Row: {
          avatar_url: string | null;
          billing_cycle_start_date: string;
          created_at: string | null;
          email: string | null;
          full_name: string | null;
          has_welcomed: boolean | null;
          id: string;
          order_info: Json | null;
          plan_status: string | null;
          preview_image: boolean | null;
          updated_at: string | null;
          upload_count: number;
          usage: Json | null;
        };
        Insert: {
          avatar_url?: string | null;
          billing_cycle_start_date?: string;
          created_at?: string | null;
          email?: string | null;
          full_name?: string | null;
          has_welcomed?: boolean | null;
          id: string;
          order_info?: Json | null;
          plan_status?: string | null;
          preview_image?: boolean | null;
          updated_at?: string | null;
          upload_count?: number;
          usage?: Json | null;
        };
        Update: {
          avatar_url?: string | null;
          billing_cycle_start_date?: string;
          created_at?: string | null;
          email?: string | null;
          full_name?: string | null;
          has_welcomed?: boolean | null;
          id?: string;
          order_info?: Json | null;
          plan_status?: string | null;
          preview_image?: boolean | null;
          updated_at?: string | null;
          upload_count?: number;
          usage?: Json | null;
        };
        Relationships: [
          {
            foreignKeyName: 'users_id_fkey';
            columns: ['id'];
            isOneToOne: true;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      increment_bookmarks_usage: {
        Args: {
          user_id: string;
          count: number;
        };
        Returns: undefined;
      };
      increment_favorites_usage: {
        Args: {
          user_id: string;
          count: number;
        };
        Returns: undefined;
      };
      increment_tags_usage: {
        Args: {
          user_id: string;
          count: number;
        };
        Returns: undefined;
      };
      increment_upload_count: {
        Args: {
          user_id: string;
        };
        Returns: undefined;
      };
      update_user_bookmarks_usage: {
        Args: {
          user_id: string;
          count: number;
        };
        Returns: undefined;
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database['public']['Tables'] & Database['public']['Views'])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions['schema']]['Tables'] &
        Database[PublicTableNameOrOptions['schema']]['Views'])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions['schema']]['Tables'] &
      Database[PublicTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database['public']['Tables'] &
        Database['public']['Views'])
    ? (Database['public']['Tables'] &
        Database['public']['Views'])[PublicTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database['public']['Tables']
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database['public']['Tables']
    ? Database['public']['Tables'][PublicTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database['public']['Tables']
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database['public']['Tables']
    ? Database['public']['Tables'][PublicTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database['public']['Enums']
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions['schema']]['Enums']
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions['schema']]['Enums'][EnumName]
  : PublicEnumNameOrOptions extends keyof Database['public']['Enums']
    ? Database['public']['Enums'][PublicEnumNameOrOptions]
    : never;
