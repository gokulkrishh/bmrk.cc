import Link from 'next/link';

import { HelpCircleIcon, Settings, StarIcon, Tags } from 'lucide-react';

import { cn } from 'lib/utils';

import AddIcon from './add-icon';
import { HomeIcon, Logo } from './icons';
import NavLink from './nav-link';
import Profile from './profile';
import SearchIcon from './search';

const SettingsLink = ({ className }: { className?: string }) => (
  <NavLink
    className={cn(
      `rounded-xl max-sm:hidden mt-2 p-2.5 transition-colors hover:bg-accent order-5`,
      className,
    )}
    href="/settings"
    title="Settings"
  >
    <Settings className="w-6 h-6 text-pimary-foreground group-hover:scale-95 duration-150 transition-transform" />
  </NavLink>
);

export default function Sidebar() {
  return (
    <nav className="flex fixed sm:top-0 max-sm:bottom-0 max-sm:bg-background max-sm:border-t max-sm:h-[86px] z-10 justify-center sm:justify-between max-sm:px-4 sm:flex-col sm:h-full bottom-t sm:border-r sm:w-[70px] w-full border-border">
      <div className="flex sm:flex-col items-center max-sm:pb-[calc(env(safe-area-inset-bottom)/3)] max-sm:gap-6 gap-3 text-primary">
        <Link
          href="/"
          className="active:opacity-85 mt-2 mb-2 hidden sm:block group"
        >
          <Logo className="w-[44px] h-[44px] group-active:scale-95 duration-150 transition-transform" />
        </Link>
        <NavLink href={'/'} title="Home">
          <HomeIcon className="w-6 h-6 text-pimary-foreground group-hover:scale-95 duration-150 transition-transform" />
        </NavLink>
        <SearchIcon />
        <NavLink
          className="max-sm:order-4"
          href={'/favorites'}
          title="Favorites"
        >
          <StarIcon className="w-6 h-6 text-pimary-foreground group-hover:scale-95 duration-150 transition-transform" />
        </NavLink>
        <NavLink className="max-sm:order-4" href={'/tags'} title="Tags">
          <Tags className="w-6 h-6 text-pimary-foreground group-hover:scale-95 duration-150 transition-transform" />
        </NavLink>
        <AddIcon className="max-sm:order-3 sm:mt-2" />
      </div>
      <div className="hidden sm:flex sm:flex-col items-center max-sm:gap-6 max-sm:ml-4 gap-3 sm:mb-4">
        <Profile />
        <SettingsLink />
      </div>
    </nav>
  );
}
