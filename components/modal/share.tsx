'use client';

import { useState } from 'react';

import { urls } from 'config';
import { Link } from 'lucide-react';
import { toast } from 'sonner';

import { updateSharedTag } from 'app/actions/shared';

import Loader from 'components/loader';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from 'components/ui/dialog';
import { Input } from 'components/ui/input';
import { Switch } from 'components/ui/switch';

import { cn } from 'lib/utils';

import { Tag } from 'types/data';

type ShareModalProp = {
  open: boolean;
  onHide?: (open: boolean) => void;
  tag: Tag;
};

export default function ShareModal({ open, onHide, tag }: ShareModalProp) {
  const [isCopied, setIsCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [randomHash, setRandomHash] = useState(tag.shared_hash || '');
  const [shared, setShared] = useState(tag.shared || false);

  let url = `${urls.shared}/${randomHash ?? ''}`;

  const generateSharableUrl = async () => {
    try {
      setLoading(true);
      const { error, data } = await updateSharedTag(tag, !shared);
      if (error) {
        throw error;
      }
      setRandomHash(data?.shared_hash as string);
      setShared(data?.shared as boolean);
    } catch {
      toast.error('Error occurried, try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(hide) => onHide?.(hide)}>
      <DialogContent className="max-w-md w-[calc(100%-20px)] px-4 bg-background rounded-xl">
        <DialogHeader>
          <DialogTitle className="tracking-normal flex-col flex text-left">
            Share
          </DialogTitle>
          <p className="text-sm text-muted-foreground w-[90%] text-left">
            Anyone with the below link can view your bookmarks.
          </p>
        </DialogHeader>
        <div className="flex w-full flex-col">
          <div className="flex">
            <div className="flex space-x-2 w-full items-center gap-1">
              <Input
                className={cn('mt-0', {
                  'blur-text': !shared,
                })}
                value={url}
                readOnly
              />
              <button
                disabled={loading || !shared}
                onClick={async () => {
                  setIsCopied(true);
                  await navigator.clipboard.writeText(url);
                  setTimeout(() => setIsCopied(false), 3000);
                }}
                className="items-center shrink-0 w-24 h-[40px] tracking-wide disabled:opacity-70 disabled:cursor-not-allowed disabled:bg-accent disabled:border-border rounded-full text-primary border border-border focus:outline-0 active:bg-accent text-sm flex justify-center py-2 px-1 transition-colors bg-primary-foreground hover:bg-accent"
              >
                {isCopied ? 'Copied' : 'Copy link'}
              </button>
            </div>
          </div>
          <div className="flex mt-6 justify-between items-center">
            <div className="flex items-center">
              <span className="rounded-full w-9 h-9 border border-border inline-flex justify-center items-center">
                <Link className="w-4 h-4 text-primary " />
              </span>
              <div className="flex flex-col ml-2">
                <h4 className="text-sm">Public access</h4>
                <p className="text-muted-foreground text-xs mt-0.5">
                  Bookmarks sharing is turned {shared ? 'on' : 'off'}.
                </p>
              </div>
            </div>
            <div className="flex items-center">
              {loading ? <Loader className="mr-2" /> : null}
              <Switch
                onCheckedChange={async () => {
                  await generateSharableUrl();
                }}
                checked={Boolean(shared)}
              />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
