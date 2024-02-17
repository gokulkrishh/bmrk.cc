import Header from 'components/header';
import SettingSkeleton from 'components/settings/skeleton';

export default function Loading() {
  return (
    <>
      <Header headerText="Settings" />
      <div className="min-h-dvh sm:border-r border-border pb-24 flex gap-6 flex-col px-4 py-4">
        <div className="flex flex-col">
          <h2 className="font-medium mb-2">General</h2>
          <div className="flex flex-col gap-6">
            <SettingSkeleton />
          </div>
        </div>
      </div>
    </>
  );
}
