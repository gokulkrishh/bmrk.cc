'use client';

import { useEffect, useState } from 'react';

import { toast } from 'sonner';

import { updateTag } from 'app/actions/tags';

import { useMediaQuery } from 'components/hooks/useMediaQuery';
import Loader from 'components/loader';
import { Dialog, DialogContent, DialogTitle } from 'components/ui/dialog';
import { Drawer, DrawerContent, DrawerHeader } from 'components/ui/drawer';
import { Input } from 'components/ui/input';
import { Label } from 'components/ui/label';

import { cn } from 'lib/utils';

import { Tag } from 'types/data';

type EditTag = {
  open: boolean;
  setOpen: (open: boolean) => void;
  id: Tag['id'];
  name: Tag['name'];
};

export default function EditBookmark({ open, setOpen, id, name }: EditTag) {
  const [loading, setLoading] = useState(false);
  const [tagName, setTagName] = useState(name);
  const isDesktop = useMediaQuery('(min-width: 768px)');

  useEffect(() => {
    setTagName(name);
  }, [name]);

  const onSubmit = async () => {
    try {
      setLoading(true);
      await updateTag(id, tagName);
      toast.success(`Tag updated.`);
    } catch {
      toast.success(`Unable to update the tag, try again.`);
    } finally {
      setOpen(false);
      setLoading(false);
    }
  };

  const isEdited = () => {
    return tagName !== name;
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
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          type="text"
          placeholder="youtube or oss"
          onChange={(event: any) => {
            setTagName(event.target.value);
          }}
          value={tagName ?? ''}
          required
        />
      </div>

      <div className="flex mt-1 justify-end">
        <button
          type="submit"
          disabled={loading || !Boolean(tagName?.length) || !isEdited()}
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
          <DialogTitle className="text-lg font-medium">Edit Tag</DialogTitle>
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
