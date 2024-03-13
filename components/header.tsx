import Link from 'next/link';

import { Logo } from 'components/icons';

import { formatDate } from 'lib/date';

import Profile from './profile';
import ShareIcon from './share-icon';

export default function Header({
  headerText,
  icon: Icon = null,
  showShare = false,
}: {
  headerText?: string;
  icon?: React.ReactNode;
  showShare?: boolean;
}) {
  return (
    <div className="border-b border-border sm:border-r w-full items-center flex justify-between">
      <div className="flex items-center">
        <Link href="/" className="active:opacity-85 ml-2 block sm:hidden">
          <Logo className="w-[36px] h-[36px]" />
        </Link>
        <h2 className="w-full font-medium flex flex-col p-3 tracking-wide">
          <span className="flex items-center gap-1">
            {headerText ?? 'Bookmark It.'} {Icon}
          </span>
          <span
            className="text-xs mt-0.5 font-normal text-muted-foreground"
            suppressHydrationWarning
          >
            {formatDate(new Date())}
          </span>
        </h2>
      </div>
      {showShare ? <ShareIcon /> : null}
      <Profile className="max-sm:flex hidden mr-3" />
    </div>
  );
}
