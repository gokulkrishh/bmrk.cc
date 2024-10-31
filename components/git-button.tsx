import { Suspense } from 'react';

import Link from 'next/link';

import { Badge } from 'components/ui/badge';

import { formatNumber } from 'lib/utils';

import { GithubIcon } from './icons';

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
      return 246;
    }
  } catch (error) {
    console.error('Error:', error);
    return 246;
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
      <GithubIcon className="h-5 w-5 mr-2" />
      Star on Github{' '}
      <Badge className="ml-2 hidden sm:inline-block  text-primary tabular-nums font-medium bg-gray-200 hover:bg-gray-200">
        {formatNumber(count as number)}
      </Badge>
    </Link>
  );
}
