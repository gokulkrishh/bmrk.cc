'use client';

import { SyntheticEvent, useRef, useState } from 'react';

import { useRouter } from 'next/navigation';

import { FileIcon, QuestionMarkCircledIcon } from '@radix-ui/react-icons';
import { ArrowUpCircle } from 'lucide-react';
import { toast } from 'sonner';

import Loader from 'components/loader';
import { Dialog, DialogContent, DialogTitle } from 'components/ui/dialog';
import { Input } from 'components/ui/input';
import { Tooltip, TooltipContent, TooltipTrigger } from 'components/ui/tooltip';

import { cn, getBrowserName } from 'lib/utils';

type UploadModalProps = {
  open: boolean;
  onHide: (open: boolean) => void;
};

const helpLinks: { [key: string]: string } = {
  chrome: 'https://support.google.com/chrome/answer/96816?hl=en',
  safari:
    'https://www.idownloadblog.com/2016/10/17/exporting-safari-bookmarks-from-iphone-ipad-mac-pc/',
  firefox:
    'https://support.mozilla.org/en-US/kb/export-firefox-bookmarks-to-backup-or-transfer',
};

export default function UploadModal({ open, onHide }: UploadModalProps) {
  const [loading, setLoading] = useState(false);
  const [fileName, setFileName] = useState('');
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
      onHide(false);
      toast.success('Bookmarks are successfully created');
      router.refresh();
    } catch (error: any) {
      toast.error(error?.message);
    } finally {
      setLoading(false);
    }
  };

  const onFileChange = ({ target }: { target: HTMLInputElement }) => {
    const files = target?.files ?? [];
    if (files && files.length) {
      const file = files[0];
      if (file) {
        setFileName(file.name);
      }
    }
  };

  const onSubmit = () => {
    try {
      const files = hiddenInputRef.current?.files ?? [];
      if (files && files.length) {
        const file = files[0];
        if (file) {
          toast.info(`Don't refresh this page.`, {
            duration: 6000,
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

  return (
    <Dialog open={open} onOpenChange={(hide) => onHide(hide)}>
      <DialogContent className="sm:max-w-md py-2 px-3 max-w-[calc(100%-6px)]">
        <DialogTitle className="flex items-center font-medium gap-1.5 mt-1.5">
          <svg
            className="w-5 h-5"
            width="44"
            height="44"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M14 3v4a1 1 0 0 0 1 1h4" />
            <path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z" />
            <path d="M12 11v6" />
            <path d="M9.5 13.5l2.5 -2.5l2.5 2.5" />
          </svg>{' '}
          Upload bookmarks
        </DialogTitle>
        <form
          onSubmit={(event: SyntheticEvent<HTMLFormElement>) => {
            event.preventDefault();
            onSubmit();
          }}
        >
          <div className="relative h-48 border border-border border-dashed rounded-lg">
            <Input
              className="opacity-0"
              type="file"
              accept=".html"
              ref={hiddenInputRef}
              onChange={onFileChange}
            />
            <button
              type="button"
              onClick={() => {
                hiddenInputRef.current?.click();
              }}
              className="flex w-full justify-center flex-col items-center"
            >
              <ArrowUpCircle
                strokeWidth={1}
                className="text-muted-foreground w-10 h-10"
              />
              <p className="text-sm mt-2 font-medium">Click to select</p>
            </button>
            <div className="text-sm mt-1 text-muted-foreground text-center">
              {fileName.length ? (
                fileName
              ) : (
                <>
                  Select exported HTML bookmark file{' '}
                  <Tooltip>
                    <TooltipTrigger
                      onClick={(event) => {
                        event.stopPropagation();
                        let name = getBrowserName();
                        const link = helpLinks[name] ?? helpLinks['chrome'];
                        window.open(link, '_blank');
                      }}
                    >
                      <QuestionMarkCircledIcon className="w-3.5 relative -top-0.5 h-3.5 text-blue-700 " />
                    </TooltipTrigger>
                    <TooltipContent className="text-white dark:text-black">
                      Know how to export bookmarks in web browsers.
                    </TooltipContent>
                  </Tooltip>
                </>
              )}
            </div>
          </div>
          <div className="flex w-full justify-end mt-3 mb-1">
            <button
              type="submit"
              disabled={loading || !fileName.length}
              className={cn(
                `rounded-full h-[40px] transition-colors font-medium items-center bg-blue-600 hover:bg-blue-700 focus:bg-blue-700 active:bg-blue-700 disabled:opacity-40 disabled:active:bg-blue-600 disabled:hover:bg-blue-600 disabled:focus:bg-blue-600 border-0 flex justify-center py-2 px-5 text-white`,
                {
                  '!opacity-50 cursor-not-allowed': loading,
                },
              )}
            >
              {loading ? <Loader /> : 'Submit'}
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
