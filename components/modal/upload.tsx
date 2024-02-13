'use client';

import UploadForm from 'components/form/upload';
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
          </svg>
          Upload bookmarks
        </DialogTitle>
        <UploadForm onHide={onHide} />
      </DialogContent>
    </Dialog>
  );
}
