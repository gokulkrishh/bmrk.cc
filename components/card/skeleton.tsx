import { Skeleton } from 'components/ui/skeleton';

import { cn } from 'lib/utils';

export default function CardSkeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        `justify-between group gap-3 flex hover:bg-neutral-50 text-black w-full`,
        className,
      )}
    >
      <Skeleton className="w-[59px] inline-flex mt-3.5 mx-2 h-2 text-neutral-500  bg-neutral-300 " />
      <div className="w-2 border-l border-neutral-200 ">
        <span className="w-4 h-4 shrink-0 relative left-[-8.5px] top-[8px] z-1 rounded-full bg-blue-transparent text-white inline-flex items-center justify-center">
          <div className="w-4 !h-4 rounded-full bg-neutral-300" />
        </span>
      </div>
      <div className="w-full flex flex-col">
        <div className="flex justify-between">
          <div className="group items-start justify-between flex-col py-2 gap-1 flex hover:bg-neutral-50 text-black sm:w-[calc(100%-60px)] max-sm:w-[calc(100%-80px)]">
            <Skeleton className="relative mt-0.5 w-24 h-2.5 items-center inline-flex text-sm text-[14px] bg-neutral-300 " />
            <Skeleton className="text-neutral-500 mt-1 text-sm line-clamp-2 md:w-80 w-40 h-8 bg-neutral-300 " />
          </div>
        </div>
        <Skeleton className="rounded-2xl border border-neutral-200 mb-3 my-2 object-cover w-[calc(100%-16px)] max-w-[350px] h-[180px] bg-neutral-300 " />
        <div className="tracking-wide items-center text-neutral-500 text-xs gap-2 flex w-full">
          <Skeleton className="flex items-center -ml-1.5 justify-center gap-1 rounded-full bg-neutral-200 shrink-0 w-6 h-6" />
          <div className="tracking-wide text-neutral-500 text-xs gap-2 flex">
            <Skeleton className="rounded-full h-[26px] w-16 border px-2.5 bg-neutral-200" />
            <Skeleton className="rounded-full h-[26px] w-16 border px-2.5 bg-neutral-200" />
          </div>
          <div className="flex mb-1 h-8" />
        </div>
      </div>
    </div>
  );
}
