'use client';

import { ExportIcon } from 'components/icons';

import { exportAsHTML } from 'lib/bookmarks';
import { formatDate } from 'lib/date';

import { BookmarkModified } from 'types/data';

const dateOptions = {
  day: 'numeric',
  month: 'numeric',
  year: 'numeric',
} as Intl.DateTimeFormatOptions;

export default function ExportButton({
  data,
}: {
  data: BookmarkModified[] | undefined;
}) {
  if (!data?.length) {
    return null;
  }

  return (
    <button
      className="rounded-full transition-all flex px-4 w-fit items-center justify-center mr-2 tracking-wide disabled:opacity-70 disabled:cursor-not-allowed disabled:bg-accent disabled:border-border text-primary border border-transparent focus:outline-0 text-sm py-2 hover:border-border active:border-border hover:bg-accent/60 active:bg-accent/60"
      disabled={data.length === 0}
      onClick={() => {
        exportAsHTML(
          data,
          `bookmarkit-bookmarks-${formatDate(new Date(), dateOptions)}`,
        );
      }}
    >
      Export
    </button>
  );
}
