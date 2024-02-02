'use client';

import { useState } from 'react';

import { toast } from 'sonner';

import { useAuth } from 'components/context/auth';
import Loader from 'components/loader';

import { exportBookmarksToHTML } from 'lib/bookmarks';
import createSupabaseBrowserClient from 'lib/supabase/client';

import { BookmarkModified } from 'types/data';

import SettingsCard from './settings-card';

export default function ExportBookmarks() {
  const [loading, setLoading] = useState(false);
  const supabase = createSupabaseBrowserClient();
  const { user } = useAuth();

  const fetchBookmarksToExport = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('bookmarks')
        .select(`*, bookmarks_tags (tags!inner (id,name))`)
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false })
        .returns<BookmarkModified[]>();

      if (error) {
        throw new Error('Unable to fetch bookmarks, try again.');
      }
      exportBookmarksToHTML(
        data,
        `bookmarkit-bookmarks-${new Date().getTime()}`,
      );
      toast.info('Your bookmarks will be exported shortly.');
    } catch (errr) {
      toast.error('Unable to export bookmarks, try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SettingsCard className="">
      <div className="flex items-center justify-between w-full">
        <div>
          <h3 className="font-medium">Export Bookmarks</h3>
          <div className="text-sm mt-1 max-w-[350px] text-neutral-600">
            Instantly export your bookmarks as an HTML file to import into other
            web browsers.
          </div>
        </div>
        <button
          className="items-center tracking-wide rounded-full focus:outline-0 focus:bg-neutral-800/70 active:bg-neutral-800/70 border-0 text-sm flex justify-center py-2 px-4 text-white bg-neutral-700 hover:bg-neutral-800/70"
          onClick={() => {
            fetchBookmarksToExport();
          }}
        >
          {loading ? <Loader /> : 'Export'}
        </button>
      </div>
    </SettingsCard>
  );
}
