import Link from 'next/link';

import { urls } from 'config';
import { ArrowRight } from 'lucide-react';

import GitButton from 'components/git-button';

export default function Account() {
  return (
    <div className="flex gap-6 justify-center mt-10">
      <Link
        href={urls.account}
        className="rounded-full group/signin transition-colors inline-flex text-sm items-center focus:outline-0 bg-black hover:bg-black/80 shadow border border-black px-4 py-2 text-white"
      >
        Get Started{' '}
        <ArrowRight className="ml-1 transition-all group-hover/signin:translate-x-0.5 w-4 h-4" />
      </Link>
      <GitButton />
    </div>
  );
}
