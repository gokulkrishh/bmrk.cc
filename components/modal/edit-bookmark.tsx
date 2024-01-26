'use client';

import { useEffect, useState } from 'react';

import { isUrl } from 'check-valid-url';
import { toast } from 'sonner';

import { updateBookmark } from 'app/actions/bookmarks';
import { OgResponse, getOg } from 'app/actions/og';

import CardAvatar from 'components/card/avatar';
import { useMediaQuery } from 'components/hooks/useMediaQuery';
import Loader from 'components/loader';
import { Dialog, DialogContent, DialogTitle } from 'components/ui/dialog';
import { Drawer, DrawerContent, DrawerHeader } from 'components/ui/drawer';
import { Input } from 'components/ui/input';
import { Label } from 'components/ui/label';
import { Textarea } from 'components/ui/textarea';

import { cn } from 'lib/utils';

import { BookmarkModifiedType } from 'types/data';

type EditBookmarkProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  data: BookmarkModifiedType;
};

export default function EditBookmark({
  open,
  setOpen,
  data,
}: EditBookmarkProps) {
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState(data);
  const isDesktop = useMediaQuery('(min-width: 768px)');

  useEffect(() => {
    setState(data);
  }, [data]);

  const onSubmit = async () => {
    try {
      setLoading(true);
      const ogData: OgResponse = await getOg(state.url);
      const payload = {
        url: state.url,
        description: state.description,
        title: state.title,
        metadata: {
          ogImageUrl: ogData['og:image'] ?? '',
          twitterImageUrl: ogData['twitter:image'] ?? '',
        },
      } as BookmarkModifiedType;
      await updateBookmark(data.id, payload);
      toast.success(`Bookmark updated.`);
    } catch {
      toast.success(`Unable to update the bookmark, try again.`);
    } finally {
      setOpen(false);
      setLoading(false);
    }
  };

  const Form = () => (
    <form
      className="h-full flex flex-col gap-3"
      onSubmit={async (event) => {
        event.preventDefault();
        await onSubmit();
      }}
    >
      <div className="flex flex-col gap-1">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          type="text"
          placeholder="Netflix or Twitter"
          onChange={(event: any) => {
            setState((prev) => ({ ...prev, title: event.target.value }));
          }}
          value={state.title ?? ''}
          required
        />
      </div>

      <div className="flex flex-col gap-1">
        <Label htmlFor="Url" className="flex items-center gap-2">
          Url{' '}
          <CardAvatar
            className="!w-4 !h-4 rounded-full bg-white"
            url={state.url}
            title={state.title ?? ''}
          />
        </Label>
        <Input
          className="mt-1.5"
          id="Url"
          type="url"
          inputMode="url"
          pattern="https://.*|http://.*"
          maxLength={30}
          placeholder="https://google.com"
          required
          onChange={(event) => {
            setState((prev) => ({ ...prev, url: event.target.value }));
          }}
          value={state.url ?? ''}
        />
      </div>

      <div className="flex flex-col gap-1">
        <Label htmlFor="description">
          Description{' '}
          <span className="text-center text-sm font-normal text-neutral-500">
            (optional)
          </span>
        </Label>
        <Textarea
          onChange={(event: any) => {
            setState((prev) => ({
              ...prev,
              description: event.target.value,
            }));
          }}
          value={state.description ?? ''}
        />
      </div>
      <div className="flex mt-1 justify-end">
        <button
          type="submit"
          disabled={loading || !isUrl(state.url) || !state.title?.length}
          className={cn(
            `rounded-full w-[90px] disabled:bg-blue-200 focus:outline-0 focus:bg-blue-700 active:bg-blue-700 border-0 text-sm flex justify-center py-2 px-5 text-white bg-blue-600 hover:bg-blue-700`,
            {
              '!bg-blue-200 cursor-not-allowed': loading,
            }
          )}
        >
          {loading ? <Loader /> : 'Update'}
        </button>
      </div>
    </form>
  );

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={(hide) => setOpen(hide)}>
        <DialogContent className="sm:max-w-md py-4 px-5 max-sm:w-[calc(100%-30px)]">
          <DialogTitle className="text-lg font-medium">
            Edit Bookmark
          </DialogTitle>
        </DialogContent>
      </Dialog>
    );
  } else {
    return (
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerContent className="px-4 pb-4">
          <DrawerHeader className="text-left px-0 font-medium">
            Edit Bookmark
          </DrawerHeader>
          <Form />
        </DrawerContent>
      </Drawer>
    );
  }
}
