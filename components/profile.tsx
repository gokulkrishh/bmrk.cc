'use client';

import Link from 'next/link';

import { urls } from 'config/urls';

import { cn } from 'lib/utils';

import { useAuth } from './context/auth';
import {
  BugIcon,
  ExtensionsIcon,
  HelpIcon,
  LogoutIcon,
  SettingsIcon,
} from './icons';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

const helpMailLink = 'mailto:support@bmrk.cc';

export default function Profile({ className }: { className?: string }) {
  const { authUser, supabase } = useAuth();

  if (!authUser || !authUser.user_metadata?.avatar_url) {
    return null;
  }

  const signOut = async () => {
    await supabase.auth.signOut();
    window.location.href = urls.account;
  };

  return (
    <Avatar className={cn('h-9 w-9 group', className)}>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <AvatarImage
            className="group-active:scale-95 h-9 w-9 duration-150 transition-transform"
            src={authUser.user_metadata.avatar_url}
            alt={authUser.user_metadata.name}
          />
          <AvatarFallback className="font-medium h-9 w-9 text-pimary-foreground uppercase text-xl bg-accent">
            {authUser.user_metadata.name[0]}
          </AvatarFallback>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="max-sm:mr-2 max-sm:min-w-44 min-w-40">
          <DropdownMenuItem
            className="flex items-center cursor-pointer"
            onClick={() => {
              window.open(urls.extensions.chrome, '_blank');
            }}
          >
            <ExtensionsIcon className="h-4 w-4 mr-2 text-primary" />{' '}
            <span className="mr-2">Extensions</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="flex items-center cursor-pointer"
            onClick={() => {
              window.open(
                `https://github.com/gokulkrishh/bmrk.cc/issues/new/choose`,
                '_blank',
              );
            }}
          >
            <BugIcon className="h-4 w-4 mr-2" /> File a bug
          </DropdownMenuItem>
          <DropdownMenuItem
            className="flex items-center cursor-pointer"
            onClick={() => {
              window.open(helpMailLink, '_blank');
            }}
          >
            <HelpIcon className="h-4 w-4 mr-2" /> Help
          </DropdownMenuItem>
          <DropdownMenuItem className="hidden max-sm:block">
            <Link className="flex items-center" href="/settings">
              <SettingsIcon className="h-4 w-4 mr-2" /> Settings
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="flex items-center cursor-pointer"
            onClick={signOut}
          >
            <LogoutIcon className="h-4 w-4 mr-2" /> Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </Avatar>
  );
}
