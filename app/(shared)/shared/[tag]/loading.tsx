import CardSkeleton from 'components/card/skeleton';

import Header from './header';

export default function Loading() {
  return (
    <>
      <Header />
      <div className="min-h-dvh sm:border-r sm:border-l sm:border-border">
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton className="sm:border-b border-border" />
      </div>
    </>
  );
}
