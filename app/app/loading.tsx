import AddBookmarkInput from 'components/bookmark/add-input';
import CardSkeleton from 'components/card/skeleton';
import Header from 'components/header';

export default function Loading() {
  return (
    <>
      <Header />
      <AddBookmarkInput className="px-3" btnClassname="relative top-3" />
      <div className="min-h-dvh sm:border-r border-border">
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton className="border-b border-border" />
      </div>
    </>
  );
}
