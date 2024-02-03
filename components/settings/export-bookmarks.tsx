'use client';

import { useState } from 'react';

import { FileDown } from 'lucide-react';
import { toast } from 'sonner';

import { useAuth } from 'components/context/auth';
import Loader from 'components/loader';

import { exportBookmarksToHTML } from 'lib/bookmarks';
import createClient from 'lib/supabase/client';

import { BookmarkModified } from 'types/data';

import SettingsCard from './settings-card';

export default function ExportBookmarks() {
  const [loading, setLoading] = useState(false);
  const supabase = createClient();
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
      <div className="flex w-full justify-end border-t bg-neutral-50 border-neutral-300 rounded-bl-md rounded-br-md p-1.5 px-3.5">
        <button
          className="items-center tracking-wide rounded-full text-white border border-neutral-900 focus:outline-0 focus:bg-neutral-900/80 active:bg-neutral-900/80 text-sm flex justify-center py-2 h-[36px] px-3  bg-neutral-900 hover:bg-neutral-900/80"
          onClick={() => {
            fetchBookmarksToExport();
          }}
        >
          {loading ? (
            <Loader />
          ) : (
            <>
              <FileDown className="w-3.5 h-3.5 mr-1.5" /> Export
            </>
          )}
        </button>
      </div>
    </SettingsCard>
  );
}
