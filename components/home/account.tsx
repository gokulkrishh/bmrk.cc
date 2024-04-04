'use client';

import { useEffect, useState } from 'react';

import Link from 'next/link';

import { User } from '@supabase/supabase-js';
import { urls } from 'config/urls';
import { AppWindowIcon } from 'lucide-react';

import { LogoutIcon } from 'components/icons';
import { Avatar, AvatarFallback, AvatarImage } from 'components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from 'components/ui/dropdown-menu';

import createClient from 'lib/supabase/client';

export default function HomeAccount() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const supabase = createClient();

  useEffect(() => {
    async function getSession() {
      setLoading(true);
      const { data } = await supabase.auth.getUser();
      const { user } = data;
      if (user) {
        setUser(user);
      }
      setLoading(false);
    }
    getSession();
  }, [supabase.auth]);

  const signOut = async () => {
    await supabase.auth.signOut();
    window.location.href = urls.home;
  };

  if (!user || loading) {
    return null;
  }

  return (
    <Avatar
      style={{ width: '36px', height: '36px' }}
      className="cursor-pointer"
    >
      <DropdownMenu>
        <DropdownMenuTrigger>
          <AvatarImage
            src={user?.user_metadata?.avatar_url}
            alt={user?.user_metadata?.name}
          />
          <AvatarFallback className="font-medium text-pimary-foreground uppercase text-xl bg-accent">
            {user?.user_metadata?.name[0]}
          </AvatarFallback>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="mr-2">
          <DropdownMenuItem>
            <Link className="flex items-center" href="/app">
              <AppWindowIcon className="h-4 w-4 mr-2" /> App
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem className="flex items-center" onClick={signOut}>
            <LogoutIcon className="h-4 w-4 mr-2" /> Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </Avatar>
  );
}
