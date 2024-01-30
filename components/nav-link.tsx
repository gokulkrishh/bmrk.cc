'use client';

import { useEffect, useState } from 'react';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Tooltip, TooltipContent, TooltipTrigger } from 'components/ui/tooltip';

import { cn } from 'lib/utils';

type Props = {
  children: React.ReactNode;
  href: string;
  title: string;
  side?: 'top' | 'right' | 'bottom' | 'left';
  className?: string;
};

export default function NavLink({
  children,
  href,
  title,
  side = 'right',
  className,
}: Props) {
  const [active, setActive] = useState(false);
  const pathname = usePathname();

  // To fix the partial pre-rendering of the active link
  useEffect(() => {
    setActive(pathname === href);
  }, [href, pathname]);

  return (
    <Link
      href={href}
      className={cn(
        `p-2.5 inline-block rounded-xl transition-colors text-center text-neutral-900 hover:bg-neutral-200`,
        {
          'bg-neutral-200': pathname === href || active,
        },
        className,
      )}
    >
      <Tooltip>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent className="ml-4" side={side}>
          {title}
        </TooltipContent>
      </Tooltip>
    </Link>
  );
}
