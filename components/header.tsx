'use client';

import Image from 'next/image';
import Link from 'next/link';

import { formatDate, showGreetings } from 'lib/date';

import Profile from './profile';

export default function Header() {
  return (
    <div className="border-b border-neutral-200 border-r w-full items-center flex justify-between">
      <div className="flex items-center">
        <Link href="/" className="active:opacity-85 ml-2 block sm:hidden">
          <Image
            alt="logo"
            src="/icons/icon.svg"
            width={55}
            height={55}
            style={{
              maxWidth: '100%',
              height: 'auto',
            }}
          />
        </Link>
        <h2 className="w-full font-medium flex flex-col p-3 tracking-wide">
          {showGreetings()}
          <span className="text-xs mt-0.5 font-normal text-neutral-500">
            {formatDate(new Date())}
          </span>
        </h2>
      </div>
      <Profile className="max-sm:flex hidden mr-3" />
    </div>
  );
}
