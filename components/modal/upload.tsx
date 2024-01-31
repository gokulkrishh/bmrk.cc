'use client';

import { useRef, useState } from 'react';

import { DialogTitle } from '@radix-ui/react-dialog';
import { ArrowUp, ArrowUpCircle, File } from 'lucide-react';
import { toast } from 'sonner';

import Loader from 'components/loader';
import { Dialog, DialogContent } from 'components/ui/dialog';
import { Input } from 'components/ui/input';
import { Label } from 'components/ui/label';

import { cn } from 'lib/utils';

type UploadModalProps = {
  open: boolean;
  onHide: (open: boolean) => void;
};

export default function UploadModal({ open, onHide }: UploadModalProps) {
  const [loading, setLoading] = useState(false);
  const hiddenInputRef = useRef<HTMLInputElement>(null);

  const showToastError = () => toast.error('Error occurred, try again');

  const createBookmarks = async (content: string | ArrayBuffer | null) => {
    if (!content) {
      showToastError();
    }
    try {
      setLoading(true);
      // const res = await fetch('/api/bookmarks/create', {
      //   method: 'POST',
      //   body: JSON.stringify(content),
      // });
      // if (!res.ok) {
      //   throw new Error('Error occurred, try again');
      // }
      toast.success('Bookmarks are successfully created');
    } catch {
      showToastError();
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = ({ target }: { target: HTMLInputElement }) => {
    const files = target?.files ?? [];
    if (files && files.length) {
      const file = files[0];
      toast.info(`Reading your file, don't refresh the page.`);
      if (file) {
        try {
          const reader = new FileReader();
          reader.readAsText(file);
          reader.onload = async function () {
            const content = reader.result;
            await createBookmarks(content);
          };
        } catch {
          showToastError();
        }
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={(hide) => onHide(hide)}>
      <DialogContent className="sm:max-w-md py-2 px-3">
        <DialogTitle className="flex items-center font-medium gap-1.5 mt-1.5">
          <File className="w-4 h-4" /> Upload bookmarks
        </DialogTitle>
        <form>
          <div className="relative h-48 border border-neutral-400 border-dashed rounded-lg">
            <Input
              className="opacity-0"
              type="file"
              accept="*.html"
              ref={hiddenInputRef}
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
                className="text-neutral-500 w-9 h-9"
              />
              <p className="text-sm mt-2 font-medium">Click to upload</p>
              <p className="text-sm mt-1 text-neutral-500">
                Select HTML bookmark file
              </p>
            </button>
          </div>
          <div className="flex w-full justify-end mt-3 mb-1">
            <button
              type="submit"
              disabled={loading}
              className={cn(
                `rounded-full w-[70px] disabled:bg-blue-200 focus:outline-0 focus:bg-blue-700 active:bg-blue-700 border-0 text-sm flex justify-center py-2 px-6 text-white bg-blue-600 hover:bg-blue-700`,
                {
                  '!bg-blue-200 cursor-not-allowed': loading,
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
