import CardSkeleton from 'components/card/skeleton';

import Header from './header';

export default function Loading() {
  return (
    <>
      <Header />
      <div className="min-h-dvh border-r border-l border-border">
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton className="border-b border-border" />
      </div>
    </>
  );
}
