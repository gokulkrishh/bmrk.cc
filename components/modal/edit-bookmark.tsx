'use client';

import { SyntheticEvent, useEffect, useState } from 'react';

import { toast } from 'sonner';

import { updateBookmark } from 'app/actions/bookmarks';

import CardFavicon from 'components/card/avatar';
import { useMediaQuery } from 'components/hooks/useMediaQuery';
import Loader from 'components/loader';
import { Dialog, DialogContent, DialogTitle } from 'components/ui/dialog';
import { Drawer, DrawerContent, DrawerHeader } from 'components/ui/drawer';
import { Input } from 'components/ui/input';
import { Label } from 'components/ui/label';
import { Textarea } from 'components/ui/textarea';

import { refreshInChromeExt } from 'lib/chrome-extension';
import { cn, isValidUrl } from 'lib/utils';

import { BookmarkModified } from 'types/data';

type EditBookmarkProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  data: BookmarkModified;
  onDone?: () => void;
};

export default function EditBookmark({
  open,
  setOpen,
  data,
  onDone,
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
      const payload = {
        url: state.url,
        title: state.title?.trim(),
        description: state.description?.trim(),
        metadata: state.metadata,
      } as BookmarkModified;
      await updateBookmark(data.id, payload);
      onDone?.();
      refreshInChromeExt();
      toast.success(`Bookmark updated.`);
    } catch (error) {
      toast.error(`Unable to update the bookmark, try again.`);
    } finally {
      setOpen(false);
      setLoading(false);
    }
  };

  const isEdited = () => {
    return (
      state.url !== data.url ||
      state.title !== data.title ||
      state.description !== data.description
    );
  };

  const Form = () => (
    <form
      className="h-full flex flex-col gap-3"
      onSubmit={async (event: SyntheticEvent<HTMLFormElement>) => {
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
          <CardFavicon
            className="bg-background"
            url={state.url}
            title={state.url ?? ''}
          />
        </Label>
        <Input
          className="mt-1.5"
          id="Url"
          type="url"
          inputMode="url"
          pattern="https://.*|http://.*"
          placeholder="https://x.com"
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
          <span className="text-center text-sm font-normal text-muted-foreground">
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
          disabled={
            loading ||
            !isValidUrl(state.url) ||
            !state.title?.length ||
            !isEdited()
          }
          className={cn(
            `rounded-full w-[88px] h-[40px] transition-colors font-medium items-center bg-blue-600 hover:bg-blue-700 focus:bg-blue-700 active:bg-blue-700 disabled:opacity-40 disabled:active:bg-blue-600 disabled:hover:bg-blue-600 disabled:focus:bg-blue-600 border-0 flex justify-center py-2 px-4 text-white`,
            {
              '!opacity-50 cursor-not-allowed': loading,
            },
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
          {Form()}
        </DialogContent>
      </Dialog>
    );
  } else {
    return (
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerContent className="px-4 pb-6">
          <DrawerHeader className="text-left pt-2 px-0 font-medium">
            Edit Bookmark
          </DrawerHeader>
          {Form()}
        </DrawerContent>
      </Drawer>
    );
  }
}
