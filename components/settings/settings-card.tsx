import { cn } from 'lib/utils';

export default function SettingsCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className: string;
}) {
  return (
    <div
      className={cn(
        'border h-fit border-neutral-300 justify-between rounded-xl p-4 py-5 flex gap-4 items-center',
        className,
      )}
    >
      {children}
    </div>
  );
}
