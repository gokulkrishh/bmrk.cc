import CardSkeleton from 'components/card/skeleton';
import Header from 'components/header';

export default function Loading() {
  return (
    <>
      <Header headerText="Settings" />
      <div className="min-h-dvh border-r border-neutral-200"></div>
    </>
  );
}
