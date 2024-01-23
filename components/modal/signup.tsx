'use client';

import { useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { DialogDescription } from '@radix-ui/react-dialog';
import { createBrowserClient } from '@supabase/ssr';
import Icon from 'public/images/icons/icon.svg';

import { GoogleIcon } from 'components/icons';
import Loader from 'components/loader';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from 'components/ui/dialog';

import { cn } from 'lib/utils';

type ButtonProp = {
  loading: boolean;
  Icon: React.ComponentType;
  btnText: string;
  clickHandler: () => void;
};

const Button = ({ loading, Icon, btnText, clickHandler }: ButtonProp) => {
  return (
    <button
      className={cn(
        `items-center max-w-sm justify-center text-sm transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 hover:bg-primary/80 active:scale-[0.98] rounded-xl bg-primary px-6 py-4 text-secondary font-medium flex space-x-2 h-[40px] w-full`,
        {
          'bg-primary/80 cursor-default': loading,
        }
      )}
      onClick={clickHandler}
    >
      {loading ? <Loader className="mr-2" /> : <Icon />}
      Continue with {btnText}
    </button>
  );
};

type SignupModalProp = {
  open: boolean;
  onHide: (open: boolean) => void;
};

export default function SignupModal({ open, onHide }: SignupModalProp) {
  const [loading, setLoading] = useState(false);

  const clickHandler = async () => {
    setLoading(true);
    const supabase = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${process?.env?.NEXT_PUBLIC_SITE_URL}/auth/callback`,
      },
    });
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <Dialog open={open} onOpenChange={(hide) => onHide(hide)}>
      <DialogContent className="max-w-sm w-[calc(100%-20px)] bg-white rounded-xl">
        <DialogHeader>
          <DialogTitle className="tracking-normal items-center flex-col justify-center flex">
            <Image
              src={Icon}
              width={55}
              height={55}
              alt="logo"
              style={{
                maxWidth: '100%',
                height: 'auto',
              }}
            />
            <DialogDescription className="mt-1 mb-1 font-medium text-primary">
              Bookmark it.
            </DialogDescription>
            <DialogDescription className="mb-3 mt-0.5 text-sm font-normal text-neutral-500">
              Welcome, Sign in below.
            </DialogDescription>
          </DialogTitle>
        </DialogHeader>
        <Button
          btnText="Google"
          loading={loading}
          clickHandler={clickHandler}
          Icon={GoogleIcon}
        />
      </DialogContent>
    </Dialog>
  );
}
