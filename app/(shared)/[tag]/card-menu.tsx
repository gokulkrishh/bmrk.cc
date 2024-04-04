'use client';

import { toast } from 'sonner';

import { LinkIcon, MoreIcon, ShareIcon } from 'components/icons';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from 'components/ui/dropdown-menu';

import { cn } from 'lib/utils';

import { BookmarkModified } from 'types/data';

type CardMenuProps = {
  data: BookmarkModified;
  className?: string;
};

export default function CardMenu({ data, className }: CardMenuProps) {
  const { url } = data;

  const siteUrl = new URL(url);
  siteUrl.searchParams.append('utm_source', 'bmrk.cc');

  const share = async () => {
    try {
      const shareData = {
        text: data.description ?? '',
        title: data.title ?? '',
        url: siteUrl.href,
      };
      await navigator?.share(shareData);
    } catch (error) {
      console.log('Sharing failed!', error);
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger
          aria-label="Menu"
          className={cn(
            `cursor-pointer h-9 w-9 mt-1 flex items-center justify-center transition-colors rounded-full hover:bg-accent hover:border hover:border-input active:bg-accent shrink-0`,
            className,
          )}
        >
          <MoreIcon className="fill-muted-foreground !h-4 !w-4" />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="mr-2 max-sm:min-w-44 min-w-40">
          <DropdownMenuItem
            onClick={() => {
              navigator.clipboard.writeText(url);
              toast.success('Link copied to clipboard.');
            }}
          >
            <LinkIcon className="h-4 w-4 mr-2" /> Copy link
          </DropdownMenuItem>
          {typeof window !== 'undefined' && navigator && !!navigator?.share ? (
            <DropdownMenuItem
              onClick={async () => {
                await share();
              }}
            >
              <ShareIcon className="h-4 w-4 mr-2" /> Share
            </DropdownMenuItem>
          ) : null}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
