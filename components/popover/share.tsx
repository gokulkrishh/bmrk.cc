'use client';

import { useState } from 'react';

import * as PopoverPrimitive from '@radix-ui/react-popover';
import { protocol, urls } from 'config/urls';
import { toast } from 'sonner';

import { updateSharedTag } from 'app/actions/shared';
import { decrementShareCount, incrementShareCount } from 'app/actions/user';

import { useUser } from 'components/context/user';
import { LinkIcon } from 'components/icons';
import Loader from 'components/loader';
import { Input } from 'components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from 'components/ui/popover';
import { Switch } from 'components/ui/switch';

import { cn } from 'lib/utils';

import { Tag } from 'types/data';

type SharePopoverProp = {
  className?: string;
  children?: React.ReactNode;
  tag: Tag | null;
};

export default function SharePopover({
  tag,
  children,
  className,
}: SharePopoverProp) {
  const [open, setOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [randomHash, setRandomHash] = useState(tag?.shared_hash || tag?.name);
  const [shared, setShared] = useState(tag?.shared || false);
  const { user, currentPlan } = useUser();

  if (!tag) return null;

  let url = `${urls.home}/${encodeURIComponent(randomHash ?? tag.name)}`;

  const generateSharableUrl = async () => {
    try {
      setLoading(true);
      if (user?.share_count >= currentPlan.limit.share && !shared) {
        toast.error(`Sharing limit reached! Upgrade to pro plan.`);
        return;
      }
      const { error, data } = await updateSharedTag(tag, !shared);
      if (error) {
        throw error;
      }
      if (!shared) {
        await incrementShareCount();
      } else {
        await decrementShareCount();
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
    <Popover onOpenChange={(opened) => setOpen(opened)}>
      <PopoverTrigger
        className={cn(
          `rounded-full transition-all flex px-4 w-fit items-center justify-center mr-2 tracking-wide disabled:opacity-70 disabled:cursor-not-allowed disabled:bg-accent disabled:border-border text-primary border border-transparent focus:outline-0 text-sm py-2 hover:border-border active:border-border hover:bg-accent/60 active:bg-accent/60`,
          className,
          { 'bg-accent': open },
        )}
      >
        {children || 'Share'}
      </PopoverTrigger>
      <PopoverContent
        sideOffset={5}
        onOpenAutoFocus={(e) => e.preventDefault()}
        className="md:w-96 w-[calc(23rem-30px)] mx-2 rounded-xl"
      >
        <div className="flex w-full flex-col">
          <div className="flex">
            <div className="flex space-x-2 w-full items-center gap-1">
              <Input
                autoFocus={false}
                className={cn('mt-0 h-[40px]', {
                  'select-none': !shared,
                })}
                value={url.replace(protocol, '')}
                readOnly
                disabled={!shared}
              />
              <button
                disabled={loading || !shared}
                onClick={async () => {
                  setIsCopied(true);
                  await navigator.clipboard.writeText(url);
                  toast.success('Sharable link is copied to clipboard');
                  setTimeout(() => setIsCopied(false), 3000);
                }}
                className="items-center shrink-0 w-[4.6rem] px-2 tracking-wide disabled:opacity-70 disabled:cursor-not-allowed disabled:bg-accent disabled:border-border rounded-full text-primary border border-border focus:outline-0 text-sm flex justify-center py-2 transition-colors bg-accent hover:bg-accent/60 active:bg-accent/60"
              >
                {isCopied ? 'Copied' : 'Copy'}
              </button>
            </div>
          </div>
          <div className="flex mt-6 justify-between items-center">
            <div className="flex items-center">
              <span className="rounded-full bg-neutral-100 w-9 h-9 border border-neutral-200 inline-flex justify-center items-center">
                <LinkIcon className="w-4 h-4 text-black " />
              </span>
              <div className="flex flex-col ml-3">
                <h4 className="text-sm">Public access</h4>
                <p className="text-muted-foreground text-xs mt-0.5">
                  Any one with the link can view
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
      </PopoverContent>
    </Popover>
  );
}
