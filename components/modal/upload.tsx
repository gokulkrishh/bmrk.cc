'use client';

import { SyntheticEvent, useRef, useState } from 'react';

import { useRouter } from 'next/navigation';

import { FileIcon, QuestionMarkCircledIcon } from '@radix-ui/react-icons';
import { ArrowUpCircle } from 'lucide-react';
import { toast } from 'sonner';

import UploadForm from 'components/form/upload';
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
