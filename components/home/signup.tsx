'use client';

import { useEffect, useState } from 'react';

import Link from 'next/link';

import { DashboardIcon } from '@radix-ui/react-icons';
import { urls } from 'config';
import {
  AppWindowIcon,
  LayoutDashboardIcon,
  LayoutGrid,
  LayoutPanelTop,
  LogOut,
  Settings,
} from 'lucide-react';

import SignupModal from 'components/modal/signup';
import { Avatar, AvatarFallback, AvatarImage } from 'components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from 'components/ui/dropdown-menu';

import createSupabaseBrowserClient from 'lib/supabase/client';

export default function Signup() {
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const supabase = createSupabaseBrowserClient();

  useEffect(() => {
    async function getUser() {
      setLoading(true);
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        setUser(user);
      }
      setLoading(false);
    }
    getUser();
  }, [supabase.auth]);

  const signOut = async () => {
    await supabase.auth.signOut();
    window.location.href = '/';
  };

  return (
    <>
      {user && !loading ? (
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
      ) : !loading ? (
        <button
          onClick={() => {
            if (user) {
              window.location.href = urls.app;
            } else {
              setOpen(true);
            }
          }}
          className="rounded-full font-medium inline-flex text-sm items-center disabled:bg-red-200 focus:outline-0 bg-neutral-950 focus:bg-black/80 active:bg-black/80 hover:bg-black/80 border-0 py-2 px-4 text-white"
        >
          Sign In
        </button>
      ) : null}
      {open ? <SignupModal open={open} onHide={setOpen} /> : null}
    </>
  );
}