'use client';

import Link from 'next/link';

import { urls } from 'config';
import { Bug, HelpCircleIcon, LogOut, Settings } from 'lucide-react';

import { cn } from 'lib/utils';

import { useAuth } from './context/auth';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

const helpMailLink = 'mailto:support@bmrk.cc';

export default function Profile({ className }: { className?: string }) {
  const { user, supabase } = useAuth();

  if (!user || !user?.user_metadata?.avatar_url) {
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
            src={user.user_metadata.avatar_url}
            alt={user.user_metadata.name}
          />
          <AvatarFallback className="font-medium h-9 w-9 text-pimary-foreground uppercase text-xl bg-accent">
            {user.user_metadata.name[0]}
          </AvatarFallback>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="mr-2">
          <DropdownMenuItem
            className="flex items-center cursor-pointer"
            onClick={() => {
              window.open(
                `https://github.com/gokulkrishh/bmrk.cc/issues`,
                '_blank',
              );
            }}
          >
            <Bug className="h-4 w-4 mr-2.5" /> File a bug
          </DropdownMenuItem>
          <DropdownMenuItem
            className="flex items-center cursor-pointer"
            onClick={() => {
              window.open(helpMailLink, '_blank');
            }}
          >
            <HelpCircleIcon className="h-4 w-4 mr-2.5" /> Help
          </DropdownMenuItem>
          <DropdownMenuItem className="hidden max-sm:block">
            <Link className="flex items-center" href="/settings">
              <Settings className="h-4 w-4 mr-2.5" /> Settings
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="flex items-center cursor-pointer"
            onClick={signOut}
          >
            <LogOut className="h-4 w-4 mr-2.5" /> Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </Avatar>
  );
}
