'use client';

import { useState } from 'react';

import { isUrl } from 'check-valid-url';
import { toast } from 'sonner';

import { createBookmark } from 'app/actions/bookmarks';
import { OgResponse, getOg } from 'app/actions/og';

import Loader from 'components/loader';

import { cn } from 'lib/utils';

import { BookmarkInsertModified } from 'types/data';

export default function AddBookmarkInput({
  className,
  btnClassname = '',
  onDone,
}: {
  className?: string;
  btnClassname?: string;
  onDone?: () => void;
}) {
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
      onDone?.();
    }
  };

  return (
    <div
      className={cn(
        'h-24 flex flex-col px-1 border-neutral-200 border-r border-b',
        className
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
              `mt-4 bg-transparent w-full px-2 pb-1 border-none outline-none placeholder:text-stone-500 text-lg font-normal`
            )}
            type="url"
            pattern="https://.*|http://.*"
            placeholder="Just paste or type here."
            onChange={(event: any) => {
              setUrl(event.target.value);
            }}
            value={url}
            autoFocus
          />
        </div>
        <div className={cn(`flex mb-3 justify-end`, btnClassname)}>
          <button
            type="submit"
            disabled={loading || !isUrl(url)}
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
