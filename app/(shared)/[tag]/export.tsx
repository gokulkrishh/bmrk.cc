'use client';

import { Download } from 'lucide-react';

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
      className="items-center mr-3 h-[36px] tracking-wide disabled:opacity-70 disabled:cursor-not-allowed disabled:bg-accent disabled:border-border rounded-full text-primary border border-border focus:outline-0 active:bg-accent text-sm flex justify-center py-2 px-3 transition-colors bg-primary-foreground hover:bg-accent"
      disabled={data.length === 0}
      onClick={() => {
        exportAsHTML(
          data,
          `bookmarkit-bookmarks-${formatDate(new Date(), dateOptions)}`,
        );
      }}
    >
      <Download className="w-3.5 h-3.5 mr-2" /> Export
    </button>
  );
}
