'use client';

import { ClipboardEvent, SyntheticEvent, useState } from 'react';

import { toast } from 'sonner';

import { createBookmark } from 'app/actions/bookmarks';
import { getOg } from 'app/actions/og';
import { incrementBookmarkUsage } from 'app/actions/user';

import { useUser } from 'components/context/user';
import { UploadIcon } from 'components/icons';
import Loader from 'components/loader';
import UploadModal from 'components/modal/upload';
import { Input } from 'components/ui/input';
import { Tooltip, TooltipContent, TooltipTrigger } from 'components/ui/tooltip';

import { refreshInChromeExt } from 'lib/chrome-extension';
import { cn, isValidUrl } from 'lib/utils';

import { MetaTags } from 'types/data';

type AddBookmarkInputProps = {
  className?: string;
  btnClassname?: string;
  onHide?: () => void;
  isInModal?: boolean;
};

export default function AddBookmarkInput({
  className,
  btnClassname = '',
  onHide,
  isInModal = false,
}: AddBookmarkInputProps) {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const { user, currentPlan, isProPlan } = useUser();
  const hasUsageLimitedReached =
    user?.usage.bookmarks >= currentPlan.limit.bookmarks;

  const onSubmit = async (inputUrl: string) => {
    try {
      if (hasUsageLimitedReached) {
        toast.error(
          `Bookmark limit reached! ${isProPlan ? '' : 'Upgrade to pro plan.'}`,
        );
        return;
      }
      setLoading(true);
      const ogData: MetaTags = await getOg(inputUrl);
      const payload: any = {
        url: inputUrl,
        description: ogData.description?.trim(),
        title: ogData.title?.trim(),
        metadata: {
          is_fallback: ogData.is_fallback,
          image: ogData.image,
        },
      };
      await incrementBookmarkUsage();
      await createBookmark(payload);
      toast.success(`Bookmark added.`);
      refreshInChromeExt();
      setUrl('');
    } catch (error) {
      toast.error(`Unable to add bookmark, try again.`);
    } finally {
      if (!hasUsageLimitedReached) {
        setLoading(false);
        onHide?.();
      }
    }
  };

  const onPaste = async (event: ClipboardEvent<HTMLInputElement>) => {
    const pastedText = event.clipboardData?.getData('text');
    if (isValidUrl(pastedText)) {
      await onSubmit(pastedText);
    }
  };

  return (
    <div
      className={cn(
        'h-26 flex flex-col px-1 sm:border-border sm:border-r border-b',
        className,
      )}
    >
      <form
        className="h-full"
        onSubmit={async (event: SyntheticEvent<HTMLFormElement>) => {
          event.preventDefault();
          await onSubmit(url);
        }}
      >
        <div className="flex flex-col items-center justify-center w-full">
          <Input
            className={cn(
              `bg-transparent focus-visible:ring-0 mt-0 w-full pt-0 px-1 pb-1 !outline-none !focus:outline-none !focus:border-none !border-none !shadow-none placeholder:text-stone-500 text-lg font-normal`,
              {
                'mt-1.5': !isInModal,
              },
            )}
            autoComplete="off"
            inputMode="text"
            type="url"
            pattern="https://.*|http://.*"
            placeholder="Just paste or type url."
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setUrl(event.target.value);
            }}
            onPaste={onPaste}
            value={url}
            data-1p-ignore
          />
        </div>
        <div className={`flex mb-3 justify-between`}>
          <Tooltip delayDuration={500}>
            <TooltipTrigger
              onClick={(event) => {
                event.preventDefault();
                event.stopPropagation();
                setOpen(true);
              }}
              className="w-8 h-8 group border border-transparent transition-colors duration-200 rounded-full hover:bg-blue-800/20 dark:hover:bg-blue-800/30 active:bg-blue-800/20 dark:active:bg-blue-800/30 dark:hover:border-blue-800/30 hover:border-blue-800/20  -left-1.5 relative top-3 inline-flex items-center justify-center "
            >
              <UploadIcon className="w-4 h-4 transition-colors duration-200 text-blue-500 group-hover:text-blue-600 group-active:text-blue-600" />
            </TooltipTrigger>
            <TooltipContent
              side="bottom"
              className="flex items-center mt-1 text-white dark:text-black"
            >
              Upload your bookmarks
            </TooltipContent>
          </Tooltip>

          <button
            type="submit"
            disabled={loading || !isValidUrl(url)}
            className={cn(
              `rounded-full w-[72px] h-[40px] transition-colors items-center bg-blue-600 hover:bg-blue-700 focus:bg-blue-700 active:bg-blue-700 disabled:opacity-50 disabled:active:bg-blue-600 disabled:hover:bg-blue-600 disabled:focus:bg-blue-600 border-0 flex justify-center py-2 px-5 text-white`,
            )}
          >
            {loading ? <Loader /> : 'Add'}
          </button>
        </div>
      </form>

      {open ? <UploadModal open={open} onHide={setOpen} /> : null}
    </div>
  );
}
