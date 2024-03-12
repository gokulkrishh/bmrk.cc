'use client';

import React from 'react';

import CardSkeleton from 'components/card/skeleton';
import { RateLimitState } from 'components/icons';

import Header from './header';

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  React.useEffect(() => {
    console.log('logging error:', error);
  }, [error]);

  return (
    <>
      <Header />
      <div className="min-h-dvh border-r border-l border-border">
        <RateLimitState />
      </div>
    </>
  );
}
