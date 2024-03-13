import Link from 'next/link';

import { urls } from 'config';

import { Logo } from 'components/icons';

import { formatDate } from 'lib/date';

export default function Header() {
  return (
    <div className="border-b sm:border-l border-border sm:border-r w-full items-center flex justify-between">
      <div className="flex w-full items-center justify-between">
        <Link href={urls.app} className="active:opacity-85 ml-2 sm:hidden">
          <Logo className="w-[36px] h-[36px]" />
        </Link>
        <h2 className="w-full font-medium flex flex-col p-3 tracking-wide">
          Bookmark It.
          <span
            className="text-xs mt-0.5 font-normal text-muted-foreground"
            suppressHydrationWarning
          >
            {formatDate(new Date())}
          </span>
        </h2>
      </div>
    </div>
  );
}
