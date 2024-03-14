'use client';

import React from 'react';

import { RateLimitState } from 'components/icons';

import Header from './header';

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <>
      <Header />
      <div className="min-h-dvh border-r border-l border-border">
        <RateLimitState />
      </div>
    </>
  );
}
