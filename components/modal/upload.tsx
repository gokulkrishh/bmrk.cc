'use client';

import { useState } from 'react';

import { toast } from 'sonner';

import { Dialog, DialogContent } from 'components/ui/dialog';
import { Input } from 'components/ui/input';

type UploadProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

export default function UploadModal() {
  const [loading, setLoading] = useState(false);

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
    <Dialog open={false} onOpenChange={() => {}}>
      <DialogContent className="sm:max-w-md py-2 px-2">
        <form>
          <Input type="file" accept=".html" onChange={handleFileChange} />
        </form>
      </DialogContent>
    </Dialog>
  );
}
