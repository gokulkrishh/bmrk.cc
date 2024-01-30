'use client';

import Image from 'next/image';
import Link from 'next/link';

import { Logo } from 'components/icons';

import { formatDate, showGreetings } from 'lib/date';

import Profile from './profile';

export default function Header({ headerText }: { headerText?: string }) {
  return (
    <div className="border-b border-neutral-200 border-r w-full items-center flex justify-between">
      <div className="flex items-center">
        <Link href="/" className="active:opacity-85 ml-2 block sm:hidden">
          <Logo className="w-[44px] h-[44px]" />
        </Link>
        <h2 className="w-full font-medium flex flex-col p-3 tracking-wide">
          {headerText ?? showGreetings()}
          <span
            className="text-xs mt-0.5 font-normal text-neutral-500"
            suppressHydrationWarning
          >
            {formatDate(new Date())}
          </span>
        </h2>
      </div>
      <Profile className="max-sm:flex hidden mr-3" />
    </div>
  );
}
