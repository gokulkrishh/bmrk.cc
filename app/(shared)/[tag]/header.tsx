import Link from 'next/link';

import { urls } from 'config/urls';

import { Logo } from 'components/icons';
import { Skeleton } from 'components/ui/skeleton';

import { formatDate } from 'lib/date';

import { BookmarkModified } from 'types/data';

import ExportButton from './export';

export default function Header({
  headerText = 'Bookmark It.',
  icon: Icon = null,
  loading = false,
  data,
}: {
  headerText?: string;
  icon?: React.ReactNode;
  loading?: boolean;
  data?: BookmarkModified[];
}) {
  return (
    <div className="border-b sm:border-l border-border sm:border-r w-full items-center flex justify-between">
      <div className="flex w-full items-center justify-between">
        <Link href={urls.app} className="active:opacity-85 ml-2 sm:hidden">
          <Logo className="w-[36px] h-[36px]" />
        </Link>
        <h2 className="w-full font-medium flex flex-col p-3 tracking-wide">
          <span className="flex items-center gap-1">
            {headerText} {Icon}{' '}
            {loading ? <Skeleton className="w-20 h-4" /> : null}
          </span>
          <span
            className="text-xs mt-0.5 font-normal text-muted-foreground"
            suppressHydrationWarning
          >
            {formatDate(new Date())}
          </span>
        </h2>
        <ExportButton data={data} />
      </div>
    </div>
  );
}
