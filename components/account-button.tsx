'use client';

import { useState } from 'react';

import { urls } from 'config';

import createSupabaseBrowserClient from 'lib/supabase/client';
import { cn } from 'lib/utils';

import { GoogleIcon } from './icons';
import Loader from './loader';

export default function AccountButton() {
  const [loading, setLoading] = useState(false);

  const onClick = async () => {
    setLoading(true);
    const supabase = createSupabaseBrowserClient();
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: urls.authCallback,
      },
    });

    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  return (
    <button
      className={cn(
        `items-center max-w-xs justify-center text-sm transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 hover:bg-primary/80 active:scale-[0.98] rounded-xl bg-primary px-6 py-3 text-secondary font-medium flex space-x-2 w-full`,
        {
          'bg-primary/80 cursor-default': loading,
        },
      )}
      onClick={onClick}
    >
      {loading ? <Loader className="mr-2" /> : <GoogleIcon />}
      Continue with Google
    </button>
  );
}
