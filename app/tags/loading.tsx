import CardSkeleton from 'components/card/skeleton';
import Header from 'components/header';
import { Skeleton } from 'components/ui/skeleton';

export default function Loading() {
  return (
    <>
      <Header headerText="Tags" />
      <div className="flex gap-x-3 gap-y-2 items-end px-4 flex-wrap py-3">
        <Skeleton className="w-20 h-5 bg-neutral-300 rounded-full" />
        <Skeleton className="w-20 h-5 bg-neutral-300 rounded-full" />
        <Skeleton className="w-20 h-5 bg-neutral-300 rounded-full" />
      </div>
      <div className="border-b border-neutral-200 flex w-full pt-1" />
      <div className="min-h-dvh border-r border-neutral-200">
        <CardSkeleton />
        <CardSkeleton />
      </div>
    </>
  );
}
