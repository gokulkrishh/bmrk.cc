'use client';

import React from 'react';

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
    <div className="space-y-4">
      <h2 className="text-lg font-bold">Error</h2>
      <p className="text-sm">{error?.message}</p>
      <div>
        <button onClick={() => reset()}>Try Again</button>
      </div>
    </div>
  );
}
