'use client';

import { SyntheticEvent, useRef, useState } from 'react';

import { useRouter } from 'next/navigation';

import { QuestionMarkCircledIcon } from '@radix-ui/react-icons';
import { messages, plans } from 'config';
import { ArrowUpCircle } from 'lucide-react';
import { toast } from 'sonner';

import { useUser } from 'components/context/user';
import FeatureToolip from 'components/features/feature-tooltip';
import Loader from 'components/loader';
import PlanTooltip from 'components/settings/plan-tooltip';
import { Input } from 'components/ui/input';
import { Tooltip, TooltipContent, TooltipTrigger } from 'components/ui/tooltip';

import { checkBookmarkLimit, isProPlanExpired } from 'lib/data';
import { cn, getBrowserName } from 'lib/utils';

type UploadModalProps = {
  onHide?: (open: boolean) => void;
  SubmitBtn?: React.FC<{ children: React.ReactNode; disabled: boolean }>;
};

const helpLinks: { [key: string]: string } = {
  chrome: 'https://support.google.com/chrome/answer/96816?hl=en',
  safari:
    'https://www.idownloadblog.com/2016/10/17/exporting-safari-bookmarks-from-iphone-ipad-mac-pc/',
  firefox:
    'https://support.mozilla.org/en-US/kb/export-firefox-bookmarks-to-backup-or-transfer',
};

export default function UploadForm({ onHide, SubmitBtn }: UploadModalProps) {
  const { user, currentPlan, isProPlan } = useUser();
  const [loading, setLoading] = useState(false);
  const [fileDetails, setFileDetails] = useState({ name: '', size: 0 });
  const hiddenInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const createBookmarks = async (content: string | ArrayBuffer | null) => {
    if (!content) {
      toast.error('Error occurred, try again');
    }
    try {
      const res = await fetch('/api/bookmarks', {
        method: 'POST',
        body: JSON.stringify({ content }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data?.message);
      }
      onHide?.(false);
      toast.success('Bookmarks created successfully.');
      if (SubmitBtn) {
        router.replace('/');
      } else {
        router.refresh();
      }
    } catch (error) {
      toast.error((error as Error)?.message, {
        duration: 5000,
      });
    } finally {
      setLoading(false);
    }
  };

  const onFileChange = ({ target }: { target: HTMLInputElement }) => {
    const files = target?.files ?? [];
    if (files && files.length) {
      const file = files[0];
      if (file) {
        setFileDetails({ name: file.name, size: file.size });
      }
    }
  };

  const onSubmit = () => {
    try {
      const files = hiddenInputRef.current?.files ?? [];
      if (files && files.length && isFileAllowed) {
        const file = files[0];
        if (file) {
          if (checkBookmarkLimit(user, [])) {
            toast.error(
              `Bookmark limit reached! ${isProPlan ? '' : 'Upgrade to pro plan.'}`,
            );
            return;
          }
          toast.info(`Don't refresh this page.`, {
            duration: 5000,
          });
          setLoading(true);
          const reader = new FileReader();
          reader.readAsText(file);
          reader.onload = async function () {
            const content = reader.result;
            await createBookmarks(content);
          };
        }
      }
    } catch {
      toast.error('Error occurred, try again');
    }
  };

  const allowedSize = 200;
  const fileSize = Math.ceil(fileDetails.size / 1024);
  const isFileAllowed = fileSize <= allowedSize;

  return (
    <form
      className="flex flex-col w-full"
      onSubmit={(event: SyntheticEvent<HTMLFormElement>) => {
        event.preventDefault();
        onSubmit();
      }}
    >
      <div className="relative h-56 border border-neutral-300 dark:border-neutral-600 border-dashed rounded-lg">
        <button
          className="absolute top-0 left-0 w-full h-full bg-transparent z-0 cursor-pointer focus:outline-none"
          type="button"
          onClick={() => {
            hiddenInputRef.current?.click();
          }}
        />
        <Input
          className="opacity-0"
          type="file"
          accept=".html"
          ref={hiddenInputRef}
          onChange={onFileChange}
        />
        <div className="flex w-full justify-center flex-col items-center">
          <ArrowUpCircle strokeWidth={1} className="w-10 h-10" />
          <p className="text-sm mt-2 font-medium">Click to browse</p>
        </div>
        <div className="text-sm flex flex-col mt-2 text-muted-foreground text-center">
          {fileDetails.name?.length ? (
            <>
              <span className="text-primary">{fileDetails.name}</span>
              <span className="text-xs mt-1.5 text-muted-foreground">
                File Size:{' '}
                <span
                  className={cn(`font-medium`, {
                    'text-red-600': !isFileAllowed,
                  })}
                >
                  {!isFileAllowed ? 'Greater than 500 KB' : fileSize + ' KB'}
                </span>
              </span>
            </>
          ) : (
            <>
              <p className="relative">
                {' '}
                Export your bookmarks from your browser{' '}
                <Tooltip>
                  <TooltipTrigger
                    className="z-11 absolute -top-0.5 ml-1"
                    onClick={(event) => {
                      event.stopPropagation();
                      const name = getBrowserName();
                      const link = helpLinks[name] ?? helpLinks['chrome'];
                      window.open(link, '_blank');
                    }}
                  >
                    <QuestionMarkCircledIcon className="w-3.5 h-3.5" />
                  </TooltipTrigger>
                  <TooltipContent className="text-white dark:text-black">
                    Click to know how?
                  </TooltipContent>
                </Tooltip>
              </p>
              <span className="text-xs mt-2 text-muted-foreground">
                Max File Size: <span className="font-medium">500 KB</span>
              </span>
            </>
          )}
          {user.upload_count < currentPlan.limit.imports ? (
            <p className="text-xs mt-4">
              Unlimited bookmarks import:{' '}
              <span className="text-green-500 relative inline-flex">
                {Math.abs(currentPlan.limit.imports - user.upload_count)} time
                {currentPlan.limit.imports > 1 ? 's' : ''} available
                <PlanTooltip
                  className="relative -top-1 -left-1"
                  text={messages.importLimitWarning(currentPlan.limit.imports)}
                />
              </span>
            </p>
          ) : null}
        </div>
      </div>
      {!SubmitBtn ? (
        <div className="flex w-full justify-end mt-3 mb-1">
          <button
            type="submit"
            disabled={loading || !fileDetails.name?.length || !isFileAllowed}
            className={cn(
              `rounded-full w-[86px] h-[40px] transition-colors items-center bg-blue-600 hover:bg-blue-700 focus:bg-blue-700 active:bg-blue-700 disabled:opacity-40 disabled:active:bg-blue-600 disabled:hover:bg-blue-600 disabled:focus:bg-blue-600 border-0 flex justify-center py-2 px-4 text-white`,
              {
                '!opacity-50 cursor-not-allowed': loading,
              },
            )}
          >
            {loading ? <Loader /> : 'Submit'}
          </button>
        </div>
      ) : (
        <div className="flex w-full justify-center">
          <SubmitBtn
            disabled={loading || !fileDetails.name?.length || !isFileAllowed}
          >
            {loading ? (
              <>
                <Loader className="mr-2" /> Submit
              </>
            ) : (
              'Submit'
            )}
          </SubmitBtn>
        </div>
      )}
    </form>
  );
}
