'use client';

import { useEffect, useState } from 'react';

import Link from 'next/link';

import { urls } from 'config';
import { AppWindowIcon, LogOut } from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from 'components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from 'components/ui/dropdown-menu';

import createSupabaseBrowserClient from 'lib/supabase/client';

export default function Account() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const supabase = createSupabaseBrowserClient();

  useEffect(() => {
    async function getSession() {
      setLoading(true);
      const { data } = await supabase.auth.getSession();
      const { session } = data;
      if (session?.user) {
        setUser(session.user);
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
          <AvatarFallback className="font-medium text-black uppercase text-xl bg-neutral-300">
            {user?.user_metadata?.name[0]}
          </AvatarFallback>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="mr-2">
          <DropdownMenuItem>
            <Link className="flex items-center" href="/app">
              <AppWindowIcon className="h-4 w-4 mr-2.5" /> App
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem className="flex items-center" onClick={signOut}>
            <LogOut className="h-4 w-4 mr-2.5" /> Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </Avatar>
  );
}
