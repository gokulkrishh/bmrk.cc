'use client';

import UploadForm from 'components/form/upload';
import { UploadIcon } from 'components/icons';
import { Dialog, DialogContent, DialogTitle } from 'components/ui/dialog';

type UploadModalProps = {
  open: boolean;
  onHide: (open: boolean) => void;
};

export default function UploadModal({ open, onHide }: UploadModalProps) {
  return (
    <Dialog open={open} onOpenChange={(hide) => onHide(hide)}>
      <DialogContent className="sm:max-w-md py-2 px-3 max-w-[calc(100%-6px)]">
        <DialogTitle className="flex items-center font-medium gap-1.5 mt-1.5">
          <UploadIcon className="w-5 h-5" />
          Upload bookmarks
        </DialogTitle>
        <UploadForm onHide={onHide} />
      </DialogContent>
    </Dialog>
  );
}
