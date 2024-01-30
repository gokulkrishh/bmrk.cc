'use client';

import { useEffect, useState } from 'react';

import Link from 'next/link';

import { urls } from 'config';
import { ArrowRight } from 'lucide-react';

import SignupModal from 'components/modal/signup';

import createSupabaseBrowserClient from 'lib/supabase/client';

export default function Signup() {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const supabase = createSupabaseBrowserClient();

  useEffect(() => {
    async function getSession() {
      const { data } = await supabase.auth.getSession();
      const { session } = data;
      if (session?.user) {
        setUser(session.user);
      }
    }
    getSession();
  }, [supabase.auth]);

  return (
    <div className="flex gap-6 justify-center mt-10">
      <button
        onClick={() => {
          if (user) {
            window.location.href = urls.app;
          } else {
            window.location.href = urls.account;
          }
        }}
        className="rounded-full inline-flex h-[36px] text-sm items-center disabled:bg-neutral-200 focus:outline-0 bg-neutral-950 focus:bg-black/80 active:bg-black/80 ring-1 ring-slate-900/10 hover:bg-black/80 border-0 px-4 py-3 text-white"
      >
        Get Started <ArrowRight className="ml-1 w-4 h-4" />
      </button>
      <Link
        className="inline-flex h-[36px] items-center justify-center  rounded-full bg-white/0 px-4 py-3 text-sm font-medium text-slate-900 ring-1 ring-slate-900/10 hover:bg-gray-100"
        target="_blank"
        rel="noopener noreferrer"
        href="https://github.com/gokulkrishh/bmrk.cc"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          className="mr-2"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"></path>
        </svg>
        Star on Github
      </Link>
      {open ? <SignupModal open={open} onHide={setOpen} /> : null}
    </div>
  );
}
