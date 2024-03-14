import Link from 'next/link';

import { Logo } from 'components/icons';

import { formatDate } from 'lib/date';

import Profile from './profile';
import { Skeleton } from './ui/skeleton';

export default function Header({
  headerText,
  icon: Icon = null,
  shareIcon: ShareIcon = null,
  loading = false,
}: {
  headerText?: string;
  loading?: boolean;
  icon?: React.ReactNode;
  shareIcon?: React.ReactNode;
}) {
  return (
    <div className="border-b border-border sm:border-r w-full items-center flex justify-between">
      <div className="flex items-center">
        <Link href="/" className="active:opacity-85 ml-2 block sm:hidden">
          <Logo className="w-[36px] h-[36px]" />
        </Link>
        <h2 className="w-full font-medium flex flex-col p-3 tracking-wide">
          <span className="flex items-center gap-1">
            {headerText ?? 'Bookmark It.'}{' '}
            {loading ? <Skeleton className="w-20 h-4" /> : null} {Icon}
          </span>
          <span
            className="text-xs mt-0.5 font-normal text-muted-foreground"
            suppressHydrationWarning
          >
            {formatDate(new Date())}
          </span>
        </h2>
      </div>
      <div className="flex items-center">
        {ShareIcon}
        <Profile className="max-sm:flex hidden mr-3" />
      </div>
    </div>
  );
}
