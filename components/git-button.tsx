import { Suspense } from 'react';

import Link from 'next/link';

import { Badge } from 'components/ui/badge';

import { formatNumber } from 'lib/utils';

const owner: string = 'gokulkrishh';
const repo: string = 'bmrk.cc';

async function getStarCount(): Promise<number | null> {
  try {
    const response = await fetch(
      `https://api.github.com/repos/${owner}/${repo}`,
      { next: { revalidate: 1200 } }, // 20 minutes
    );
    const data = await response.json();
    if (response.ok) {
      return data.stargazers_count;
    } else {
      return 0;
    }
  } catch (error) {
    console.error('Error:', error);
    return 0;
  }
}

export default async function GitButton() {
  const count = await getStarCount();
  return (
    <Link
      className="inline-flex transition-colors items-center justify-center h-[40px] rounded-full px-4 py-2 text-sm font-medium text-slate-900 ring-1 ring-slate-900/10 bg-white hover:bg-gray-200"
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
      Star on Github{' '}
      <Badge className="ml-2 text-primary tabular-nums font-medium bg-gray-200 hover:bg-gray-200">
        {formatNumber(count as number)}
      </Badge>
    </Link>
  );
}
