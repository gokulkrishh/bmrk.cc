'use client';

import { useState } from 'react';

import { createBookmark } from 'app/actions/bookmarks';
import { OgResponse, getOg } from 'app/actions/og';
import { toast } from 'sonner';
import { BookmarkInsertModified } from 'types/data';

import Loader from 'components/loader';

import { cn, isValidUrl } from 'lib/utils';

export default function AddBookmarkInput() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const onSubmit = async () => {
    setLoading(true);
    try {
      const ogData: OgResponse = await getOg(url);
      const payload = {
        url,
        description: ogData.description,
        title: ogData.title,
        metadata: {
          ogImageUrl: ogData['og:image'] ?? '',
          twitterImageUrl: ogData['twitter:image'] ?? '',
        },
      } as BookmarkInsertModified;
      await createBookmark(payload);
      toast.success(`Bookmark added.`);
      setUrl('');
    } catch (error) {
      toast.error(`Unable to add bookmark, try again.`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={cn(
        'h-24 flex flex-col px-1 border-neutral-200 border-r border-b'
      )}
    >
      <form
        className="h-full"
        onSubmit={async (event) => {
          event.preventDefault();
          await onSubmit();
        }}
      >
        <div className="flex flex-col items-center justify-center w-full">
          <input
            className={cn(
              `mt-4 bg-transparent w-full px-2 border-none outline-none placeholder:text-stone-500 text-lg font-normal`
            )}
            type="url"
            pattern="https?://.+"
            placeholder="Just paste or type here."
            onChange={(event: any) => {
              setUrl(event.target.value);
            }}
            value={url}
          />
        </div>
        <div className="flex px-2 mb-3 justify-end">
          <button
            type="submit"
            disabled={loading || isValidUrl(url) === false}
            className={cn(
              `rounded-full w-[70px] disabled:bg-blue-200 focus:outline-0 focus:bg-blue-700 active:bg-blue-700 border-0 text-sm flex justify-center py-2 px-5 text-white bg-blue-600 hover:bg-blue-700`,
              {
                '!bg-blue-200 cursor-not-allowed': loading,
              }
            )}
          >
            {loading ? <Loader /> : 'Add'}
          </button>
        </div>
      </form>
    </div>
  );
}
