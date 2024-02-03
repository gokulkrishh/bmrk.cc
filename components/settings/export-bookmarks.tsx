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
    <SettingsCard className="flex flex-col p-0 items-start">
      <div className="flex flex-col p-3.5 pt-3 pb-0 w-full">
        <div>
          <h3 className="font-medium">Export Bookmarks</h3>
          <div className="text-sm mt-1 text-neutral-600">
            Instantly export your bookmarks as an HTML file to import into web
            browsers.
          </div>
        </div>
      </div>
      <div className="flex w-full justify-end border-t bg-neutral-50 border-neutral-300 rounded-bl-md rounded-br-md p-1.5 px-4">
        <button
          className="justify-center items-center tracking-wide rounded-lg focus:outline-0 focus:bg-neutral-700 active:bg-neutral-700 border-0 text-sm flex py-2 h-[34px] px-3 text-white bg-neutral-900 hover:bg-neutral-700"
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
