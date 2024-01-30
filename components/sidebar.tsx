'use client';

import Link from 'next/link';

import { Home, Settings, StarIcon, Tags } from 'lucide-react';

import { cn } from 'lib/utils';

import AddIcon from './add-icon';
import { Logo } from './icons';
import NavLink from './nav-link';
import Profile from './profile';
import Search from './search';

const SettingsLink = ({ className }: { className?: string }) => (
  <NavLink
    className={cn(
      `rounded-xl max-sm:hidden mt-2 p-2.5 transition-colors hover:bg-neutral-200 order-5`,
      className,
    )}
    href="/settings"
    title="Settings"
  >
    <Settings className="w-7 h-7 opacity-90" />
  </NavLink>
);

export default function Sidebar() {
  return (
    <nav className="flex fixed sm:top-0 max-sm:bottom-0 max-sm:bg-neutral-100 max-sm:h-[86px] z-10 justify-center sm:justify-between max-sm:px-4 sm:flex-col sm:h-full bottom-t sm:border-r sm:w-[70px] w-full border-neutral-200">
      <div className="flex sm:flex-col items-center max-sm:pb-[calc(env(safe-area-inset-bottom)/3)] max-sm:gap-6 gap-3 text-neutral-900">
        <Link href="/" className="active:opacity-85 mt-2 mb-2 hidden sm:block">
          <Logo className="w-[44px] h-[44px]" />
        </Link>
        <NavLink href={'/'} title="Home">
          <Home className="w-7 h-7 opacity-90" />
        </NavLink>
        <Search />
        <NavLink
          className="max-sm:order-4"
          href={'/favorites'}
          title="Favorites"
        >
          <StarIcon className="w-7 h-7 opacity-90" />
        </NavLink>
        <NavLink className="max-sm:order-4" href={'/tags'} title="Tags">
          <Tags className="w-7 h-7 opacity-90" />
        </NavLink>
        <AddIcon className="max-sm:order-3" />
      </div>
      <div className="hidden sm:flex sm:flex-col items-center max-sm:gap-6 max-sm:ml-4 gap-3 sm:mb-4">
        <Profile />
        <SettingsLink />
      </div>
    </nav>
  );
}
